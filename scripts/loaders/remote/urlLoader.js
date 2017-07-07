"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UrlLoader = function () {
  function UrlLoader(projectType) {
    _classCallCheck(this, UrlLoader);

    this.loader = projectType === "code" ? new ProjectLoader() : new ProjectBlocksLoader();
  }

  _createClass(UrlLoader, [{
    key: "load",
    value: function load(url, getContext, callback) {
      var _this = this;

      return $.getBinary(url).then(function (content) {
        _this.loader.readRawZip(getContext(), content, callback);
      });
    }
  }]);

  return UrlLoader;
}();

;