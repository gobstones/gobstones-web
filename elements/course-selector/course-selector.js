"use strict";

Polymer({
  is: 'course-selector',
  behaviors: [Polymer.LocalizationBehavior],
  properties: {
    slug: String,
    availableCourses: []
  },

  ready: function ready() {
    this.COURSES_URL = "https://raw.githubusercontent.com/wiki/gobstones/gobstones-web/Courses.md";

    this.slug = window.COURSE();
    this._loadCourses();
  },

  goToCourse: function goToCourse() {
    if (_.isEmpty(this.slug)) return;

    this.goTo(this.slug);
  },

  downloadCourse: function downloadCourse() {
    if (_.isEmpty(this.slug)) return;

    this.requestDownload({ course: this.slug });
  },

  importCourse: function importCourse() {
    if (_.isEmpty(this.slug)) return;

    var dialog = window.GBS_REQUIRE("electron").remote.dialog;
    var fs = window.GBS_REQUIRE("fs");

    var paths = dialog.showOpenDialog({
      title: this.localize("download-course-select-path"),
      buttonLabel: this.localize("download-course-import"),
      properties: ["openDirectory"]
    });

    if (!paths || !paths[0]) return;
    var path = paths[0];

    if (!DesktopGuideLoader.hasCourse(path)) {
      alert(this.localize("download-course-folder-empty"));
      return;
    }

    this._addCourse({
      name: this.slug,
      course: this.slug,
      path: path
    });
  },

  onGoToClick: function onGoToClick(event) {
    this.goTo(event.model.item.course);
  },

  onDownloadCourse: function onDownloadCourse(event) {
    this.requestDownload(event.model.item, true);
  },

  onDeleteCourse: function onDeleteCourse(event) {
    var course = event.model.item;
    if (course.course === window.STORAGE.getItem("lastCourse")) window.STORAGE.setItem("lastCourse", null);
    this._saveCourses(this.availableCourses.filter(function (it) {
      return it !== course;
    }));
  },

  goTo: function goTo(slug) {
    window.STORAGE.setItem("selected-guide", 0);
    cleanQueryString();
    document.querySelector("app-router").go("/" + window.GBS_PROJECT_TYPE + "?course=" + slug);
    location.reload();
  },

  requestDownload: function requestDownload(course) {
    var isRefreshing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var slug = course.course;
    var dialog = window.GBS_REQUIRE("electron").remote.dialog;
    var fs = window.GBS_REQUIRE("fs");

    var path = void 0;
    if (isRefreshing) {
      path = course.path;
    } else {
      var paths = dialog.showOpenDialog({
        title: this.localize("download-course-path"),
        buttonLabel: this.localize("download-course-save"),
        properties: ["openDirectory"],
        defaultPath: course.path
      });

      if (!paths || !paths[0]) return;
      path = paths[0];

      this._addCourse({
        name: slug,
        course: slug
      });
    }

    this._download(this._getCourse(slug), path, isRefreshing);
  },

  isDesktop: function isDesktop() {
    return window.GBS_DESKTOP;
  },

  _download: function _download(course, path, isRefreshing) {
    var _this = this;

    var bytes = window.GBS_REQUIRE("bytes");

    course.isDownloading = true;
    course.downloadProgress = "...";

    var courseSlug = course.course;
    this._updateGlobalDownloadState();

    if (isRefreshing) {
      if (DesktopGuideLoader.hasCourse(path)) {
        var RIMRAF = window.GBS_REQUIRE("rimraf");
        var PATH = window.GBS_REQUIRE("path");

        course.downloadProgress = 0;
        RIMRAF.sync(path);
        path = path.replace(PATH.basename(path), "");
        if (path[path.length - 1] === "/") path = path.substring(0, path.length - 1);
      } else {
        alert(this.localize("download-course-folder-broken"));
        return;
      }
    }

    DesktopGuideLoader.download(courseSlug, function (loaded, total) {
      _this._changeCourse(course, function (it) {
        return it.downloadProgress = bytes(loaded);
      });
    }, path).then(function (finalPath) {
      _this._changeCourse(course, function (it) {
        it.path = finalPath;
        it.isDownloading = false;
      });
      _this._saveCourses();
      _this._updateGlobalDownloadState(true);
    }).catch(function (e) {
      _this._changeCourse(course, function (it) {
        it.isDownloading = false;
      });
      _this._updateGlobalDownloadState();
      alert(_this.localize("download-course-error"));
    });
  },

  _loadCourses: function _loadCourses() {
    var _this2 = this;

    if (this.isDesktop()) {
      this.availableCourses = this._getSavedCourses();
    } else {
      $.getJSON(this.COURSES_URL).then(function (availableCourses) {
        _this2.availableCourses = availableCourses;
      });
    }
  },

  _saveCourses: function _saveCourses() {
    var courses = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.availableCourses;

    window.STORAGE.setItem("courses", courses.map(function (it) {
      var course = _.clone(it);
      course.isDownloading = undefined;
      course.downloadProgress = undefined;
      return course;
    }));

    this.availableCourses = [];
    this.availableCourses = courses;
  },

  _addCourse: function _addCourse(course) {
    this._saveCourses(_.uniqBy(this.availableCourses.concat(course), "course"));
  },

  _updateGlobalDownloadState: function _updateGlobalDownloadState() {
    var tryReload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var wasEnabled = window.GBS_IS_DOWNLOADING_GUIDE;
    window.GBS_IS_DOWNLOADING_GUIDE = this.availableCourses.some(function (it) {
      return it.isDownloading;
    });
    if (tryReload && wasEnabled && !window.GBS_IS_DOWNLOADING_GUIDE) this._tryReload();
  },

  _tryReload: function _tryReload() {
    if (!confirm(this.localize("you-must-reload"))) return;
    location.reload();
  },

  _changeCourse: function _changeCourse(course, func) {
    this.availableCourses = this.availableCourses.map(function (it) {
      var newCourse = _.clone(it);
      if (it.course === course.course) func(newCourse);
      return newCourse;
    });
  },

  _getCourse: function _getCourse(slug) {
    return _.find(this.availableCourses, { course: slug });
  },

  _getSavedCourses: function _getSavedCourses() {
    return window.STORAGE.getItem("courses") || [];
  }
});