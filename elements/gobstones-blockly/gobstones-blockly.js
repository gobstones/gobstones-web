"use strict";

Polymer({
  is: "gobstones-blockly",
  behaviors: [Polymer.BusListenerBehavior],
  properties: {
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
    workspace: {
      type: Object,
      value: { main: "", library: "" }
    },
    workspaceXml: {
      type: String,
      observer: "_updateCode"
    },

    libraryProcedures: Array,
    libraryFunctions: Array
  },

  ready: function ready() {
    var _this = this;

    var boardsPanel = document.getElementById("boards");
    if (boardsPanel) {
      this.runner = boardsPanel.$.runner;
      this.runner.addEventListener("run", function (_ref) {
        var detail = _ref.detail;

        _this._onRunRequest(detail);
      });
      this.runner.addEventListener("cancel", function () {
        window.BUS.fire("cancel-request");
      });
    }

    this.subscribeTo("initial-state", function (event) {
      _this._runCode(event);
    });

    this.stylist = new Stylist();
    this.stylist.setBlocklyResize();

    setTimeout(function () {
      if (window.LOAD_PENDING_PROJECT) {
        window.LOAD_PENDING_PROJECT();
        window.LOAD_PENDING_PROJECT = undefined;
      }
    }, 0);

    window.blockly = this.$.blockly; // TODO: Es para debuggear
  },

  addCode: function addCode(xml) {
    this.$.blockly.appendBlocksToWorkspace(xml);
  },

  setCode: function setCode(code) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "main";

    this.workspace[mode] = code;
    this.code[mode] = mode === "teacher" ? code : this._xmlToCode(code);
    if (this.mode === mode) this.workspaceXml = code;

    if (mode === "teacher") {
      this._onTeacherLibraryChange(code);
    }
  },

  toggleMode: function toggleMode() {
    if (this.mode === "library" && this.libraryHasErrors) window.BUS.fire("compilation-error", { libraryHasErrors: true });

    this._setMode(this.mode === "main" ? "library" : "main");
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
    this.$.blockly.primitiveProcedures = [];
    this.$.blockly.primitiveFunctions = [];
  },

  _onRunRequest: function _onRunRequest(options) {
    this._setMode("main");
    window.BUS.fire("run-request", options);
  },

  _runCode: function _runCode(initialState) {
    var _this2 = this;

    var code = this.code;
    this._onTeacherLibraryChange(code.teacher);

    console.info("GENERATED CODE", code);
    try {
      this.runner.run({ initialState: initialState, code: code }, function (error, code) {
        var line = _.trim(code[error.location.mode].split("\n")[error.location.line]);
        window.BUS.fire("compilation-error", { error: error, line: line });
      }, function (state) {
        return _this2._notify(state);
      });
    } catch (e) {
      window.BUS.fire("unknown-error", e);
      console.error("---UNKNOWN ERROR---");
      throw e;
    }
  },

  _notify: function _notify(state) {
    if (state.error) {
      window.BUS.fire("execution-error", state.error.message);
    } else window.BUS.fire("execution-result", { board: state });
  },

  _setMode: function _setMode(mode) {
    this.mode = mode;
    window.BUS.fire("mode-change", this.mode);
    this.workspaceXml = this._getWorkspace()[this.mode];

    // TODO: Enviar a libraryProcedures y libraryFunctions
    // Ver bien en qué formato mandarlos. Propuesta: "PonerBolitasEn(color,direccion)"
    // https://github.com/Program-AR/gs-element-blockly/issues/50#issuecomment-280254981

    // this.$.blockly.primitiveProcedures = mode === "main" ? this.libraryProcedures : [];
    // this.$.blockly.primitiveProcedures = mode === "main" ? this.libraryFunctions : [];
  },

  _updateCode: function _updateCode() {
    if (!this.EMPTY_WORKSPACE) this.EMPTY_WORKSPACE = this.workspaceXml;

    if (this.runner) this.runner.stop();
    this._getWorkspace()[this.mode] = this.workspaceXml;
    this.code[this.mode] = this.$.blockly.generateCode();

    if (this.mode === "library") this._updateLibraryActions();
  },

  _onTeacherLibraryChange: function _onTeacherLibraryChange(teacher) {
    try {
      var actions = this._getActionNames(teacher);

      if (!_.isEmpty(actions.procedureNames)) {
        this.$.blockly.primitiveProcedures = actions.procedureNames;
        this.$.blockly.primitiveFunctions = actions.functionNames;
      }
    } catch (e) {
      this.runner.reportTeacherLibraryErrors(e);
    }
  },

  _updateLibraryActions: function _updateLibraryActions() {
    try {
      var actions = this._getActions(this.code.library);

      this.libraryProcedures = actions.procedureDeclarations;
      this.libraryFunctions = actions.functionDeclarations;
      this.libraryHasErrors = false;
    } catch (e) {
      // it does not compile
      this.libraryHasErrors = true;
    }
  },

  _getActions: function _getActions(sourceCode) {
    var declarations = new Parser().parse(sourceCode).declarations;
    var withAlias = function withAlias(alias) {
      return function (declaration) {
        return declaration.alias === alias + "Declaration";
      };
    };

    var computeDeclarations = function computeDeclarations(alias) {
      return _.filter(declarations, withAlias(alias));
    };

    return {
      procedureDeclarations: computeDeclarations("procedure"),
      functionDeclarations: computeDeclarations("function")
    };
  },

  _getActionNames: function _getActionNames(sourceCode) {
    var declarations = this._getActions(sourceCode);
    var isAuxiliaryDeclaration = function isAuxiliaryDeclaration(declaration) {
      return declaration.name.toLowerCase().startsWith("aux");
    };

    var computeDeclarations = function computeDeclarations(type) {
      return _(declarations[type + "Declarations"]).reject(isAuxiliaryDeclaration).map("name").value();
    };

    return {
      procedureNames: computeDeclarations("procedure"),
      functionNames: computeDeclarations("function")
    };
  },

  _getWorkspace: function _getWorkspace() {
    return this.workspace || {};
  },

  _xmlToCode: function _xmlToCode(xml) {
    this.$.blocklytmp.workspaceXml = xml;
    return this.$.blocklytmp.generateCode();
  }
});