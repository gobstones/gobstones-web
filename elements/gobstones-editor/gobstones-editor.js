"use strict";

Polymer({
  is: "gobstones-editor",
  behaviors: [Polymer.BusListenerBehavior, Polymer.LocalizationBehavior],
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
    readonly: {
      type: Boolean,
      value: false
    },
    primitiveProcedures: {
      type: Array,
      value: []
    },
    primitiveFunctions: {
      type: Array,
      value: []
    },
    toolbox: Object,
    isShowingProceduresHint: {
      type: Boolean,
      value: false
    },
    withRunner: {
      type: Boolean,
      value: false
    },
    customErrors: Object
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

    if (this.withRunner) {
      var boardsPanel = document.getElementById("boards");
      if (boardsPanel) {
        this.runner = boardsPanel.$.runner;
        this.runner.addEventListener("run", function (_ref) {
          var detail = _ref.detail;

          _this._onRunRequest(detail);
          _this.readonly = true;
        });
        this.runner.addEventListener("cancel", function () {
          _this.readonly = false;

          if (_this.isInteractiveOn) {
            _this.isInteractiveOn = false;
            return;
          }
          window.BUS.fire("cancel-request");
        });
        this.runner.addEventListener("end", function () {
          _this.readonly = false;
        });
      }

      this.subscribeTo("initial-state", function (event) {
        _this._runCode(event);
      }).subscribeTo("interactive-run", function () {
        _this.isInteractiveOn = true;
      });
    }

    this.subscribeTo("toggle-procedures-hint", function () {
      _this.isShowingProceduresHint = !_this.isShowingProceduresHint;
    });

    this.editor = this.$.ace.editor;
    this._setFatalities();

    this.stylist = new Stylist();
    this._removePrintMarginColumn();
    $(window).resize(function () {
      _this._fixEditorHeight();
    });
  },

  setCode: function setCode(code) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "main";
    var withTeacherErrorsReport = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    this.code[mode] = code;
    if (this.mode === mode) this.editor.setValue(code);

    if (mode === "teacher") {
      this._onTeacherLibraryChange(code, withTeacherErrorsReport);
    }
  },

  onAceReady: function onAceReady() {
    this.$.ace.editor.$blockScrolling = Infinity;
  },

  onContentChange: function onContentChange(content) {
    this.set("code." + this.mode, content.detail.value);
    this.setAsDirty();
    this.fire("content-change");
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
    this.isShowingProceduresHint = false;
    this.customErrors = null;
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

  _runCode: function _runCode(_ref2) {
    var _this3 = this;

    var initialState = _ref2.initialState,
        controller = _ref2.controller;
    var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.code;

    this.editor.getSession().clearAnnotations();

    try {
      controller.start({ initialState: initialState, code: code, initialBoardTime: 500 }, {
        onCompilationError: function onCompilationError(e) {
          if (e.message === "missing-program") {
            e.message = _this3.localize("missing-program");
            e.reason = {
              code: "missing-program",
              detail: []
            };
          }

          _this3.reportError(e, "error");
          window.BUS.fire("compilation-error");
        },
        onTeacherCompilationError: function onTeacherCompilationError(e) {
          _this3.runner.reportTeacherLibraryErrors(e);
        },
        onInteractiveRun: function onInteractiveRun() {
          window.BUS.fire("interactive-run");
        },
        onResult: function onResult(state) {
          return _this3._notify(state);
        },
        onReturnValue: function onReturnValue(value, actualReturnValue) {
          window.BUS.fire("return-value", { value: { value: value, actualReturnValue: actualReturnValue } });
        }
      }, this.runner.speed);
    } catch (e) {
      window.BUS.fire("unknown-error", e);
      console.error("---UNKNOWN ERROR---");
      throw e;
    }
  },

  checkCompilationErrors: function checkCompilationErrors() {
    var _this4 = this;

    this.editor.getSession().clearAnnotations();

    var parser = this.runner.gbsCodeRunner.parser;
    var code = { main: "program {}\n" + this.code.main, library: "program {}" };
    parser.parse(code.main, function (e) {
      e.location = parser.getErrorLineAndMode(e, code, true);
      _this4.reportError(e, "error", true);
    }, function () {});
  },

  reportError: function reportError(error, type, onTheFly) {
    error.message = this._findBestMessageFor(error);

    window.lastError = {
      error: error.reason.code,
      args: error.reason.detail
    }; // DEBUG

    console.warn({
      error: error.reason.code,
      args: error.reason.detail.map(function (it) {
        return "" + it;
      })
    });

    if (error.location.mode === "library") this._setMode("library");

    this._setAnnotation(error, type, onTheFly);
  },

  _notify: function _notify(state) {
    if (state.error) {
      this.reportError(state.error, "info");
      window.BUS.fire("execution-full-error", state.error);
      window.BUS.fire("execution-error", state.error.message);
    } else window.BUS.fire("execution-result", { board: state });
  },

  _findBestMessageFor: function _findBestMessageFor(error) {
    var defaultMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : error.message;
    var _error$reason = error.reason,
        code = _error$reason.code,
        args = _error$reason.detail;


    var customErrors = this.customErrors || [];
    var customError = customErrors.find(function (it) {
      return (it.when.error === "*" || _.castArray(it.when.error).includes(code)) && (!it.when.condition || eval(it.when.condition));
    });
    if (customError && customError.transform) eval(customError.transform);

    var customMessage = customError && _.template(customError.message)(_(args).toPlainObject().mapKeys(function (v, k) {
      return "arg" + k;
    }).value());

    return customMessage || defaultMessage;
  },
  _setAnnotation: function _setAnnotation(error) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "info";
    var onTheFly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var row = error.location.line - 1;

    if (!onTheFly) {
      this.editor.selection.setRange({ start: { row: row, column: 0 }, end: { row: row, column: Infinity } });
      this.editor.scrollToLine(row, true, true, function () {});
    }

    this.editor.getSession().setAnnotations([{
      row: row,
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

  _onTeacherLibraryChange: function _onTeacherLibraryChange(teacherCode) {
    var withErrorReport = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    this.primitiveProcedures = [];
    this.primitiveFunctions = [];
    window.BUS.fire("primitive-actions-off");

    try {
      var actions = new Parser().getActionsFromSource(teacherCode);

      if (!_.isEmpty(actions.procedureDeclarations) || !_.isEmpty(actions.functionDeclarations)) {
        this.primitiveProcedures = actions.procedureDeclarations;
        this.primitiveFunctions = actions.functionDeclarations;

        window.BUS.fire("primitive-actions-on");
      }
    } catch (e) {
      if (withErrorReport) this.runner.reportTeacherLibraryErrors(e);
    }
  },

  _removePrintMarginColumn: function _removePrintMarginColumn() {
    this.editor.setShowPrintMargin(false);
  },

  _setFatalities: function _setFatalities() {
    var _this5 = this;

    var ace = this.$.ace;

    ace.editor.commands.addCommand({
      name: "run-code",
      bindKey: { win: "ctrl+enter", mac: "command+enter" },
      exec: function exec() {
        _this5.runner.requestRun();
      }
    });
  },

  _shouldShow: function _shouldShow(action) {
    if (!this.toolbox || !this.toolbox.defaultToolbox) return true;

    // Show all if the node "PRIMITIVE_PROCEDURES" or "PRIMITIVE_FUNCTIONS"
    // is present but empty to emulate Blockly behavior
    var defaultToolboxDom = new DOMParser().parseFromString('<xml>' + this.toolbox.defaultToolbox + '</xml>', "application/xml");

    // Mantain "Procedimientos primitivos" and "Funciones primitivas" for backwards compatibility
    var elementProcedures = defaultToolboxDom.querySelectorAll('category[gbs_custom="PRIMITIVE_PROCEDURES"],category[name="Procedimientos primitivos"]');
    var elementFunctions = defaultToolboxDom.querySelectorAll('category[gbs_custom="PRIMITIVE_FUNCTIONS"],category[name="Funciones primitivas"]');
    // If it starts with uppercase it's a Procedure
    if (action.name.substring(0, 1).match(/[A-Z]/) && elementProcedures.length && !elementProcedures.childNodes) return true;
    // If it starts with lowercase it's a Function
    if (action.name.substring(0, 1).match(/[a-z]/) && elementFunctions.length && !elementFunctions.childNodes) return true;

    var toolboxNames = this.toolbox.defaultToolbox.match(/<block type="(.+)"/g).map(function (it) {
      return it.match(/<block type="(.+)"/)[1];
    });

    return _.includes(toolboxNames, action.name);
  },

  _fixEditorHeight: function _fixEditorHeight() {
    this.stylist.correctEditorHeight(this.editor);
  },

  _shouldShowProceduresHint: function _shouldShowProceduresHint(primitiveProcedures, primitiveFunctions) {
    return !_.isEmpty(primitiveProcedures) || !_.isEmpty(primitiveFunctions);
  }
});