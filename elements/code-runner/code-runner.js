"use strict";

Polymer({
  is: 'code-runner',
  behaviors: [Polymer.BusListenerBehavior, Polymer.LocalizationBehavior, Polymer.ToastBehavior],
  properties: {
    isRunning: {
      type: Boolean,
      value: false,
      observer: "_update"
    },
    speed: {
      type: Number,
      value: 4
    },
    useRandomBoard: {
      type: Boolean,
      value: false
    },

    throttle: {
      type: Number,
      computed: "_computeThrottle(speed)"
    },
    immediateSpeed: {
      type: Number,
      value: 4
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
    "immediate-value-change": "_onSpeedChange"
  },

  ready: function ready() {
    var _this = this;

    this.parser = new Parser();
    this.runner = new NormalRunner(this.parser);
    this.subscribeTo("reset", function () {
      return _this.reset();
    });
  },

  run: function run(request, onCompilationError, onResult) {
    var _this2 = this;

    this.isRunning = true;

    var code = request.code;
    var itBroke = function itBroke(err, code) {
      _this2.stop();
      onCompilationError(err, code);
    };

    try {
      this._checkAndGetTeacherAst(code, itBroke, function (teacherAst) {
        _this2._parse(code, itBroke, function (ast) {
          _this2._setRunner(ast);

          _this2.runner.run({
            ast: {
              program: ast.program,
              teacher: teacherAst
            },
            request: request,
            throttle: _this2.throttle,
            callbacks: {
              onResult: onResult,
              onStop: function onStop(eventToFire) {
                return _this2.stop(eventToFire);
              }
            }
          });
        }, true);
      });
    } catch (e) {
      this.stop();
      throw e;
    }
  },

  requestRun: function requestRun() {
    this._clear();
    this.fire("run", { useRandomBoard: this.useRandomBoard });
  },

  stop: function stop() {
    var _this3 = this;

    var eventToFire = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "cancel";

    window.BUS.fire("execution-stop");
    this._clear();
    this.isRunning = false;
    this.async(function () {
      _this3.fire(eventToFire);
    });
  },

  onButtonClick: function onButtonClick() {
    this.isRunning = !this.isRunning;
    if (this.isRunning) this.requestRun();else this.stop();
  },

  toggleRandom: function toggleRandom() {
    this.useRandomBoard = !this.useRandomBoard;
    this.showToast(this.localize("using-random-" + this.useRandomBoard));
  },

  reset: function reset() {
    this.speed = 4;
    this.useRandomBoard = false;

    this.set("permissions.can_change_source", true);
    this.set("permissions.can_change_speed", true);
  },

  reportTeacherLibraryErrors: function reportTeacherLibraryErrors(e) {
    alert("The teacher's library has errors. See the developer console.");
    throw e;
  },

  _setRunner: function _setRunner(ast) {
    this.runner = this._isInteractive(ast) ? new InteractiveRunner(this.parser) : new NormalRunner(this.parser);
  },

  _clear: function _clear() {
    this.runner.clear();
  },

  _checkAndGetTeacherAst: function _checkAndGetTeacherAst(code, onError, onSuccess) {
    var _this4 = this;

    this._checkLibraryCompiles(code.library, onError, function () {
      return _this4._checkLibraryCompiles(code.teacher, _this4.reportTeacherLibraryErrors, onSuccess);
    });
  },

  _checkLibraryCompiles: function _checkLibraryCompiles(sourceCode, onError, onSuccess) {
    this._parse({ library: sourceCode, main: "", teacher: "" }, onError, onSuccess);
  },

  _parse: function _parse(code, onError, onSuccess, fixMainErrorLines) {
    var _this5 = this;

    var sourceCode = code.library + "\n" + code.main + "\n" + code.teacher;

    this.parser.parse(sourceCode, function (e) {
      e.location = _this5.parser.getErrorLineAndMode(e, code, fixMainErrorLines);
      return onError(e, code);
    }, onSuccess);
  },

  _isInteractive: function _isInteractive(ast) {
    return ast && ast.program && ast.program.alias === "interactiveProgram";
  },

  _onSpeedChange: function _onSpeedChange() {
    this.showToast(this.localize("speed-" + this.immediateSpeed));
  },

  _computeThrottle: function _computeThrottle(speed) {
    return -(this.speed - 4) * 300;
  },

  _update: function _update() {
    this.$.playButton.icon = this.isRunning ? "av:stop" : "av:play-arrow";
    window.GBS_IS_RUNNING = this.isRunning;
  },

  toggleRandomCss: function toggleRandomCss(useRandomBoard) {
    return useRandomBoard ? "blue-sky" : "gray";
  }
});