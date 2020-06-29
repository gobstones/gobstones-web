"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UrlLoader = function (_RemoteLoader) {
  _inherits(UrlLoader, _RemoteLoader);

  function UrlLoader(projectType, url) {
    _classCallCheck(this, UrlLoader);

    var _this = _possibleConstructorReturn(this, (UrlLoader.__proto__ || Object.getPrototypeOf(UrlLoader)).call(this));

    _this.loader = _this._getProjectLoader(projectType);

    _this.url = url;
    return _this;
  }

  _createClass(UrlLoader, [{
    key: "load",
    value: function load(getContext, callback) {
      var _this2 = this;

      return $.getBinary(this.url).then(function (content) {
        _this2.loader.readRawZip(getContext(), content, callback);
      });
    }
  }]);

  return UrlLoader;
}(RemoteLoader);

;