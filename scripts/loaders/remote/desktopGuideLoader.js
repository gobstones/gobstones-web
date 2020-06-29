"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ZIP_NAME = "guides.zip";

var PATH = function PATH() {
  var courses = window.STORAGE.getItem("courses") || [];
  var course = _.find(courses, { course: COURSE() });
  if (!course) return null;

  return course.path;
};

var DesktopGuideLoader = function () {
  function DesktopGuideLoader(_ref) {
    var exercises = _ref.exercises;

    _classCallCheck(this, DesktopGuideLoader);

    this.exercises = exercises;
  }

  _createClass(DesktopGuideLoader, [{
    key: "getExercises",
    value: function getExercises() {
      var _this = this;

      return promisify(this.exercises.map(function (exercise) {
        return _.assign(exercise, {
          imageUrl: _this._makeImageUrl(exercise.path)
        });
      }));
    }
  }, {
    key: "_makeImageUrl",
    value: function _makeImageUrl(exercisePath) {
      try {
        var path = PATH() + "/" + exercisePath;

        var bitmap = window.GBS_REQUIRE("fs").readFileSync(path + "/cover.png");
        var base64 = new Buffer(bitmap).toString("base64");
        return "data:image/png;base64," + base64;
      } catch (e) {
        console.warn(e);
        return null;
      }
    }
  }], [{
    key: "hasCourse",
    value: function hasCourse(path) {
      var fs = window.GBS_REQUIRE("fs");
      return fs.existsSync(path + "/guides.json");
    }
  }, {
    key: "download",
    value: function download(courseSlug, onProgress, path) {
      var zipPath = path + "/" + ZIP_NAME;
      var repoName = _.last(courseSlug.split("/"));
      var url = "https://github.com/" + courseSlug + "/archive/master.zip";

      var contentPath = path + "/" + repoName + "-master";
      var finalPath = path + "/" + repoName;
      var fs = window.GBS_REQUIRE("fs");
      var unzipper = new (window.GBS_REQUIRE("decompress-zip"))(zipPath);
      var rimraf = window.GBS_REQUIRE("rimraf");
      window.GBS_REQUIRE("setimmediate");

      var deferred = new $.Deferred();
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "arraybuffer";
      xhr.onload = function () {
        if (this.status === 200) deferred.resolve(xhr.response);else deferred.reject({ status: this.status });
      };
      xhr.onprogress = function (e) {
        //if (e.lengthComputable) onProgress(e.loaded, e.total);
        onProgress(e.loaded);
      };
      xhr.send();

      return deferred.promise().then(function (file) {
        fs.writeFileSync(zipPath, new Buffer(file));

        try {
          rimraf.sync(contentPath);
        } catch (e) {}
        try {
          rimraf.sync(finalPath);
        } catch (e) {}

        var deferred = new $.Deferred();
        unzipper.on("error", function (err) {
          deferred.reject(err);
        });

        unzipper.on("extract", function () {
          deferred.resolve();
        });

        unzipper.extract({
          path: path
        });

        return deferred.promise();
      }).then(function (r) {
        fs.unlinkSync(zipPath);
        fs.renameSync(contentPath, finalPath);
        return finalPath;
      }).catch(function (e) {
        console.error("DOWNLOAD ERROR", e);
        throw e;
      });
    }
  }, {
    key: "all",
    value: function all() {
      try {
        var path = PATH();
        if (!path) return promisify([]);

        var jsonPath = path + "/guides.json";
        var json = window.GBS_REQUIRE("fs").readFileSync(jsonPath);
        var guides = JSON.parse(json);

        try {
          window.GBS_COURSE_ASSETS = new FsLoader(window.GBS_PROJECT_TYPE, path).loadDir(path + "/assets");
        } catch (e) {
          console.warn(e);
        }

        return promisify(guides);
      } catch (e) {
        console.warn(e);
        return promisify([]);
      }
    }
  }, {
    key: "makeUrlFor",
    value: function makeUrlFor(guide, exercise) {
      var path = PATH() + "/" + exercise.path;
      return "/" + window.GBS_PROJECT_TYPE + "?fs=" + path;
    }
  }]);

  return DesktopGuideLoader;
}();

;