"use strict";

Polymer.LoaderBehavior = {
  setUpLoaders: function setUpLoaders(loaders) {
    var _this = this;

    this.loaders = loaders;

    _.keys(this.loaders).forEach(function (item) {
      _this["save" + item] = function (name) {
        if (!_.isString(name)) name = undefined;

        if (window.GBS_IS_RUNNING) return;
        _this.loaders[item].save(_this._context(), name);
      };

      _this["load" + item] = function () {
        if (window.GBS_IS_RUNNING) return;
        $("#" + item).click();
      };

      _this["onLoaded" + item] = function (event) {
        var isProject = _.endsWith(item, "Project");

        if (isProject) {
          _this._ide().startLoading();
          cleanQueryString();
        }

        _this.loaders[item].read(_this._context(), event, function () {
          if (isProject) _this._ide().stopLoading();else _this._closePanel();
        });
      };
    });
  },

  newProject: function newProject() {
    if (window.GBS_IS_RUNNING || window.GBS_IS_DOWNLOADING_GUIDE) return;
    if (!confirm(this.localize("new-project-confirm"))) return;

    this._cleanAll();
  },

  _cleanAll: function _cleanAll() {
    cleanQueryString();
    this._context().reset();
  },


  _closePanel: function _closePanel() {
    $("paper-drawer-panel")[0].closeDrawer();
  },

  _context: function _context() {
    var query = function query(id) {
      return document.querySelector(id);
    };

    var loader = this;
    var ide = this._ide();
    var toolbar = query("#toolbar");
    var menu = query("#menu");
    var editor = query("#editor");
    var boards = query("#boards");

    return {
      ide: ide, toolbar: toolbar, menu: menu, editor: editor, boards: boards,
      getProjectName: function getProjectName() {
        return toolbar.projectName;
      },
      setProjectName: function setProjectName(name) {
        return toolbar.projectName = name;
      },

      reset: function reset() {
        ide.setDescription("");
        ide.setCurrentCode("");
        this.setProjectName(loader.localize("new-project"));
        editor.reset();
        boards.reset();
        ide.hideProjectSelectorModal();
        ide.preventDescriptionAutoShow = false;
        toolbar.link = "";
      }
    };
  },

  _ide: function _ide() {
    return document.querySelector("#gobstones-ide");
  },

  _goTo: function _goTo(route) {
    return document.querySelector("app-router").go(route);
  }
};