"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FinalBoardLoader = function (_TextLoader) {
  _inherits(FinalBoardLoader, _TextLoader);

  function FinalBoardLoader() {
    _classCallCheck(this, FinalBoardLoader);

    var _this = _possibleConstructorReturn(this, (FinalBoardLoader.__proto__ || Object.getPrototypeOf(FinalBoardLoader)).call(this));

    _.defaults(_this, SingleFileComponent);
    _this.FILENAME = "FinalBoard.gbb";
    return _this;
  }

  _createClass(FinalBoardLoader, [{
    key: "buildContent",
    value: function buildContent(context) {
      var panel = context.boards;
      if (!panel.finalState) return null;
      return new Parser().buildGbb(panel.finalState, panel.size);
    }
  }, {
    key: "readContent",
    value: function readContent(context, content) {
      throw new Error("This method should not be called (write-only loader)");
    }
  }]);

  return FinalBoardLoader;
}(TextLoader);

;