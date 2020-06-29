"use strict";

var MAX_SPEED = 5;

Polymer({
  is: 'code-runner',
  behaviors: [Polymer.BusListenerBehavior, Polymer.LocalizationBehavior, Polymer.ToastBehavior],
  properties: {
    speed: {
      type: Number,
      value: MAX_SPEED
    },
    useRandomBoard: {
      type: Boolean,
      value: false
    },

    immediateSpeed: {
      type: Number,
      value: MAX_SPEED
    },

    permissions: {
      type: Object,
      value: {
        can_change_source: true,
        can_change_speed: true
      }
    }
  },
  listeners: {
    "immediate-value-change": "_onSpeedChange",
    "gbs-run-request": "_onRunRequest",
    "gbs-start": "_onStart",
    "gbs-stop": "_onStop"
  },

  ready: function ready() {
    var _this = this;

    this.subscribeTo("reset", function () {
      return _this.reset();
    });
    this.gbsCodeRunner = this.$.playButton;
  },

  requestRun: function requestRun() {
    this.gbsCodeRunner.requestRun();
  },

  stop: function stop() {
    this.gbsCodeRunner.stop();
  },

  toggleRandom: function toggleRandom() {
    this.useRandomBoard = !this.useRandomBoard;
    this.showToast(this.localize("using-random-" + this.useRandomBoard));
  },

  reset: function reset() {
    this.speed = MAX_SPEED;
    this.useRandomBoard = false;

    this.set("permissions.can_change_source", true);
    this.set("permissions.can_change_speed", true);
  },

  reportTeacherLibraryErrors: function reportTeacherLibraryErrors(e) {
    debugger;
    this.showToast(this.localize("teachers-library-has-errors"));
    console.error(e);
  },

  _onRunRequest: function _onRunRequest(_ref) {
    var controller = _ref.detail;

    this.fire("run", {
      useRandomBoard: this.useRandomBoard,
      controller: controller
    });
  },

  _onStart: function _onStart() {
    window.GBS_IS_RUNNING = true;
  },

  _onStop: function _onStop(_ref2) {
    var _this2 = this;

    var eventToFire = _ref2.detail;

    window.BUS.fire("execution-stop");
    window.GBS_IS_RUNNING = false;
    this.async(function () {
      _this2.fire(eventToFire);
    });
  },

  _onSpeedChange: function _onSpeedChange() {
    this.showToast(this.localize("speed-" + this.immediateSpeed));
  },

  toggleRandomCss: function toggleRandomCss(useRandomBoard) {
    return useRandomBoard ? "blue-sky" : "gray";
  }
});