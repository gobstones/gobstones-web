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
    title: String,
    message: String,
    level: String
  },
  cssClass: function cssClass(level) {
    return 'flash flash-' + level;
  },
  icon: function icon(level) {
    return LEVELS[level].icon;
  }
});