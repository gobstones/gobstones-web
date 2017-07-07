"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndividualAttireLoader = function (_Loader) {
  _inherits(IndividualAttireLoader, _Loader);

  function IndividualAttireLoader() {
    _classCallCheck(this, IndividualAttireLoader);

    var _this = _possibleConstructorReturn(this, (IndividualAttireLoader.__proto__ || Object.getPrototypeOf(IndividualAttireLoader)).call(this));

    _this.reader = new AttireReader(function (relativePath) {
      return _.endsWith(relativePath, ".json");
    });
    return _this;
  }

  _createClass(IndividualAttireLoader, [{
    key: "save",
    value: function save(context) {
      var _this2 = this;

      var attire = context.boards.availableAttires[context.boards.selectedAttire];
      if (!attire) return;

      var zip = new JSZip();
      this.reader.writeToZip(attire, zip);

      zip.generateAsync({ type: "blob" }).then(function (content) {
        _this2._saveBlob(content, attire.name + ".zip");
      });
    }
  }, {
    key: "read",
    value: function read(context, event, callback) {
      var _this3 = this;

      var _readLocalFile = this._readLocalFile(event),
          file = _readLocalFile.file,
          fileName = _readLocalFile.fileName;

      JSZip.loadAsync(file).then(function (zip) {
        _this3.reader.readFromZip(context, zip, callback);
      });
    }
  }]);

  return IndividualAttireLoader;
}(Loader);

;