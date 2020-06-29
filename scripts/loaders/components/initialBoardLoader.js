"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InitialBoardLoader = function (_TextLoader) {
  _inherits(InitialBoardLoader, _TextLoader);

  function InitialBoardLoader() {
    _classCallCheck(this, InitialBoardLoader);

    var _this = _possibleConstructorReturn(this, (InitialBoardLoader.__proto__ || Object.getPrototypeOf(InitialBoardLoader)).call(this));

    _this.SUFFIX = ".gbb";
    return _this;
  }

  _createClass(InitialBoardLoader, [{
    key: "getFiles",
    value: function getFiles(context) {
      var _this2 = this;

      var panel = context.boards;
      var files = panel.availableInitialStates.map(function (initialBoard, i) {
        return {
          name: "assets/boards/Board" + (i + 1) + _this2.SUFFIX,
          content: new Parser().buildGbb(initialBoard, panel.getSizeOf(initialBoard))
        };
      });

      return files.splice(panel.selectedInitialState, 1).concat(files);
    }
  }, {
    key: "readContent",
    value: function readContent(context, content) {
      var panel = context.boards;
      var board = new Parser().readGbb(content);
      var initialState = panel.initialState;

      panel.addInitialState({
        header: { x: board.head.x, y: board.head.y },
        table: board.table
      });
    }
  }, {
    key: "readProjectContent",
    value: function readProjectContent(context, content) {
      this.readContent(context, content);
    }
  }, {
    key: "shouldHandle",
    value: function shouldHandle(path) {
      return _.endsWith(path, this.SUFFIX);
    }
  }]);

  return InitialBoardLoader;
}(TextLoader);

;