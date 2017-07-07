"use strict";

Polymer({
  is: "gobstones-editor",
  behaviors: [Polymer.BusListenerBehavior],
  properties: {
    mode: { type: String, value: "main" },
    code: {
      type: Object,
      value: { main: "", library: "", teacher: "" }
    },
    fontSize: {
      type: Number,
      observer: "_fontSizeChanged"
    },
    readonly: Boolean
  },
  listeners: {
    "ace.editor-ready": "onAceReady",
    "ace.editor-content": "onContentChange"
  },

  ready: function ready() {
    var _this = this;

    this.MIN_FONT_SIZE = 8;
    this.DEFAULT_FONT_SIZE = 17;
    this.HOP_SIZE = 3;

    var boardsPanel = document.getElementById("boards");
    if (boardsPanel) {
      this.runner = boardsPanel.$.runner;
      this.runner.addEventListener("run", function (_ref) {
        var detail = _ref.detail;

        _this._onRunRequest(detail);
        _this.readonly = true;
      });
      this.runner.addEventListener("cancel", function () {
        window.BUS.fire("cancel-request");
        _this.readonly = false;
      });
      this.runner.addEventListener("end", function () {
        _this.readonly = false;
      });
    }

    this.subscribeTo("initial-state", function (event) {
      _this._runCode(event);
    });

    this.editor = this.$.ace.editor;
    this._setFatalities();

    this.stylist = new Stylist();
    this._removePrintMarginColumn();
    $(window).resize(function () {
      _this._fixEditorHeight();
    });

    setTimeout(function () {
      if (window.LOAD_PENDING_PROJECT) {
        window.LOAD_PENDING_PROJECT();
        window.LOAD_PENDING_PROJECT = undefined;
      }
    }, 0);
  },

  setCode: function setCode(code) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "main";

    this.code[mode] = code;
    if (this.mode === mode) this.editor.setValue(code);
  },

  onAceReady: function onAceReady() {
    this.$.ace.editor.$blockScrolling = Infinity;
  },

  onContentChange: function onContentChange(content) {
    this.set("code." + this.mode, content.detail.value);
    this.setAsDirty();
  },

  increaseFontSize: function increaseFontSize() {
    this.fontSize += this.HOP_SIZE;
  },

  decreaseFontSize: function decreaseFontSize() {
    this.fontSize -= this.HOP_SIZE;
  },

  toggleMode: function toggleMode() {
    this._setMode(this.mode === "main" ? "library" : "main");
  },

  setAsDirty: function setAsDirty() {
    this.editor.getSession().setAnnotations([]);
    window.BUS.fire("editor-dirty");
  },

  reset: function reset() {
    this._setMode("main");
    this.setCode("", "main");
    this.setCode("", "library");
    this.setCode("", "teacher");
  },

  _onRunRequest: function _onRunRequest(options) {
    this._setMode("main");
    window.BUS.fire("run-request", options);
  },

  _initializeDefaultFontSize: function _initializeDefaultFontSize() {
    this.fontSize = this.DEFAULT_FONT_SIZE;
  },

  _fontSizeChanged: function _fontSizeChanged(newValue, oldValue) {
    var _this2 = this;

    if (newValue <= this.MIN_FONT_SIZE) {
      this.fontSize = oldValue;
      return;
    }

    this.editor.setFontSize(newValue);
    setTimeout(function () {
      _this2._fixEditorHeight();
    }, 500);
  },

  _runCode: function _runCode(initialState) {
    var _this3 = this;

    var code = this.code;
    this.editor.getSession().clearAnnotations();

    try {
      this.runner.run({ initialState: initialState, code: code }, function (e) {
        _this3._reportError(e, "error");
        window.BUS.fire("compilation-error");
      }, function (state) {
        return _this3._notify(state);
      });
    } catch (e) {
      window.BUS.fire("unknown-error", e);
      console.error("---UNKNOWN ERROR---");
      throw e;
    }
  },

  _notify: function _notify(state) {
    if (state.error) {
      this._reportError(state.error, "info");
      window.BUS.fire("execution-error", state.error.message);
    } else window.BUS.fire("execution-result", { board: state });
  },

  _reportError: function _reportError(error, type) {
    if (error.location.mode === "library") this._setMode("library");

    this.editor.getSession().setAnnotations([{
      row: error.location.line - 1,
      column: 0,
      text: error.message,
      type: type
    }]);
  },

  _setMode: function _setMode(mode) {
    this.mode = mode;
    window.BUS.fire("mode-change", this.mode);
    this.editor.setValue(this.code[this.mode]);
    this.editor.focus();
  },

  _removePrintMarginColumn: function _removePrintMarginColumn() {
    this.editor.setShowPrintMargin(false);
  },

  _setFatalities: function _setFatalities() {
    var _this4 = this;

    var ace = this.$.ace;

    ace.editor.commands.addCommand({
      name: "run-code",
      bindKey: { win: "ctrl+enter", mac: "command+enter" },
      exec: function exec() {
        _this4.runner.requestRun();
      }
    });
  },

  _fixEditorHeight: function _fixEditorHeight() {
    this.stylist.correctEditorHeight(this.editor);
  }
});