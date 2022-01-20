"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* global Blockly:readable */

var ID_TEACHER_LIBRARY = 0;
var ID_BLOCKS = 1;
var ID_CODE = 2;
var ID_DESCRIPTION = 3;
var ID_ATTIRE = 4;
var ID_METADATA = 5;

Polymer({
  is: "gobstones-teacher",
  behaviors: [Polymer.BusListenerBehavior, Polymer.LocalizationBehavior],
  properties: {
    selectedTab: {
      type: Number,
      value: 0,
      observer: "_onTabChange"
    },
    solution: {
      type: Object,
      computed: "_computeSolution(selectedSolution, availableSolutions)",
      observer: "_onSolutionSelected"
    },
    selectedSolution: {
      type: Number,
      value: 0
    },
    availableSolutions: {
      type: Array,
      value: []
    },
    studentSolutionDirty: {
      type: Boolean,
      value: false
    },
    tooltipAnimation: Object,
    constructionMode: {
      type: String,
      value: 'blocks'
    }
  },
  listeners: {
    "content-change": "_onContentChange",
    "student-solution-dirty": "_onStudentSolutionDirty",
    "activity-settings-update": "_onActivitySettingsUpdate"
  },

  attached: function attached() {
    this.tooltipAnimation = {
      "entry": [{ "name": "fade-in-animation", "timing": { "delay": 0 } }],
      "exit": [{ "name": "fade-out-animation", "timing": { "delay": 0 } }]
    };

    if (!window.COURSE()) {
      this._openActivitySettingsModal();
    } else {
      this._ide().showProjectSelectorModal();
    }
  },

  ready: function ready() {
    var _this = this;

    this.BLOCKS_SYNC_ON_ICON = "notification:sync";
    this.BLOCKS_SYNC_OFF_ICON = "notification:sync-disabled";

    setTimeout(function () {
      _this.set("availableSolutions", [{
        code: {
          main: "",
          library: "",
          teacher: ""
        },
        workspace: {
          main: "",
          library: ""
        }
      }]);

      _this.subscribeTo("teacher-save-project", _this._runProjectLinter.bind(_this));
    });

    Object.defineProperty(this, "code", {
      get: function get() {
        return this.getCode();
      }
    });

    Object.defineProperty(this, "workspace", {
      get: function get() {
        return this.solution.workspace;
      }
    });

    Object.defineProperty(this, "toolbox", {
      get: function get() {
        return this._editors()[ID_BLOCKS].toolbox;
      },
      set: function set(value) {
        this._editors()[ID_BLOCKS].toolbox = value;
      }
    });

    Object.defineProperty(this, "cover", {
      get: function get() {
        return this._editors()[ID_METADATA].cover;
      },
      set: function set(value) {
        this._editors()[ID_METADATA].cover = value;
      }
    });

    var boardsPanel = document.getElementById("boards");
    if (boardsPanel) {
      this.runner = boardsPanel.$.runner;
      this._editors()[ID_BLOCKS].runner = this.runner;
      this._editors()[ID_CODE].runner = this.runner;
      this._editors()[ID_TEACHER_LIBRARY].runner = this.runner;

      this.runner.addEventListener("run", function (_ref) {
        var detail = _ref.detail;

        if (!_this.isBlocksOrCodeTabSelected(_this.selectedTab)) {
          _this._goToCodeTab();
        }

        _this._currentEditor()._onRunRequest(detail);
        _this._editors()[ID_CODE].readonly = true;
      });
      this.runner.addEventListener("cancel", function () {
        window.BUS.fire("cancel-request");
        _this._editors()[ID_CODE].readonly = false;
      });
      this.runner.addEventListener("end", function () {
        _this._editors()[ID_CODE].readonly = false;
        setTimeout(function () {
          return _this._editors()[ID_BLOCKS].highlight();
        }, 1000);
      });

      this._editors()[ID_CODE].reportError = function (error, type) {
        _this._editors()[ID_CODE]._setAnnotation(error, type);
      };
      this._editors()[ID_CODE]._setMode = _.noop;
    }

    this.subscribeTo("initial-state", function (event) {
      _this._currentEditor()._runCode(event, _this.getCode(), true);
    }).subscribeTo("execution-full-error", function (error) {
      var teacherBoom = _this._getTeacherBoomLocation(error);
      if (!teacherBoom || _this.selectedTab !== ID_CODE) return;

      error.location.line = teacherBoom.line;

      _this.selectedTab = ID_TEACHER_LIBRARY;
      _this._editors()[ID_TEACHER_LIBRARY].reportError(error);
    });

    this._patchBlocklyPlaceholderBlocks();
  },

  preSave: function preSave() {
    this.selectedSolution = 0;
  },

  getCode: function getCode() {
    return _.merge({}, this.solution.code, {
      library: this._getSolutionLibrary(),
      teacher: this._getSolutionTeacher()
    });
  },

  setCode: function setCode(code, mode, isBlocklyCode) {
    var shouldUseBlocks = isBlocklyCode !== undefined ? isBlocklyCode : code.startsWith("<");

    var editors = this._editors();

    if (mode === "library") {
      editors[ID_BLOCKS].setCode(code, mode);
      editors[ID_CODE].setCode(code, mode);
    } else if (mode === "teacher") {
      editors[ID_TEACHER_LIBRARY].setCode(code);
      editors[ID_BLOCKS].setCode(code, mode);
      editors[ID_CODE].setCode(code, mode);
    } else {
      editors[shouldUseBlocks ? ID_BLOCKS : ID_CODE].setCode(code);
    }
  },

  getDescription: function getDescription() {
    return this._editors()[ID_DESCRIPTION].getDescription();
  },

  setDescription: function setDescription(content) {
    this._editors()[ID_DESCRIPTION].setDescription(content);
  },

  getMetadata: function getMetadata() {
    return this._editors()[ID_METADATA].getMetadata();
  },

  setMetadata: function setMetadata(content, options) {
    this._editors()[ID_METADATA].setMetadata(content, options);

    var constructionMode = this._parseInitialSetting({
      content: content,
      path: 'activity.construction_mode',
      defaultId: 'blocks',
      allValues: ConstructionModes
    });

    this.constructionMode = constructionMode.id;

    var executionType = this._parseInitialSetting({
      content: content,
      path: 'activity.execution_type',
      defaultId: 'sequential',
      allValues: ExecutionTypes
    });

    this.setInitialSettings({ constructionMode: constructionMode, executionType: executionType, options: options });
  },

  setInitialSettings: function setInitialSettings(content) {
    this._editors()[ID_METADATA].setInitialSettings(content);

    var fromLoader = _.get(content, 'options.fromLoader', false);
    if (!fromLoader) {
      this._editors()[ID_BLOCKS].setCode(content.executionType.initialCode, 'main', true, { skipDirtyCheck: true });
    }
  },


  generateCode: function generateCode(withRegions, blockly) {
    return this._editors()[ID_BLOCKS].generateCode(withRegions, blockly);
  },

  addCode: function addCode(xml) {
    return this._editors()[ID_BLOCKS].addCode(xml);
  },

  reset: function reset() {
    var solutionsCount = this.availableSolutions.length;
    for (var i = 0; i < solutionsCount - 1; i++) {
      this.removeCurrentSolution();
    }return this._editors().forEach(function (editor) {
      return editor.reset && editor.reset();
    });
  },

  getSolutionDisplayName: function getSolutionDisplayName(item, localize) {
    return item.name ? item.name : localize("solutions-student");
  },

  renameSolution: function renameSolution() {
    var index = this.selectedSolution;
    if (index === 0) return;

    var name = this._getUniqueSolutionName();
    if (!name) return;

    this.set("availableSolutions." + index, Object.assign(_.cloneDeep(this.availableSolutions[index]), { name: name }));
    this.selectedSolution = 0;
    this.selectedSolution = index;
  },

  addSolution: function addSolution() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var index = this.availableSolutions.length;
    this.push("availableSolutions", {
      code: { main: "", library: "", teacher: "" },
      workspace: { main: "", library: "" },
      name: name === null ? this.localize("solutions-solution") + " " + index : name
    });
    this.selectedSolution = index;
  },

  addSolutionByName: function addSolutionByName() {
    var name = this._getUniqueSolutionName();
    if (!name) return;

    this.addSolution(name);
  },

  removeCurrentSolution: function removeCurrentSolution() {
    var _this2 = this;

    this._removeSolution(function (index) {
      _this2.splice("availableSolutions", index, 1);
    });
  },

  isBlocksOrCodeTabSelected: function isBlocksOrCodeTabSelected(selectedTab) {
    return selectedTab === ID_BLOCKS || selectedTab === ID_CODE;
  },

  _ide: function _ide() {
    return document.querySelector("#gobstones-ide");
  },
  _parseInitialSetting: function _parseInitialSetting(_ref2) {
    var content = _ref2.content,
        path = _ref2.path,
        defaultId = _ref2.defaultId,
        allValues = _ref2.allValues;

    var id = _.get(content, path, defaultId);
    return _.find(allValues, { id: id });
  },
  _openActivitySettingsModal: function _openActivitySettingsModal() {
    document.querySelector("#activitySettingsModal").open();
  },


  _saveProject: function _saveProject() {
    window.BUS.fire('save-project');
  },

  _onActivitySettingsUpdate: function _onActivitySettingsUpdate(_ref3) {
    var _ref3$detail = _ref3.detail,
        constructionMode = _ref3$detail.constructionMode,
        executionType = _ref3$detail.executionType;

    this.constructionMode = constructionMode.id;
    this.setInitialSettings({
      constructionMode: constructionMode,
      executionType: executionType
    });
  },
  _isBlocksMode: function _isBlocksMode(constructionMode) {
    return constructionMode == 'blocks';
  },
  _isTextMode: function _isTextMode(constructionMode) {
    return constructionMode == 'text';
  },


  _runProjectLinter: function _runProjectLinter() {
    document.querySelector("#projectLinterModal").open();
    window.BUS.fire("project-linter-start");
    this._validateCode();
  },

  // @faloi: sería ideal que no se ejecute el código, sino que solamente se compile.
  _validateCode: function _validateCode() {
    this._goToCodeTab();
    var boardsPanel = document.getElementById("boards");
    var runner = boardsPanel.$.runner;

    // @faloi: se larga la ejecución y luego se frena para no tener que esperar que termine.
    // Los eventos que interesan (errores) se disparan igual.
    runner.requestRun();
    runner.stop();
  },

  _goToCodeTab: function _goToCodeTab() {
    this.selectedTab = this.constructionMode == 'blocks' ? ID_BLOCKS : ID_CODE;
  },


  _getUniqueSolutionName: function _getUniqueSolutionName() {
    var _this3 = this;

    var name = null;
    var withExistsWarning = false;

    var _loop = function _loop() {
      var input = prompt(_this3.localize("insert-solution-name") + (withExistsWarning ? _this3.localize("an-available-name") : ""));
      if (!input) return {
          v: void 0
        };

      input = input.replace(/[^0-9A-Z -]/ig, "_");
      var exists = _this3.availableSolutions.some(function (it) {
        return it.name === input;
      });

      if (!exists) name = input;else withExistsWarning = true;
    };

    while (!name) {
      var _ret = _loop();

      if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
    }

    return name.slice(0, 25);
  },

  _setSolutionCode: function _setSolutionCode(code) {
    this.availableSolutions[this.selectedSolution].code.main = code;
  },

  _setSolutionWorkspace: function _setSolutionWorkspace(workspace) {
    if (this.availableSolutions[this.selectedSolution]) {
      this.availableSolutions[this.selectedSolution].workspace.main = workspace;
    }
  },

  _getSolutionLibrary: function _getSolutionLibrary() {
    return this.availableSolutions[0].code.library;
  },

  _setSolutionLibrary: function _setSolutionLibrary(library) {
    this.availableSolutions[0].code.library = library;
  },

  _getSolutionTeacher: function _getSolutionTeacher() {
    return this.availableSolutions[0].code.teacher;
  },

  _setSolutionTeacher: function _setSolutionTeacher(teacher) {
    this.availableSolutions[0].code.teacher = teacher;
  },

  _removeSolution: function _removeSolution(action) {
    if (this.availableSolutions.length < 2) return;

    var index = this.selectedSolution;
    if (index === 0) index++;
    action(index);

    this.selectedSolution = Math.max(0, this.availableSolutions.length - 1);
  },

  _computeSolution: function _computeSolution(selectedSolution, availableSolutions) {
    return availableSolutions[selectedSolution];
  },

  _onSolutionSelected: function _onSolutionSelected() {
    var _this4 = this;

    setTimeout(function () {
      _this4.setCode(_this4.solution.code.main, "main", false);
      _this4.setCode(_this4.solution.workspace.main, "main", true);
    });
  },

  _onStudentSolutionDirty: function _onStudentSolutionDirty() {
    this.studentSolutionDirty = true;
  },


  _onContentChange: function _onContentChange(event) {
    var _this5 = this;

    var editors = this._editors();

    var editor = event.target;
    if (editor.id === "code-editor") {
      this._setSolutionCode(editor.code.main);
      if (!this.isSyncingBlocks) this._setBlocksSyncOff();
    }
    if (editor.id === "blocks-editor") {
      this._setSolutionWorkspace(editor.workspace.main);
      if (this.blocksSyncEnabled) this._copyBlocksToCode();
    }
    if (editor.id === "library-editor") {
      var code = editor.code.main;
      this._setSolutionLibrary(code);
      editors[ID_BLOCKS].setCode(code, "library");
      editors[ID_CODE].setCode(code, "library");
    }
    if (editor.id === "teacher-library-editor") {
      var _code = editor.code.main;
      this._setSolutionTeacher(_code);
      editors[ID_BLOCKS].setCode(_code, "teacher", false);
      editors[ID_CODE].setCode(_code, "teacher", false);

      editor.checkCompilationErrors();
    }

    this.async(function () {
      _this5.isSyncingBlocks = false;
    });
  },

  _getTeacherBoomLocation: function _getTeacherBoomLocation(error) {
    var errorLine = error.on.range.start.row;
    var mainLines = this.solution.code.main.split("\n").length;
    var libraryLines = this.solution.code.library.split("\n").length;

    return errorLine > mainLines + libraryLines ? { line: errorLine - mainLines - libraryLines } : null;
  },

  _setBlocksSyncOff: function _setBlocksSyncOff() {
    this.$['fab-sync-button'].icon = this.BLOCKS_SYNC_OFF_ICON;
    $(this.$['fab-sync-button']).removeClass('sync-on');
    $(this.$['fab-sync-button']).addClass('sync-off');
    this.blocksSyncEnabled = false;
  },

  _setBlocksSyncOn: function _setBlocksSyncOn() {
    this.$['fab-sync-button'].icon = this.BLOCKS_SYNC_ON_ICON;
    $(this.$['fab-sync-button']).removeClass('sync-off');
    $(this.$['fab-sync-button']).addClass('sync-on');

    var generatedCode = this.generateCode(false);
    var currentCode = this.solution.code.main;

    if (currentCode !== "" && currentCode !== generatedCode) {
      var userAccepts = confirm(this.localize("blocks-sync-confirm-overwrite"));
      if (!userAccepts) return;
    }

    this.blocksSyncEnabled = true;
    this._copyBlocksToCode();
  },

  _copyBlocksToCode: function _copyBlocksToCode() {
    var generatedCode = this.generateCode(false);
    this.isSyncingBlocks = true;
    this._setSolutionCode(generatedCode);
    this.setCode(generatedCode);
  },


  _patchBlocklyPlaceholderBlocks: function _patchBlocklyPlaceholderBlocks() {
    var comandoCompletar = Blockly.Blocks.ComandoCompletar.init;
    Blockly.Blocks.ComandoCompletar.init = function () {
      comandoCompletar.call(this);
      this.inputList[0].fieldRow[0].setText("COMPLETAR COMANDO");
    };

    var expresionCompletar = Blockly.Blocks.ExpresionCompletar.init;
    Blockly.Blocks.ExpresionCompletar.init = function () {
      expresionCompletar.call(this);
      this.inputList[0].fieldRow[0].setText("COMPLETAR EXPRESIÓN");
    };

    var asociacionDeTeclaCompletar = Blockly.Blocks.AsociacionDeTeclaCompletar.init;
    Blockly.Blocks.AsociacionDeTeclaCompletar.init = function () {
      asociacionDeTeclaCompletar.call(this);
      this.inputList[0].fieldRow[0].setText("COMPLETAR EVENTO");
    };
  },

  _blocksClass: function _blocksClass(selectedTab) {
    return selectedTab === ID_BLOCKS ? "visible" : "unvisible";
  },
  _codeClass: function _codeClass(selectedTab) {
    return selectedTab === ID_CODE ? "visible" : "unvisible";
  },
  _teacherLibraryClass: function _teacherLibraryClass(selectedTab) {
    return selectedTab === ID_TEACHER_LIBRARY ? "visible" : "unvisible";
  },
  _descriptionClass: function _descriptionClass(selectedTab) {
    return selectedTab === ID_DESCRIPTION ? "visible" : "unvisible";
  },
  _attireClass: function _attireClass(selectedTab) {
    return selectedTab === ID_ATTIRE ? "visible" : "unvisible";
  },
  _metadataClass: function _metadataClass(selectedTab) {
    return selectedTab === ID_METADATA ? "visible" : "unvisible";
  },

  _editors: function _editors() {
    var _this6 = this;

    return ["teacher-library-editor", "blocks-editor", "code-editor", "description-editor", "attire-editor", "metadata-editor"].map(function (it) {
      return _this6.$[it];
    });
  },

  _currentEditor: function _currentEditor() {
    var selectedTab = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.selectedTab;

    return this._editors()[selectedTab];
  },

  _onTabChange: function _onTabChange() {
    window.BUS.fire("editor-dirty");
  }
});