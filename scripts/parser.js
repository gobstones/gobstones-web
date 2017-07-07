"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parser = function () {
  function Parser() {
    _classCallCheck(this, Parser);

    var _window$gsWeblangCore = window.gsWeblangCore,
        Context = _window$gsWeblangCore.Context,
        Board = _window$gsWeblangCore.Board,
        getParser = _window$gsWeblangCore.getParser,
        gbb = _window$gsWeblangCore.gbb;


    this.Context = Context;
    this.gsParser = getParser;
    this.gbb = gbb;
    this.Board = Board;
  }

  _createClass(Parser, [{
    key: "parse",
    value: function parse(sourceCode) {
      var onError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var onSuccess = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (it) {
        return it;
      };

      if (_.trim(sourceCode) === "") return onSuccess({ declarations: [] });

      try {
        return onSuccess(this.gsParser().parse(sourceCode));
      } catch (e) {
        if (e.reason) {
          onError(e); // known errors
        } else throw e; // unknown errors
      }
    }
  }, {
    key: "interpret",
    value: function interpret(ast, initialState) {
      var context = this._createContext(initialState);
      return ast.interpret(context);
    }
  }, {
    key: "readGbb",
    value: function readGbb(gbb) {
      return this.gbb.reader.fromString(gbb);
    }
  }, {
    key: "buildGbb",
    value: function buildGbb(initialState, size) {
      var board = new this.Board(size.x, size.y).fromView(initialState.table);
      board.x = initialState.header.x;
      board.y = initialState.header.y;
      return this.gbb.builder.build(board);
    }
  }, {
    key: "getErrorLineAndMode",
    value: function getErrorLineAndMode(e, code, forceIsInMainCode) {
      var libraryLines = code.library.split("\n").length - 1;

      try {
        var isInMainCode = forceIsInMainCode || e.on.range.start.row > libraryLines;

        return {
          line: e.on.range.start.row - (isInMainCode ? libraryLines : 0),
          mode: isInMainCode ? "main" : "library"
        };
      } catch (unknownError) {
        throw e;
      }
    }
  }, {
    key: "_createContext",
    value: function _createContext(initialState) {
      var context = new this.Context();
      context.board().sizeX = initialState.size.x;
      context.board().sizeY = initialState.size.y;
      context.init();

      _.assign(context.board(), {
        x: initialState.header.x,
        y: initialState.header.y,
        table: initialState.table
      });

      return context;
    }
  }]);

  return Parser;
}();

;