"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ZipUtils = function () {
  function ZipUtils() {
    _classCallCheck(this, ZipUtils);
  }

  _createClass(ZipUtils, null, [{
    key: "readAlphabetically",
    value: function readAlphabetically(zip) {
      var files = [];
      zip.forEach(function (relativePath, zipEntry) {
        files.push({ relativePath: relativePath, zipEntry: zipEntry });
      });

      var priorityFiles = function priorityFiles(file) {
        return !(_.endsWith(file.relativePath, ".gbt") || _.endsWith(file.relativePath, ".gbl"));
      };

      return _.sortBy(files, [priorityFiles, "relativePath"]);
    }
  }]);

  return ZipUtils;
}();

;