"use strict";

Polymer({
  is: 'select-project',
  behaviors: [Polymer.LocalizationBehavior, Polymer.LoaderBehavior],

  ready: function ready() {
    this.setUpLoaders({
      InitialBlocksProject: new ProjectBlocksLoader()
    });
  },

  useBlocks: function useBlocks() {
    this.loadInitialBlocksProject();
  },

  useCode: function useCode() {
    this._goTo("/code");
  },

  onInitialProjectLoad: function onInitialProjectLoad(event) {
    var _this = this;

    this._goTo("/blocks");

    window.LOAD_PENDING_PROJECT = function () {
      _this.onLoadedInitialBlocksProject(event);
    };
  },

  _goTo: function _goTo(route) {
    return document.querySelector("app-router").go(route);
  }
});