"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NormalRunner = function () {
  function NormalRunner(parser) {
    _classCallCheck(this, NormalRunner);

    this.parser = parser;
    this.handles = [];
  }

  _createClass(NormalRunner, [{
    key: "run",
    value: function run(_ref) {
      var ast = _ref.ast,
          request = _ref.request,
          throttle = _ref.throttle,
          callbacks = _ref.callbacks;

      var states = this._interpret(ast, request);
      this._runWithThrottle(states, throttle, callbacks);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.handles.forEach(clearInterval);
      this.handles = [];
    }
  }, {
    key: "_runWithThrottle",
    value: function _runWithThrottle(states, throttle, _ref2) {
      var onResult = _ref2.onResult,
          onStop = _ref2.onStop;

      if (throttle === 0) {
        onResult(_.last(states));
        return onStop("end");
      }

      this.handles = states.map(function (state, i) {
        return setTimeout(function () {
          onResult(state);
          if (i === states.length - 1) onStop("end");
        }, i * throttle);
      });
    }
  }, {
    key: "_interpret",
    value: function _interpret(ast, _ref3) {
      var initialState = _ref3.initialState,
          code = _ref3.code;

      try {
        var context = this.parser.interpret(ast.program, initialState);
        return this._getStates(context, ast.teacher, context.board());
      } catch (e) {
        e.location = this.parser.getErrorLineAndMode(e, code);
        return this._getStates(e.context, ast.teacher, { error: e });
      }
    }
  }, {
    key: "_getStates",
    value: function _getStates(context, teacherAst, lastState) {
      var teacherTools = teacherAst.declarations.filter(function (it) {
        return _.includes(["procedureDeclaration", "functionDeclaration"], it.alias);
      }).map(function (it) {
        return it.name;
      });

      var previousContext = "program";
      return context.board().snapshots.filter(function (snapshot) {
        var toName = function toName(it) {
          return it.split("-")[0];
        };
        var prevNames = _.take(snapshot.names, snapshot.names.length - 1).map(toName);
        var lastName = _.last(snapshot.names);
        var contextName = toName(lastName);

        var hasToIgnoreIt = _.includes(teacherTools, contextName);
        var isTheFirstOcurrence = previousContext !== lastName;
        var isCallFromIgnoredFunction = _.some(prevNames, function (name) {
          return _.includes(teacherTools, name);
        });

        previousContext = lastName;
        return (!hasToIgnoreIt || isTheFirstOcurrence) && !isCallFromIgnoredFunction;
      }).map(function (snapshot) {
        return snapshot.board;
      }).concat(lastState);
    }
  }]);

  return NormalRunner;
}();

;