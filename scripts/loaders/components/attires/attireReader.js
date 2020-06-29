"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AttireReader = function () {
  function AttireReader(isAnAttire) {
    _classCallCheck(this, AttireReader);

    this.FILENAME = "config.yml";
    this.BASE64_PREFIX = "data:image/png;base64,";
    this.isAnAttire = isAnAttire;
  }

  _createClass(AttireReader, [{
    key: "writeToZip",
    value: function writeToZip(attire, zip) {
      var _this = this;

      var pathPrefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

      zip.file(pathPrefix + this.FILENAME, this._serialize(attire));

      attire.rules.forEach(function (rule) {
        if (rule.image) {
          var imageBase64 = rule.image.replace(_this.BASE64_PREFIX, "");
          var pngContent = toBinary(imageBase64);
          zip.file(pathPrefix + rule.fileName, pngContent);
        }
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
        if (!imageZipEntry) callback("Missing file in attire: " + path);
        return imageZipEntry;
      };

      zipEntry.async("string").then(function (json) {
        var attire = _this3._deserialize(json);
        if (!attire || !attire.name || !attire.rules) return;

        var checkCompletion = function checkCompletion() {
          var everyRuleIsLoaded = _.every(attire.rules, { loaded: true });
          if (everyRuleIsLoaded) {
            _this3._setAttire(context, attire);
            callback();
          }
        };

        attire.rules.forEach(function (rule) {
          if (!rule.image && rule.text) {
            rule.loaded = true;
            checkCompletion();
            return;
          }

          rule.fileName = rule.image;

          findImage(rule.fileName).async("binarystring").then(function (content) {
            var imageBase64 = btoa(content);
            rule.image = _this3.BASE64_PREFIX + imageBase64;
            rule.loaded = true;

            checkCompletion();
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
      return jsyaml.safeDump(this._transform(attire));
    }
  }, {
    key: "_deserialize",
    value: function _deserialize(attire) {
      return jsyaml.safeLoad(attire);
    }
  }, {
    key: "_transform",
    value: function _transform(attire) {
      var copy = _.cloneDeep(attire);
      copy.rules.forEach(function (rule) {
        rule.image = rule.fileName || null;
        delete rule.fileName;
        delete rule.loaded;
      });
      return _.omit(copy, ["enabled"]);
    }
  }]);

  return AttireReader;
}();

;