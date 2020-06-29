"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MetadataTeacherLoader = function (_MetadataLoader) {
  _inherits(MetadataTeacherLoader, _MetadataLoader);

  function MetadataTeacherLoader() {
    _classCallCheck(this, MetadataTeacherLoader);

    return _possibleConstructorReturn(this, (MetadataTeacherLoader.__proto__ || Object.getPrototypeOf(MetadataTeacherLoader)).apply(this, arguments));
  }

  _createClass(MetadataTeacherLoader, [{
    key: "buildContent",
    value: function buildContent(context) {
      var partialMetadata = context.editor.getMetadata();

      return this.buildFullOptions(context, partialMetadata);
    }
  }, {
    key: "readContent",
    value: function readContent(context, content, fileName) {
      var metadata = this.readCoreOptions(context, content);

      context.editor.setMetadata(metadata);
    }
  }]);

  return MetadataTeacherLoader;
}(MetadataLoader);

;