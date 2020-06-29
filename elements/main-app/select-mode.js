"use strict";

Polymer({
  is: 'select-mode',
  behaviors: [Polymer.LocalizationBehavior],

  ready: function ready() {},

  useBlocks: function useBlocks() {
    this._goTo("/blocks");
  },

  useCode: function useCode() {
    this._goTo("/code");
  },

  useTeacher: function useTeacher() {
    this._goTo("/teacher");
  },

  _goTo: function _goTo(route) {
    return document.querySelector("app-router").go(route);
  }
});