"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectBlocksLoader = function (_ProjectLoader) {
  _inherits(ProjectBlocksLoader, _ProjectLoader);

  function ProjectBlocksLoader() {
    _classCallCheck(this, ProjectBlocksLoader);

    var _this = _possibleConstructorReturn(this, (ProjectBlocksLoader.__proto__ || Object.getPrototypeOf(ProjectBlocksLoader)).call(this));

    _this.EXTENSION = ".gbp";
    _this.loaders = [new TeacherLoader(), new LibraryBlocksLoader(), new CodeBlocksLoader(), new InitialBoardLoader()];
    return _this;
  }

  return ProjectBlocksLoader;
}(ProjectLoader);

;