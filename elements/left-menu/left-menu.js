"use strict";

Polymer({
  is: 'left-menu',
  behaviors: [Polymer.BusListenerBehavior, Polymer.LocalizationBehavior, Polymer.LoaderBehavior],
  properties: {
    projectType: String,
    languages: {
      type: Array,
      value: ["es", "en"]
    },
    showTutorial: {
      type: Boolean,
      value: true
    },
    selectedLanguage: Number,
    permissions: {
      type: Object,
      value: { can_use_library: true }
    },
    teacherConstructionMode: {
      type: Object,
      value: { constructionMode: '', executionType: '' }
    }
  },
  observers: ["_onSelectedLanguageChanged(selectedLanguage)"],

  attached: function attached() {
    var _this = this;

    this.subscribeTo("reset", function () {
      _this.set("permissions.can_use_library", true);
    }).subscribeTo("load-code", function () {
      _this.loadCodeOrBlocks();
    }).subscribeTo("save-code", function () {
      _this.saveCodeOrBlocks();
    }).subscribeTo('activity-settings-update', function (_ref) {
      var constructionMode = _ref.constructionMode;

      _this.teacherConstructionMode = constructionMode;
    });

    var language = window.STORAGE.getItem("language") || "es";
    var index = this.languages.indexOf(language);
    this.selectedLanguage = index >= 0 ? index : 0;

    var shouldEnableNightMode = window.STORAGE.getItem("night-mode") === "true";
    var shouldNotShowTutorial = window.STORAGE.getItem("show-tutorial") === "false";
    this.showTutorial = !shouldNotShowTutorial;
    this.nightMode = shouldEnableNightMode;
    this._onThemeChanged();

    setTimeout(function () {
      _this.$.languageSelector.label = _this.localize(_this.languages[_this.selectedLanguage]);
    }, 0);

    var generatedCodeLoader = new CodeLoader();
    generatedCodeLoader.buildContent = function (context) {
      return context.editor.generateCode(false);
    };

    this.setUpLoaders(_({
      InitialBoard: new InitialBoardLoader(),
      Attire: new IndividualAttireLoader(),
      FinalBoard: new FinalBoardLoader()
    }).assign(this._isCodeOrTeacherProject(this.projectType) ? {
      Code: new CodeLoader(),
      Library: new LibraryLoader()
    } : {}).assign(this._isTeacherProject(this.projectType) ? {
      TeacherLibrary: new TeacherLoader(),
      TeacherDescription: new DescriptionTeacherLoader()
    } : {}).assign(this._isBlocksOrTeacherProject(this.projectType) ? {
      Blocks: new CodeBlocksLoader(),
      GeneratedCode: generatedCodeLoader
    } : {}).value());
  },

  seeGeneratedCode: function seeGeneratedCode() {
    this._ide().setCurrentCode(this._context().editor.generateCode(false));
    this._ide().showCodeViewModal();
  },

  reportIssue: function reportIssue() {
    this._ide().showReportIssueModal();
  },

  loadCodeOrBlocks: function loadCodeOrBlocks() {
    this["load" + _.capitalize(this.projectType)]();
  },

  saveCodeOrBlocks: function saveCodeOrBlocks() {
    var fileName = this._toolbar().projectName + (this.projectType === "code" ? ".gbs" : ".gbk");
    this["save" + _.capitalize(this.projectType)](fileName);
  },

  createNewProject: function createNewProject() {
    window.BUS.fire("new-project");
  },

  openProjectSelector: function openProjectSelector() {
    window.BUS.fire("open-project-selector");
  },

  openCourseSelector: function openCourseSelector() {
    this._ide().showCourseSelectorModal();
  },

  saveCurrentProject: function saveCurrentProject() {
    window.BUS.fire("save-project");
  },

  exportBlocksToSvg: function exportBlocksToSvg() {
    // https://github.com/Program-AR/pilas-bloques/blob/07948875e94a3494d620c455c3c7616c285e2a78/vendor/utilidades_de_depuracion.js#L39

    var workspace = document.querySelector("gs-element-blockly").workspace;
    var aleph = workspace.svgBlockCanvas_.cloneNode(true);
    aleph.removeAttribute("width");
    aleph.removeAttribute("height");
    aleph.removeAttribute("transform");

    var cssContent = window.Blockly.Css.CONTENT.join('').replace(/font-family: sans-serif/g, "font-family: Arial");
    var css = '<defs><style type="text/css" xmlns="http://www.w3.org/1999/xhtml"><![CDATA[' + cssContent + ']]></style></defs>';

    if (aleph.children[0] !== undefined) {
      aleph.children[0].removeAttribute("transform");
    }

    var bbox = document.getElementsByClassName("blocklyBlockCanvas")[0].getBBox();
    var xmlContent = new XMLSerializer().serializeToString(aleph);
    var xml = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + bbox.width + '" height="' + bbox.height + '" viewBox="0 0 ' + bbox.width + ' ' + bbox.height + '">' + css + '<rect width="100%" height="100%" fill="white"></rect>' + xmlContent + '</svg>';

    new Loader()._saveBlob(new Blob([xml], { type: "image/svg+xml" }), 'blocks.svg');
  },

  getCourseName: function getCourseName() {
    return window.COURSE() || "---";
  },

  isEmbedded: function isEmbedded() {
    return getParameterByName("embed") === "true";
  },

  _downloadDesktopWindows: function _downloadDesktopWindows() {
    var ide = this._ide();

    if (!ide.DESKTOP_RELEASE) return this._goToLatestRelease();
    location.href = "https://github.com/gobstones/gobstones-web-desktop/releases/download/" + ide.DESKTOP_RELEASE + "/gobstones-" + this._getCommertialName() + "-windows-" + ide.DESKTOP_RELEASE + ".exe";
  },

  _downloadDesktopWindows32: function _downloadDesktopWindows32() {
    var ide = this._ide();

    if (!ide.DESKTOP_RELEASE) return this._goToLatestRelease();
    location.href = "https://github.com/gobstones/gobstones-web-desktop/releases/download/" + ide.DESKTOP_RELEASE + "/gobstones-" + this._getCommertialName() + "-windows-ia32-" + ide.DESKTOP_RELEASE + ".zip";
  },

  _downloadDesktopLinux: function _downloadDesktopLinux() {
    var ide = this._ide();

    if (!ide.DESKTOP_RELEASE) return this._goToLatestRelease();
    location.href = "https://github.com/gobstones/gobstones-web-desktop/releases/download/" + ide.DESKTOP_RELEASE + "/gobstones-" + this._getCommertialName() + "-linux-" + ide.DESKTOP_RELEASE + ".AppImage";
  },

  _getCommertialName: function _getCommertialName() {
    if (this.projectType === "blocks") return "jr";
    if (this.projectType === "code") return "sr";

    return "teacher";
  },

  _goToLatestRelease: function _goToLatestRelease() {
    location.href = "https://github.com/gobstones/gobstones-web-desktop/releases/latest";
  },

  _openAbout: function _openAbout() {
    this._ide().showAboutModal();
  },

  _onSelectedLanguageChanged: function _onSelectedLanguageChanged(selectedLanguage) {
    window.STORAGE.setItem("language", this.languages[selectedLanguage]);

    if (!this.localize) return;
    this._tryReload();
  },

  _onShowTutorialChanged: function _onShowTutorialChanged() {
    window.STORAGE.setItem("show-tutorial", this.showTutorial);
  },

  _onThemeChanged: function _onThemeChanged() {
    var _this2 = this;

    if (!this._isCodeProject(this.projectType)) return;
    window.STORAGE.setItem("night-mode", this.nightMode);

    setTimeout(function () {
      if (_this2.nightMode) {
        document.getElementById("ace").setAttribute("theme", "ace/theme/gruvbox");
        document.getElementById("main").classList.add("night");
      } else {
        document.getElementById("ace").setAttribute("theme", "ace/theme/chrome");
        document.getElementById("main").classList.remove("night");
      }
    });
  },

  _isCodeProject: function _isCodeProject(projectType) {
    return projectType === "code";
  },

  _isBlocksProject: function _isBlocksProject(projectType) {
    return projectType === "blocks";
  },

  _isTeacherProject: function _isTeacherProject(projectType) {
    return projectType === "teacher";
  },

  _isEmbeddedOrTeacherProject: function _isEmbeddedOrTeacherProject(projectType) {
    return this.isEmbedded() || this._isTeacherProject(projectType);
  },


  _isCodeOrBlocksProject: function _isCodeOrBlocksProject(projectType) {
    return this._isCodeProject(projectType) || this._isBlocksProject(projectType);
  },

  _isCodeOrTeacherProject: function _isCodeOrTeacherProject(projectType) {
    return this._isCodeProject(projectType) || this._isTeacherProject(projectType);
  },

  _isBlocksOrTeacherProject: function _isBlocksOrTeacherProject(projectType) {
    return this._isBlocksProject(projectType) || this._isTeacherProject(projectType);
  },

  _isBlocksEnabled: function _isBlocksEnabled(projectType, teacherConstructionMode) {
    return this._isBlocksProject(projectType) || this._isTeacherProject(projectType) && _.get(teacherConstructionMode, 'id') === 'blocks';
  },
  _isTextEnabled: function _isTextEnabled(projectType, teacherConstructionMode) {
    return this._isCodeProject(projectType) || this._isTeacherProject(projectType) && _.get(teacherConstructionMode, 'id') === 'text';
  },


  // _getDownloadProgress: function(downloadProgress, downloadTotal) {
  //   if (downloadTotal <= 0) return 0;
  //   return (100 * downloadProgress / downloadTotal).toFixed(2);
  // },

  _tryReload: function _tryReload() {
    if (!confirm(this.localize("you-must-reload"))) return;
    location.reload();
  },

  _isDesktop: function _isDesktop() {
    return window.GBS_DESKTOP;
  },

  _toolbar: function _toolbar() {
    return document.querySelector("#toolbar");
  }
});