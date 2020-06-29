"use strict";

window.GBS_GET_BLOCKLY_MEDIA_DIR = function () {
  var route = "bower_components/blockly-package/media/";

  return window.GBS_DESKTOP ? route : "https://gobstones.github.io/gobstones-web/" + route;
};

window.GBS_GET_BLOCKLY_LOCAL_MEDIA_DIR = function () {
  var route = "bower_components/gs-element-blockly/media/";

  return window.GBS_DESKTOP ? route : "https://gobstones.github.io/gobstones-web/" + route;
};
Polymer({
  is: "gobstones-blockly",
  behaviors: [Polymer.BusListenerBehavior, Polymer.ToastBehavior, Polymer.LocalizationBehavior],
  properties: {
    mediaDir: {
      type: String,
      value: window.GBS_GET_BLOCKLY_MEDIA_DIR()
    },
    localMediaDir: {
      type: String,
      value: window.GBS_GET_BLOCKLY_LOCAL_MEDIA_DIR()
    },
    mode: {
      type: String,
      value: "main"
    },
    code: {
      type: Object,
      value: { main: "", library: "", teacher: "" },
      observer: "setAsDirty"
    },
    toolbox: Object,
    customErrors: Object,
    workspace: {
      type: Object,
      value: { main: "" }
    },
    workspaceXml: {
      type: String,
      observer: "_updateCode"
    },
    withRunner: {
      type: Boolean,
      value: false
    }
  },

  ready: function ready() {
    var _this = this;

    if (this.withRunner) {
      var boardsPanel = document.getElementById("boards");
      if (boardsPanel) {
        this.runner = boardsPanel.$.runner;
        this.runner.addEventListener("run", function (_ref) {
          var detail = _ref.detail;

          _this._onRunRequest(detail);
        });
        this.runner.addEventListener("end", function () {
          setTimeout(function () {
            return _this.highlight();
          }, 1000);
        });
        this.runner.addEventListener("cancel", function () {
          if (_this.isInteractiveOn) {
            _this.isInteractiveOn = false;
            return;
          }
          window.BUS.fire("cancel-request");
        });
      }

      this.subscribeTo("initial-state", function (event) {
        _this._runCode(event);
      }).subscribeTo("interactive-run", function () {
        _this.isInteractiveOn = true;
      });
    }

    this.stylist = new Stylist();
    this.stylist.setUpBlocklyCustomizations();

    setTimeout(function () {
      _this.fire("open-blocks-project-selector");
      $(window).trigger("resize");
      _this._setEmptyProceduresMessageListener();
    }, 0);

    window.blockly = this.$.blockly;
  },

  addCode: function addCode(xml) {
    this.$.blockly.appendBlocksToWorkspace(xml);
  },

  undo: function undo() {
    this.$.blockly.workspace.undo();
  },

  setCode: function setCode(code) {
    var _this2 = this;

    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "main";
    var withTeacherErrorsReport = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    this.workspace[mode] = code;
    this.code[mode] = mode === "teacher" ? code : this._xmlToCode(code);
    if (this.mode === mode) {
      if (code !== "") this.workspaceXml = code;else this.$.blockly.resetWorkspace();

      setTimeout(function () {
        _this2.$.blockly.workspace.undoStack_ = [];
      }, 0);
    }

    if (mode === "teacher") {
      this._onTeacherLibraryChange(code, withTeacherErrorsReport);
    }
  },

  setAsDirty: function setAsDirty() {
    window.BUS.fire("editor-dirty");
  },

  reset: function reset() {
    this._setMode("main");
    this.setCode(this.EMPTY_WORKSPACE, "main");
    this.setCode("", "library");
    this.setCode("", "teacher");
    this.toolbox = null;
    this.customErrors = null;
    this.$.blockly.primitiveProcedures = [];
    this.$.blockly.primitiveFunctions = [];
    this.$.blockly.setDefaultToolbox();
  },

  generateCode: function generateCode() {
    var withRegions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var blockly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.$.blockly;

    return blockly.generateCode({
      withRegions: withRegions,
      clearErrors: false
    });
  },
  highlight: function highlight(region) {
    this.$.blockly.highlightBlock(region);
  },
  getRole: function getRole(withRunner) {
    return withRunner ? "student" : "teacher";
  },


  _onRunRequest: function _onRunRequest(options) {
    this._setMode("main");
    window.BUS.fire("run-request", options);
  },

  _runCode: function _runCode(_ref2) {
    var _this3 = this;

    var initialState = _ref2.initialState,
        controller = _ref2.controller;
    var requiredCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.code;

    var code = _.assign(requiredCode, { main: this.code.main });
    this._onTeacherLibraryChange(code.teacher);

    this._cleanErrors();
    console.info("GENERATED CODE", code);

    try {
      controller.start({ initialState: initialState, code: code, initialBoardTime: 500 }, {
        onCompilationError: function onCompilationError(error, code) {
          var region = error.on.region;

          if (region) _this3._showError(region, error);
          window.BUS.fire("compilation-error");
        },
        onTeacherCompilationError: function onTeacherCompilationError(e) {
          _this3.runner.reportTeacherLibraryErrors(e);
        },
        onInteractiveRun: function onInteractiveRun() {
          window.BUS.fire("interactive-run");
        },
        onResult: function onResult(state) {
          var fullState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var regionStack = fullState.regionStack;

          var region = _this3._getLastRegion(regionStack);
          if (region) _this3.highlight(region);
          _this3._notify(state);
        }
      }, this.runner.speed);
    } catch (e) {
      window.BUS.fire("unknown-error", e);
      console.error("---UNKNOWN ERROR---");
      throw e;
    }
  },

  _notify: function _notify(state) {
    if (state.error) {
      var regionStack = state.error.on.regionStack;

      var region = this._getLastRegion(regionStack);
      if (region) this._showError(region, state.error);
      window.BUS.fire("execution-error", state.error.message);
    } else window.BUS.fire("execution-result", { board: state });
  },

  _setMode: function _setMode(mode) {
    this.mode = mode;
    window.BUS.fire("mode-change", this.mode);
    this.workspaceXml = this._getWorkspace()[this.mode];
  },

  _updateCode: function _updateCode() {
    if (!this.EMPTY_WORKSPACE) this.EMPTY_WORKSPACE = this.workspaceXml;
    this._getWorkspace()[this.mode] = this.workspaceXml;

    var newCode = this.generateCode();
    if (this.code[this.mode] === newCode) {
      this.fire("content-change");
      return;
    }

    if (this.runner) this.runner.stop();
    this.code[this.mode] = newCode;

    this.fire("content-change");
    this._cleanErrors();
  },

  _cleanErrors: function _cleanErrors() {
    try {
      this.$.blockly.workspace.removeBlockErrors();
    } catch (e) {}
  },

  _onTeacherLibraryChange: function _onTeacherLibraryChange(teacherCode) {
    var withErrorReport = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    try {
      var actions = new Parser().getActionsFromSource(teacherCode);

      this.$.blockly.primitiveProcedures = actions.procedureDeclarations;
      this.$.blockly.primitiveFunctions = actions.functionDeclarations;
    } catch (e) {
      if (withErrorReport) this.runner.reportTeacherLibraryErrors(e);
    }
  },

  _getWorkspace: function _getWorkspace() {
    return this.workspace || {};
  },

  _xmlToCode: function _xmlToCode(xml) {
    this.$.blocklytmp.workspaceXml = xml;
    return this.generateCode(undefined, this.$.blocklytmp);
  },

  _setEmptyProceduresMessageListener: function _setEmptyProceduresMessageListener() {
    var _this4 = this;

    // Feo y super acoplado a Blockly. Yo avisé que no se podía hacer XD

    var MAX_FLYOUT_WIDTH = 50;

    var showMessageIfNeeded = function showMessageIfNeeded() {
      var selectedCategory = $(".blocklyTreeSelected")[0];
      if (selectedCategory) {
        var categoryName = selectedCategory.innerText;
        if (categoryName === _this4._lastSelectedCategory) return;
        _this4._lastSelectedCategory = categoryName;
        var flyoutWidth = $(".blocklyFlyout").width();

        if (flyoutWidth < MAX_FLYOUT_WIDTH) {
          if (categoryName === _this4.localize("my-procedures")) _this4.showToast(_this4.localize("define-your-own-procedures"));else if (categoryName === _this4.localize("my-functions")) _this4.showToast(_this4.localize("define-your-own-functions"));
        }
      }
    };

    var toolbox = $(".blocklyToolboxDiv");
    toolbox.mousemove(showMessageIfNeeded);
    toolbox.mouseup(showMessageIfNeeded);
  },

  _getLastRegion: function _getLastRegion(regionStack) {
    return _(regionStack).compact().last();
  },
  _showError: function _showError(region, error) {
    var _this5 = this;

    var block = this.$.blockly.workspace.getBlockById(region);
    error.message = this._findBestMessageFor(block, error);

    window.lastError = {
      block: block.type,
      error: error.reason.code,
      args: error.reason.detail
    }; // DEBUG

    console.warn({
      block: block.type,
      error: error.reason.code,
      args: error.reason.detail.map(function (it) {
        return "" + it;
      })
    });

    if (block) this._scrollToBlock(block, function () {
      _this5.$.blockly.showBlockError(region, error.message);
    });
  },
  _findBestMessageFor: function _findBestMessageFor(block, error) {
    var defaultMessage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : error.message;

    var type = block.type;
    var _error$reason = error.reason,
        code = _error$reason.code,
        args = _error$reason.detail;


    var customErrors = (this.customErrors || []).concat(window.GBS_BLOCKLY_ERRORS);
    var customError = customErrors.find(function (it) {
      return (it.when.block === "*" || _.castArray(it.when.block).includes(type)) && (it.when.error === "*" || _.castArray(it.when.error).includes(code)) && (!it.when.condition || eval(it.when.condition));
    });
    if (customError && customError.transform) eval(customError.transform);

    var customMessage = customError && _.template(customError.message)(_(args).toPlainObject().mapKeys(function (v, k) {
      return "arg" + k;
    }).value());

    return customMessage || defaultMessage;
  },
  _scrollToBlock: function _scrollToBlock(block) {
    var onComplete = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var workspace = this.$.blockly.workspace;


    var position = block.getRelativeToSurfaceXY();

    var _workspace$getMetrics = workspace.getMetrics(),
        viewLeft = _workspace$getMetrics.viewLeft,
        contentLeft = _workspace$getMetrics.contentLeft,
        viewTop = _workspace$getMetrics.viewTop,
        contentTop = _workspace$getMetrics.contentTop,
        viewWidth = _workspace$getMetrics.viewWidth,
        viewHeight = _workspace$getMetrics.viewHeight;

    var scrollbarPosition = {
      x: viewLeft - contentLeft,
      y: viewTop - contentTop
    };
    var finalPosition = {
      x: position.x - viewWidth / 4 - contentLeft,
      y: position.y - viewHeight / 2 - contentTop
    };

    if (Math.abs(scrollbarPosition.x - finalPosition.x) < 0.01 && Math.abs(scrollbarPosition.y - finalPosition.y) < 0.01) return onComplete();

    if (this.$scrollTween) this.$scrollTween.stop();
    this.$scrollTween = new TWEEN.Tween(scrollbarPosition).to(finalPosition, 500).onUpdate(function () {
      workspace.scrollbar.set(scrollbarPosition.x, scrollbarPosition.y);
    }).onComplete(onComplete).start();
  }
});