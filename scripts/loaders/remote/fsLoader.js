"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function toArrayBuffer(buf) {
  var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}

var FsLoader = function (_ExpandedLoader) {
  _inherits(FsLoader, _ExpandedLoader);

  function FsLoader(projectType, path) {
    _classCallCheck(this, FsLoader);

    var _this = _possibleConstructorReturn(this, (FsLoader.__proto__ || Object.getPrototypeOf(FsLoader)).call(this));

    _this.loader = _this._getProjectLoader(projectType);

    _this.path = path;
    return _this;
  }

  _createClass(FsLoader, [{
    key: "load",
    value: function load(getContext, callback) {
      var deferred = $.Deferred();

      try {
        var files = this.loadDir(this.path);
        this.loader.readRaw(getContext(), this.createZip(files), callback);
        deferred.resolve();
      } catch (e) {
        deferred.reject(e);
      }

      return deferred.promise();
    }
  }, {
    key: "loadDir",
    value: function loadDir(path) {
      var _this2 = this;

      return window.GBS_REQUIRE("recursive-readdir-sync")(path).map(function (it) {
        return {
          relativePath: it.replace(/\\/g, "/").replace(_this2.path.replace(/\\/g, "/"), "").substring(1),
          content: toArrayBuffer(window.GBS_REQUIRE("fs").readFileSync(it))
        };
      });
    }
  }]);

  return FsLoader;
}(ExpandedLoader);

;