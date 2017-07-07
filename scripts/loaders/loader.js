"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loader = function () {
  function Loader() {
    _classCallCheck(this, Loader);
  }

  _createClass(Loader, [{
    key: "_setCode",

    // <<abstract>>:
    // save(context);
    // read(context, event, callback);

    value: function _setCode(context, code, mode) {
      context.editor.setCode(code, mode);
    }
  }, {
    key: "_runCode",
    value: function _runCode(context) {
      context.editor.onRunCode();
    }
  }, {
    key: "_setAndRunCode",
    value: function _setAndRunCode(context, code, mode) {
      this._setCode(context, code, mode);
      this._runCode();
    }
  }, {
    key: "_readLocalFile",
    value: function _readLocalFile(event) {
      var file = _.first(event.target.files);
      var fileName = _.first(file.name.split("."));

      this._clean(event);
      return { file: file, fileName: fileName };
    }
  }, {
    key: "_saveBlob",
    value: function _saveBlob(content, name) {
      var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      saveAs(blob, name);
    }
  }, {
    key: "_clean",
    value: function _clean(event) {
      event.target.value = null;
    }
  }]);

  return Loader;
}();

;