"use strict";

Polymer({
  is: "project-linter",
  behaviors: [Polymer.LocalizationBehavior, Polymer.BusListenerBehavior],
  properties: {
    failedChecks: {
      type: Array,
      default: []
    },
    /*
    @faloi:
    No me anduvo de ninguna forma el if para ver si failedChecks tenía algo. Salió así...
    */
    failedChecksCount: {
      type: Number,
      default: 0
    }
  },

  ready: function ready() {
    this._subscribeToError({
      event: "compilation-error",
      check: {
        name: "check-student-code-error",
        level: "warning"
      }
    });

    this._subscribeToError({
      event: "teacher-library-compilation-error",
      check: {
        name: "check-teacher-library-error",
        level: "error"
      }
    });

    this.subscribeTo("project-linter-start", this.reset.bind(this));
  },

  reset: function reset() {
    this.set("failedChecks", []);
    this.failedChecksCount = 0;
  },

  _anyErrors: function _anyErrors(failedChecksCount) {
    return failedChecksCount > 0;
  },

  _errorTitle: function _errorTitle(error) {
    return this.localize(error.name + "-title");
  },

  _errorDescription: function _errorDescription(error) {
    return this.localize(error.name + "-description");
  },

  _subscribeToError: function _subscribeToError(_ref) {
    var _this = this;

    var event = _ref.event,
        _ref$check = _ref.check,
        name = _ref$check.name,
        level = _ref$check.level;

    this.subscribeTo(event, function () {
      _this.push("failedChecks", {
        name: name,
        level: level
      });

      _this.failedChecksCount++;
    });
  },

  _pendingChecks: function _pendingChecks() {
    return false;
  }
});