"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InteractiveRunner = function () {
  function InteractiveRunner(parser) {
    _classCallCheck(this, InteractiveRunner);

    this.parser = parser;
    this.adapter = new KeyCodeAdapter();
    this.keys = [];
  }

  _createClass(InteractiveRunner, [{
    key: "run",
    value: function run(_ref) {
      var _this = this;

      var ast = _ref.ast,
          request = _ref.request,
          throttle = _ref.throttle,
          _ref$callbacks = _ref.callbacks,
          onResult = _ref$callbacks.onResult,
          onStop = _ref$callbacks.onStop;

      var controller = this._interpret(ast, request, request);

      window.BUS.fire("interactive-run");

      var render = function render(result) {
        if (!result.error) {
          onResult(result.board());
        } else {
          onResult(_this._handleError(result, request.code));
          onStop("end");
        }
      };

      var renderTimeout = function renderTimeout() {
        return render(controller.onTimeout());
      };

      var configureTimeout = function configureTimeout() {
        clearInterval(_this.timeout);
        if (controller.timeout) _this.timeout = setInterval(renderTimeout, controller.timeout);
      };

      render(controller.onInit());

      var boundKeys = controller.keys;
      boundKeys.forEach(function (it) {
        var newKey = _this.adapter.adapt(it);
        _this.keys.push(newKey);

        key(newKey, function () {
          configureTimeout();
          var result = controller.onKey(it);
          render(result);
          return false;
        });
      });

      configureTimeout();
    }
  }, {
    key: "clear",
    value: function clear() {
      this.keys.forEach(function (it) {
        return key.unbind(it);
      });
      this.keys = [];

      clearInterval(this.timeout);
    }
  }, {
    key: "_interpret",
    value: function _interpret(_ref2, _ref3) {
      var program = _ref2.program;
      var initialState = _ref3.initialState,
          code = _ref3.code;

      return this.parser.interpret(program, initialState);
    }
  }, {
    key: "_handleError",
    value: function _handleError(e, code) {
      e.error.location = this.parser.getErrorLineAndMode(e.error, code);
      return e;
    }
  }]);

  return InteractiveRunner;
}();

;