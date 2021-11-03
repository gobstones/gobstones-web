'use strict';

var LEVELS = {
  warning: {
    icon: 'icons:warning'
  },
  info: {
    icon: 'icons:info'
  },
  error: {
    icon: 'icons:error'
  },
  success: {
    icon: 'icons:check-circle'
  }
};

Polymer({
  is: "alert-banner",
  behaviors: [Polymer.LocalizationBehavior, Polymer.BusListenerBehavior],
  properties: {
    code: String,
    title: String,
    message: String,
    level: String,
    closed: Boolean
  },
  initialize: function initialize() {
    this.closed = false;
  },
  showIfImportant: function showIfImportant() {
    // Ignore local storage setting if message is important
    if (this.isImportant()) {
      this.closed = false;
    }
  },
  cssClass: function cssClass(level, closed) {
    return closed ? 'closed' : 'flash flash-' + level;
  },
  close: function close() {
    this.closed = true;
  },
  icon: function icon(level) {
    return LEVELS[level].icon;
  },
  isImportant: function isImportant() {
    return this.level === 'warning' || this.level === 'error';
  }
});