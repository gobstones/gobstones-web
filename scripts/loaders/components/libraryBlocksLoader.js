"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LibraryBlocksLoader = function (_LibraryLoader) {
  _inherits(LibraryBlocksLoader, _LibraryLoader);

  function LibraryBlocksLoader() {
    _classCallCheck(this, LibraryBlocksLoader);

    var _this = _possibleConstructorReturn(this, (LibraryBlocksLoader.__proto__ || Object.getPrototypeOf(LibraryBlocksLoader)).call(this));

    _this.FILENAME = "backpack.gbk";
    return _this;
  }

  _createClass(LibraryBlocksLoader, [{
    key: "buildContent",
    value: function buildContent(context) {
      return context.editor.workspace.library;
    }
  }]);

  return LibraryBlocksLoader;
}(LibraryLoader);

;