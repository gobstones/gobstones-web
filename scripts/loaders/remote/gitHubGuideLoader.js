"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.COURSE = function () {
  if (!window.GBS_COURSE) {
    window.GBS_COURSE = getParameterByName("course") || "";

    if (window.GBS_DESKTOP) {
      var lastCourse = window.STORAGE.getItem("lastCourse");

      if (!window.GBS_COURSE && lastCourse) window.GBS_COURSE = lastCourse;else window.STORAGE.setItem("lastCourse", window.GBS_COURSE);
    }
  }

  document.title = _.compact([_.last(window.GBS_COURSE.split("/")), _.last(document.title.split(" - "))]).join(" - ");

  return window.GBS_COURSE;
};

// eslint-disable-next-line no-unused-vars

var GitHubGuideLoader = function () {
  function GitHubGuideLoader(_ref) {
    var repo = _ref.repo,
        exercises = _ref.exercises;

    _classCallCheck(this, GitHubGuideLoader);

    this.repo = repo;
    this.exercises = exercises;
  }

  _createClass(GitHubGuideLoader, [{
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
    value: function _makeImageUrl(path) {
      return "https://raw.githubusercontent.com/" + this.repo + "/master/" + path + "/cover.png";
    }
  }], [{
    key: "all",
    value: function all() {
      if (!COURSE()) return $.Deferred().reject().promise();

      var guides = $.getJSON("https://raw.githubusercontent.com/" + COURSE() + "/master/guides.json");

      var loader = new GitHubLoader(window.GBS_PROJECT_TYPE, COURSE());
      var assets = loader.hasAssets().then(function (result) {
        return result ? loader.loadDir("assets") : {};
      }).then(function (assets) {
        if (Object.keys(assets).length) {
          window.GBS_COURSE_ASSETS = assets;
        }
      }).catch(function () {});

      return $.when.apply($, [guides, assets]).then(function () {
        return guides;
      });
    }
  }, {
    key: "makeUrlFor",
    value: function makeUrlFor(guide, exercise) {
      return "/" + window.GBS_PROJECT_TYPE + "?course=" + COURSE() + "&github=" + guide.repo + "&path=" + exercise.path;
    }
  }]);

  return GitHubGuideLoader;
}();

;