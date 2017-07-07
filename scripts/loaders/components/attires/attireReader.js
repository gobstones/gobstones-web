"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var toBinary = function toBinary(base64) {
  var raw = atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  var i;
  for (i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }

  return array;
};

var AttireReader = function () {
  function AttireReader(isAnAttire) {
    _classCallCheck(this, AttireReader);

    this.FILE_EXTENSION = ".json";
    this.BASE64_PREFIX = "data:image/png;base64,";
    this.isAnAttire = isAnAttire;
  }

  _createClass(AttireReader, [{
    key: "writeToZip",
    value: function writeToZip(attire, zip) {
      var _this = this;

      var pathPrefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

      zip.file(pathPrefix + attire.name + this.FILE_EXTENSION, this._serialize(attire));

      attire.rules.forEach(function (rule) {
        var imageBase64 = rule.image.replace(_this.BASE64_PREFIX, "");
        var pngContent = toBinary(imageBase64);
        zip.file(pathPrefix + rule.fileName, pngContent);
      });
    }
  }, {
    key: "readFromZip",
    value: function readFromZip(context, zip, callback) {
      var _this2 = this;

      var actions = ZipUtils.readAlphabetically(zip).filter(function (aFile) {
        return _this2.isAnAttire(aFile.relativePath);
      }).map(function (aFile) {
        var directory = aFile.relativePath.getPath();
        return _this2._processAttire.bind(_this2, context, aFile.zipEntry, zip, directory);
      });

      async.series(actions, callback);
    }
  }, {
    key: "_processAttire",
    value: function _processAttire(context, zipEntry, zip, pathPrefix, callback) {
      var _this3 = this;

      var findImage = function findImage(path) {
        var imageZipEntry = zip.files[pathPrefix + path];
        if (!imageZipEntry) throw new Error("Missing file in attire: " + path);
        return imageZipEntry;
      };

      zipEntry.async("string").then(function (json) {
        var attire = _this3._deserialize(json);
        if (!attire || !attire.name || !attire.rules) return;

        attire.rules.forEach(function (rule) {
          rule.fileName = rule.image;

          findImage(rule.fileName).async("binarystring").then(function (content) {
            var imageBase64 = btoa(content);
            rule.image = _this3.BASE64_PREFIX + imageBase64;
            rule.loaded = true;

            var everyRuleIsLoaded = _.every(attire.rules, { loaded: true });
            if (everyRuleIsLoaded) {
              _this3._setAttire(context, attire);
              callback();
            }
          });
        });
      });
    }
  }, {
    key: "_setAttire",
    value: function _setAttire(context, attire) {
      if (attire && attire.name && attire.rules) context.boards.addOrSetAttire(attire);
    }
  }, {
    key: "_serialize",
    value: function _serialize(attire) {
      return JSON.stringify(this._transform(attire), null, 2);
    }
  }, {
    key: "_deserialize",
    value: function _deserialize(json) {
      return JSON.parse(json);
    }
  }, {
    key: "_transform",
    value: function _transform(attire) {
      var copy = _.cloneDeep(attire);
      copy.rules.forEach(function (rule) {
        rule.image = rule.fileName;
        delete rule.fileName;
        delete rule.loaded;
      });
      return _.omit(copy, ["enabled"]);
    }
  }]);

  return AttireReader;
}();

;