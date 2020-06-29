"use strict";

Polymer({
  is: 'gbs-editor-toolbar',
  behaviors: [Polymer.BusListenerBehavior, Polymer.LocalizationBehavior, Polymer.LoaderBehavior],
  properties: {
    projectName: {
      type: String,
      value: "Nuevo proyecto"
    },
    projectType: {
      type: String,
      value: "none"
    },
    showBoards: {
      type: Boolean,
      value: true
    },
    showLibrary: {
      type: Boolean,
      value: false
    },
    showInfo: {
      type: Boolean,
      value: false
    },
    showProceduresHint: {
      type: Boolean,
      value: false
    },
    link: {
      type: String,
      value: ""
    },
    homeLink: {
      type: String,
      value: ""
    },
    permissions: {
      type: Object,
      value: { can_use_library: true }
    },
    tooltipAnimation: Object
  },

  attached: function attached() {
    this.tooltipAnimation = {
      "entry": [{ "name": "fade-in-animation", "timing": { "delay": 0 } }],
      "exit": [{ "name": "fade-out-animation", "timing": { "delay": 0 } }]
    };
  },

  ready: function ready() {
    var _this = this;

    this.subscribeTo("mode-change", function (mode) {
      _this.showLibrary = mode === "library";
    }).subscribeTo("reset", function () {
      _this.set("permissions.can_use_library", true);
    }).subscribeTo("interactive-run", function () {
      _this.showBoards = true;
    }).subscribeTo("has-description", function (hasDescription) {
      _this.showInfo = hasDescription;
    }).subscribeTo("current-home-link", function (homeLink) {
      _this.homeLink = homeLink;
    }).subscribeTo("primitive-actions-on", function () {
      _this.showProceduresHint = true;
    }).subscribeTo("primitive-actions-off", function () {
      _this.showProceduresHint = false;
    }).subscribeTo("load-project-from-file", function () {
      // TODO: (*1) El gbs-editor-toolbar de select-mode queda activo por alguna razón
      if (_this.projectType === "none") return;

      _this.loadProject();
    }).subscribeTo("open-project-selector", function () {
      if (_this.projectType === "none") return; // TODO: (*1)

      _this.openProjectSelector();
    }).subscribeTo("new-project", function () {
      if (_this.projectType === "none") return; // TODO: (*1)

      _this.newProject();
    }).subscribeTo("save-project", function () {
      if (_this.projectType === "none") return; // TODO: (*1)

      _this.saveProject();
    });

    this.setUpLoaders({
      Project: this._projectLoader(this.projectType)
    });
  },

  openProjectSelector: function openProjectSelector() {
    if (window.GBS_IS_RUNNING || window.GBS_IS_DOWNLOADING_GUIDE) return;

    var hasNoCourse = !window.GBS_DESKTOP && !window.COURSE();
    if (hasNoCourse) this.loadProject();else this._ide().showProjectSelectorModal();
  },

  togglePanel: function togglePanel() {
    $("paper-drawer-panel")[0].togglePanel();
  },

  toggleShowBoards: function toggleShowBoards() {
    this.showBoards = !this.showBoards;
    this._ide().showBoardsChanged({ detail: this.showBoards });
  },

  toggleLibrary: function toggleLibrary() {
    if (window.GBS_IS_RUNNING) return;
    this._editor().toggleMode();
  },

  showDescription: function showDescription() {
    this.domHost.showDescriptionModal();
  },

  increaseEditorFontSize: function increaseEditorFontSize() {
    this._editor().increaseFontSize();
  },

  decreaseEditorFontSize: function decreaseEditorFontSize() {
    this._editor().decreaseFontSize();
  },

  toggleProceduresHint: function toggleProceduresHint() {
    window.BUS.fire("toggle-procedures-hint");
  },

  undo: function undo() {
    this._editor().undo();
  },

  load: function load() {
    if (this.projectType === "teacher") this.loadProject();else window.BUS.fire("load-code");
  },

  save: function save() {
    if (this.projectType === "teacher") this.saveProject();else window.BUS.fire("save-code");
  },

  openHomeLink: function openHomeLink() {
    window.open(this.homeLink, "_blank");
  },

  openLink: function openLink() {
    window.open(this.link, "_blank");
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

  _areToolsVisible: function _areToolsVisible(projectType) {
    return projectType !== "none";
  },

  _editor: function _editor() {
    return document.querySelector("#editor");
  },

  _showBoardsDirection: function _showBoardsDirection(value) {
    return value ? "right" : "left";
  },

  _hasLink: function _hasLink(link) {
    return !_.isEmpty(link);
  },

  _projectLoader: function _projectLoader(projectType) {
    if (this._isCodeProject(projectType)) return new ProjectLoader();
    if (this._isBlocksProject(projectType)) return new ProjectBlocksLoader();
    if (this._isTeacherProject(projectType)) return new ProjectTeacherLoader();
  },

  _projectExtension: function _projectExtension(projectType) {
    if (projectType === "none") return ""; // TODO: (*1)

    return this._projectLoader(projectType).EXTENSION;
  },

  _ide: function _ide() {
    return document.querySelector("#gobstones-ide");
  },

  buttonCssClass: function buttonCssClass(element) {
    if (!this.domHost) return;
    return this.domHost.buttonCssClass(element);
  }
});