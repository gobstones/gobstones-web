"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextLoader = function (_Loader) {
  _inherits(TextLoader, _Loader);

  function TextLoader() {
    _classCallCheck(this, TextLoader);

    return _possibleConstructorReturn(this, (TextLoader.__proto__ || Object.getPrototypeOf(TextLoader)).apply(this, arguments));
  }

  _createClass(TextLoader, [{
    key: "save",

    // <<abstract>>:
    // getFiles(context); -> [{ name, content }]
    // readContent(context, content, fileName);

    value: function save(context) {
      this._saveText(this.getFiles(context)[0]);
    }
  }, {
    key: "read",
    value: function read(context, event, callback) {
      var _this2 = this;

      this._readText(event, function (content, fileName) {
        if (!content || !fileName) return _this2._clean(event);

        _this2.readContent(context, content, fileName);
        callback();
      });
    }
  }, {
    key: "_saveText",
    value: function _saveText(_ref) {
      var content = _ref.content,
          name = _ref.name;

      this._saveBlob(new Blob([content], { type: "text/plain" }), name);
    }
  }, {
    key: "_readText",
    value: function _readText(event, callback) {
      var _readLocalFile = this._readLocalFile(event),
          file = _readLocalFile.file,
          fileName = _readLocalFile.fileName;

      var reader = new FileReader();
      reader.onload = function () {
        var content = reader.result;
        callback(content, fileName);
      };
      reader.readAsText(file);
    }
  }]);

  return TextLoader;
}(Loader);

;