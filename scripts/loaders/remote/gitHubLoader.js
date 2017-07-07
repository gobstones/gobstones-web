"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GitHubLoader = function () {
  function GitHubLoader(projectType) {
    _classCallCheck(this, GitHubLoader);

    this.loader = projectType === "code" ? new ProjectLoader() : new ProjectBlocksLoader();

    this.CLIENT_ID = "086085200026d5c54c19";
    this.CLIENT_SECRET = "f40981be76b00e35d4437d71184f42a70d08f3a6";
  }

  _createClass(GitHubLoader, [{
    key: "load",
    value: function load(slug, getContext, callback) {
      var _this = this;

      var _slug$split = slug.split("/"),
          _slug$split2 = _slicedToArray(_slug$split, 2),
          username = _slug$split2[0],
          repoName = _slug$split2[1];

      return this._loadDir(username, repoName).then(function (files) {
        _this.loader.readRaw(getContext(), _this._createZip(files), callback);
      });
    }
  }, {
    key: "_loadDir",
    value: function _loadDir(username, repoName) {
      var _this2 = this;

      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "/";

      return $.get("https://api.github.com/repos/" + username + "/" + repoName + "/contents" + path + "?client_id=" + this.CLIENT_ID + "&client_secret=" + this.CLIENT_SECRET).then(function (entries) {
        var $files = entries.map(function (it) {
          return _this2._loadEntry(it, username, repoName, path);
        });

        return $.when.apply($, $files).then(function () {
          return _(arguments).toArray().flatten().value();
        });
      });
    }
  }, {
    key: "_loadEntry",
    value: function _loadEntry(entry, username, repoName, path) {
      return entry.type === "dir" ? this._loadDir(username, repoName, path + "/" + entry.name) : this._downloadFile(entry.download_url, entry.path);
    }
  }, {
    key: "_downloadFile",
    value: function _downloadFile(url, relativePath) {
      return $.getBinary(url).then(function (content) {
        return { relativePath: relativePath, content: content };
      });
    }
  }, {
    key: "_createZip",
    value: function _createZip(files) {
      var _this3 = this;

      var entries = files.map(function (it) {
        return _this3._createZipEntry(it);
      });
      var zip = _.clone(entries);
      zip.forEach = function (fn) {
        entries.forEach(function (entry) {
          fn(entry.relativePath, entry);
        });
      };
      zip.files = _.keyBy(entries, "relativePath");

      return zip;
    }
  }, {
    key: "_createZipEntry",
    value: function _createZipEntry(file) {
      var _this4 = this;

      return {
        async: function async(encoding) {
          var deferred = new $.Deferred();
          _this4._readBinary(file.content, encoding, deferred.resolve, deferred.reject);
          return deferred.promise();
        },
        relativePath: file.relativePath
      };
    }
  }, {
    key: "_readBinary",
    value: function _readBinary(arrayBuffer, encoding, onSuccess, onFail) {
      var buffers = [arrayBuffer];

      var reader = new FileReader();
      reader.onload = function (event) {
        onSuccess(event.target.result);
      };
      reader.onerror = function (event) {
        onFail(event.target.error);
      };

      if (encoding === "string") reader.readAsText(new Blob(buffers));else reader.readAsBinaryString(new Blob(buffers, { type: 'application/octet-stream' }));
    }
  }]);

  return GitHubLoader;
}();

;