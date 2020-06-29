"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GITHUB_CLIENT_ID = "086085200026d5c54c19";
var GITHUB_CLIENT_SECRET = "f40981be76b00e35d4437d71184f42a70d08f3a6";

var GitHubLoader = function (_ExpandedLoader) {
  _inherits(GitHubLoader, _ExpandedLoader);

  function GitHubLoader(projectType, slug, initialPath) {
    _classCallCheck(this, GitHubLoader);

    var _this = _possibleConstructorReturn(this, (GitHubLoader.__proto__ || Object.getPrototypeOf(GitHubLoader)).call(this));

    _this.loader = _this._getProjectLoader(projectType);

    _this.slug = slug;
    _this.initialPath = initialPath;
    return _this;
  }

  _createClass(GitHubLoader, [{
    key: "load",
    value: function load(getContext, callback) {
      var _this2 = this;

      return this.loadDir(this.initialPath).then(function (files) {
        if (_this2.initialPath !== undefined) files.forEach(function (it) {
          return it.relativePath = it.relativePath.replaceAll(_this2.initialPath + "/", "");
        });

        _this2.loader.readRaw(getContext(), _this2.createZip(files), callback);
      });
    }
  }, {
    key: "loadDir",
    value: function loadDir() {
      var _this3 = this;

      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

      return this.scanDir(path).then(function (entries) {
        var $files = entries.map(function (it) {
          return _this3._loadEntry(it, path);
        });

        return $.when.apply($, $files).then(function () {
          return _(arguments).toArray().flatten().value();
        });
      });
    }
  }, {
    key: "scanDir",
    value: function scanDir() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.initialPath || "";

      var _slug$split = this.slug.split("/"),
          _slug$split2 = _slicedToArray(_slug$split, 2),
          username = _slug$split2[0],
          repoName = _slug$split2[1];

      return $.get("https://api.github.com/repos/" + username + "/" + repoName + "/contents/" + path + "?client_id=" + GITHUB_CLIENT_ID + "&client_secret=" + GITHUB_CLIENT_SECRET);
    }
  }, {
    key: "_loadEntry",
    value: function _loadEntry(entry, path) {
      return entry.type === "dir" ? this.loadDir(path + "/" + entry.name) : this._downloadFile(entry.download_url, entry.path);
    }
  }, {
    key: "_downloadFile",
    value: function _downloadFile(url, relativePath) {
      return $.getBinary(url).then(function (content) {
        return { relativePath: relativePath, content: content };
      });
    }
  }], [{
    key: "reportIssue",
    value: function reportIssue(title, body) {
      return $.ajax({
        type: "POST",
        url: "https://api.github.com/repos/gobstones/gobstones-issues/issues",
        data: JSON.stringify({ title: title, body: body }),
        dataType: "json",
        headers: {
          "Authorization": "token " + atob("M2ZiMGJkNWM0YzVjZGJkY2FlMTIwOTgzNmRjNTI5M2EwYTdmZGU2Yw==")
        }
      });
    }
  }, {
    key: "getDesktopRelease",
    value: function getDesktopRelease() {
      return $.get("https://api.github.com/repos/gobstones/gobstones-web-desktop/releases/latest?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}");
    }
  }]);

  return GitHubLoader;
}(ExpandedLoader);

;