"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProjectAttireLoader = function () {
  function ProjectAttireLoader() {
    var _this = this;

    var pathPrefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "assets/attires/";

    _classCallCheck(this, ProjectAttireLoader);

    this.FILENAME = "config.yml";

    this.reader = new AttireReader(function (relativePath) {
      return _.includes(relativePath, "/") && _.endsWith(relativePath, "/" + _this.FILENAME);
    });
    this.pathPrefix = pathPrefix;
  }

  _createClass(ProjectAttireLoader, [{
    key: "writeToZip",
    value: function writeToZip(context, zip) {
      var _this2 = this;

      var attires = context.boards.availableAttires;
      attires.forEach(function (attire) {
        _this2.reader.writeToZip(attire, zip, "" + _this2.pathPrefix + attire.name + "/");
      });
    }
  }, {
    key: "readFromZip",
    value: function readFromZip(context, zip, callback) {
      this.reader.readFromZip(context, zip, callback);
    }
  }]);

  return ProjectAttireLoader;
}();

;