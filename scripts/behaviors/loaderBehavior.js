"use strict";

Polymer.LoaderBehavior = {
  setUpLoaders: function setUpLoaders(loaders) {
    var _this = this;

    this.loaders = loaders;

    _.keys(this.loaders).forEach(function (item) {
      _this["save" + item] = function () {
        if (window.GBS_IS_RUNNING) return;
        _this.loaders[item].save(_this._context());
      };

      _this["load" + item] = function () {
        if (window.GBS_IS_RUNNING) return;
        $("#" + item).click();
      };

      _this["onLoaded" + item] = function (event) {
        _this.loaders[item].read(_this._context(), event, function () {
          if (!_.endsWith(item, "Project")) _this._closePanel();
        });
      };
    });
  },

  newProject: function newProject() {
    if (window.GBS_IS_RUNNING) return;
    if (!confirm(this.localize("new-project-confirm"))) return;

    var context = this._context();
    context.ide.setModal("");
    context.setProjectName(this.localize("new-project"));
    context.editor.reset();
    context.boards.reset();
  },

  _closePanel: function _closePanel() {
    $("paper-drawer-panel")[0].togglePanel();
  },

  _context: function _context() {
    var query = function query(id) {
      return document.querySelector(id);
    };
    var toolbar = query("#toolbar");

    return {
      ide: query("#gobstones-ide"),
      toolbar: toolbar,
      editor: query("#editor"),
      boards: query("#boards"),
      getProjectName: function getProjectName() {
        return toolbar.projectName;
      },
      setProjectName: function setProjectName(name) {
        return toolbar.projectName = name;
      }
    };
  }
};