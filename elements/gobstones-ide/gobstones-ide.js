"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

Polymer({
  is: 'gobstones-ide',
  behaviors: [Polymer.LocalizationBehavior, Polymer.LoaderBehavior],
  properties: {
    projectType: String,
    showIsLoading: {
      type: Boolean,
      computed: "_computeShowIsLoading(isLoading, isLoadingProjects, isLoadingAssets)"
    },
    isLoading: {
      type: Boolean,
      value: false
    },
    isLoadingProjects: {
      type: Boolean,
      value: false
    },
    isLoadingAssets: {
      type: Boolean,
      value: false
    },
    description: {
      type: String,
      value: ""
    },
    preventDescriptionAutoShow: {
      type: Boolean,
      value: false
    },
    currentCode: {
      type: String,
      value: ""
    }
  },
  listeners: {
    "open-blocks-project-selector": "_onOpenBlocksProjectSelector"
  },

  ready: function ready() {
    var _this = this;

    window.extendJQuery();
    window.GBS_PROJECT_TYPE = this.projectType;
    this._setTheRightUrl();
    this._setUpKeys();
    this._setUpLoaders();
    this._setUpMouseWheel();

    setTimeout(function () {
      var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
      if (!isChrome && !window.GBS_DESKTOP) alert(_this.localize("chrome-warning"));
    });

    GitHubLoader.getDesktopRelease().then(function (release) {
      _this.REMOTE_DESKTOP_RELEASE = release.name;

      // Only check for updates if in desktop but not packaged for OS.
      if (window.GBS_DESKTOP && window.IS_PACKAGED) {
        console.log('This is a packaged app. The OS manages the version of the app. Not checking for updates');
      } else if (window.GBS_DESKTOP && !window.IS_PACKAGED) {
        var electron = window.GBS_REQUIRE("electron");
        var currentVersion = electron.remote.app.getVersion();

        var hasNewerRemote = currentVersion !== _this.REMOTE_DESKTOP_RELEASE;
        try {
          var _currentVersion$split = currentVersion.split('.'),
              _currentVersion$split2 = _slicedToArray(_currentVersion$split, 3),
              desktopMajorStr = _currentVersion$split2[0],
              desktopMinorStr = _currentVersion$split2[1],
              desktopPatchStr = _currentVersion$split2[2];

          var _REMOTE_DESKTOP_RELEA = _this.REMOTE_DESKTOP_RELEASE.split('.'),
              _REMOTE_DESKTOP_RELEA2 = _slicedToArray(_REMOTE_DESKTOP_RELEA, 3),
              remoteMajorStr = _REMOTE_DESKTOP_RELEA2[0],
              remoteMinorStr = _REMOTE_DESKTOP_RELEA2[1],
              remotePatchStr = _REMOTE_DESKTOP_RELEA2[2];

          var _ref = [parseInt(desktopMajorStr), parseInt(desktopMinorStr), parseInt(desktopPatchStr)],
              desktopMajor = _ref[0],
              desktopMinor = _ref[1],
              desktopPatch = _ref[2];
          var _ref2 = [parseInt(remoteMajorStr), parseInt(remoteMinorStr), parseInt(remotePatchStr)],
              remoteMajor = _ref2[0],
              remoteMinor = _ref2[1],
              remotePatch = _ref2[2];


          hasNewerRemote = desktopMajor < remoteMajor || desktopMajor === remoteMajor && desktopMinor < remoteMinor || desktopMajor === remoteMajor && desktopMinor === remoteMinor && desktopPatch < remotePatch;

          console.log('Comparing based to semVer');
        } catch (e) {
          // Quién sabe para qué sirve esto
        }

        if (hasNewerRemote) {
          console.log('Newer version found. Current version is: ' + currentVersion + ' but remote is: ' + _this.REMOTE_DESKTOP_RELEASE + ' We recommend updating.');
          setTimeout(function () {
            var lastDatePrompt = window.STORAGE.getItem("lastDatePrompt");
            var today = new Date().getDate();
            if (today === lastDatePrompt) return;

            if (confirm(_this.localize("new-version-confirm"))) {
              electron.shell.openExternal("https://github.com/gobstones/gobstones-web-desktop/releases/latest");
            }

            window.STORAGE.setItem("lastDatePrompt", today);
          });
        } else {
          console.log('No new version found. Current is: ' + currentVersion + ' but remote is: ' + _this.REMOTE_DESKTOP_RELEASE + ' No update needed.');
        }
      }
    });

    // HACK de "necesitamos esto ya":
    // TODO: Hacer timeout configurable en gobstones-code-runner y sacar esto.
    Parser.prototype.hasFailed = function (result) {
      this.interpreter.config.setInfiniteLoopTimeout(10000);return result.reason;
    };
  },

  setDescription: function setDescription(markdown) {
    this.description = markdown;
    window.BUS.fire("has-description", markdown !== "");
  },

  showDescriptionModal: function showDescriptionModal() {
    setTimeout(function () {
      // HACK: para que el popup aparezca centrado
      document.querySelector("#descriptionModal").open();
      $("paper-drawer-panel")[0].closeDrawer();

      setTimeout(function () {
        window.GobstonesBoard.updateAllBoards();
      }, 500); // HACK: para que renderice los <gs-board /> con vestimenta bien
    });
  },

  hideAboutModal: function hideAboutModal() {
    document.querySelector("#aboutModal").close();
  },

  showAboutModal: function showAboutModal() {
    document.querySelector("#aboutModal").open();
    this._closeDrawer();
  },

  hideProjectSelectorModal: function hideProjectSelectorModal() {
    document.querySelector("#projectSelectorModal").close();
  },

  showProjectSelectorModal: function showProjectSelectorModal() {
    document.querySelector("#projectSelectorModal").open();
    this._closeDrawer();
  },

  hideCourseSelectorModal: function hideCourseSelectorModal() {
    document.querySelector("#courseSelectorModal").close();
  },

  showCourseSelectorModal: function showCourseSelectorModal() {
    document.querySelector("#courseSelectorModal").open();
    this._closeDrawer();
  },

  isProjectSelectorModalOpened: function isProjectSelectorModalOpened() {
    return document.querySelector("#projectSelectorModal").opened;
  },

  setCurrentCode: function setCurrentCode(newCode) {
    this.currentCode = newCode;
  },

  showCodeViewModal: function showCodeViewModal(_newCode) {
    document.querySelector("#codeViewModal").open();
  },

  showReportIssueModal: function showReportIssueModal() {
    var modal = document.querySelector("#reportIssueModal");
    modal.open();
    modal.addEventListener('iron-overlay-closed', function () {
      document.querySelector("report-issue").reset();
    });
  },

  showCodeChanged: function showCodeChanged(_ref3) {
    var detail = _ref3.detail;

    this.resizeLeftPanel(detail, 0);
  },

  showBoardsChanged: function showBoardsChanged(_ref4) {
    var detail = _ref4.detail;

    this.resizeLeftPanel(detail, $(document).width());
  },

  resizeLeftPanel: function resizeLeftPanel(show, hiddenSize) {
    var percentage = +window.STORAGE.getItem("code-panel-percentage") || Stylist.DEFAULT_PERCENTAGE;

    $(".panel-left").width(show ? $(document).width() * percentage : hiddenSize);
    $(window).trigger("resize");
  },

  isCodeProject: function isCodeProject(projectType) {
    return projectType === 'code';
  },
  isBlocksProject: function isBlocksProject(projectType) {
    return projectType === 'blocks';
  },
  isTeacherProject: function isTeacherProject(projectType) {
    return projectType === 'teacher';
  },

  compileMd: function compileMd(markdown) {
    return this._renderMarkdown(this._renderEmojis(markdown));
  },

  buttonCssClass: function buttonCssClass(show) {
    return !show ? "button-disabled" : "";
  },

  _closeDrawer: function _closeDrawer() {
    $("paper-drawer-panel")[0].closeDrawer();
  },

  _onOpenBlocksProjectSelector: function _onOpenBlocksProjectSelector() {
    if (this.projectType === "teacher") return;
    this.showProjectSelectorModal();
  },

  _renderMarkdown: function _renderMarkdown(markdown) {
    markdown = this._renderVariables(markdown);

    if (!window.showdown && window.GBS_DESKTOP) {
      window.showdown = window.GBS_REQUIRE("showdown");
    }

    return new window.showdown.Converter({ tables: true }).makeHtml(markdown);
  },

  _renderEmojis: function _renderEmojis(markdown) {
    var emoji = new EmojiConvertor();
    emoji.img_sets.apple.path = this._makeAppUrl('images/emojis/img-apple-64/');
    emoji.img_sets.apple.sheet = this._makeAppUrl('images/emojis/sheet_apple_64.png');

    return emoji.replace_colons(markdown);
  },

  _renderVariables: function _renderVariables(markdown) {
    var escapeSpaces = function escapeSpaces(s) {
      return s.replace(/ /g, "%20");
    };
    var gitHubSlug = getParameterByName("github");
    var gitHubPath = getParameterByName("path");
    if (gitHubSlug) markdown = markdown.replace(/\$CURRENT_PROJECT/g, "https://raw.githubusercontent.com/" + escapeSpaces(gitHubSlug) + "/master/" + (escapeSpaces(gitHubPath) || '.'));

    var fsPath = getParameterByName("fs");
    if (fsPath) markdown = markdown.replace(/\$CURRENT_PROJECT/g, "file://" + escapeSpaces(fsPath));

    return markdown;
  },

  _onCloseDescriptionModal: function _onCloseDescriptionModal() {
    this._showTour();
  },

  _makeAppUrl: function _makeAppUrl(partialUrl) {
    return location.pathname + partialUrl;
  },

  _setUpLoaders: function _setUpLoaders() {
    var getContext = this._context.bind(this);

    var projectUrl = getParameterByName("url");
    if (projectUrl) return this._setUpLoader(UrlLoader, projectUrl, getContext);

    var gitHubSlug = getParameterByName("github");
    var gitHubPath = getParameterByName("path");
    if (gitHubSlug) return this._setUpLoader(GitHubLoader, gitHubSlug, getContext, gitHubPath);

    var fsPath = getParameterByName("fs");
    if (fsPath) return this._setUpLoader(FsLoader, fsPath, getContext);
  },

  _setUpLoader: function _setUpLoader(Loader, resource, getContext, subresource) {
    var _this2 = this;

    window.LOAD_PENDING_PROJECT = function () {
      _this2.startLoading();
      var finish = function finish() {
        _this2.stopLoading();
      };

      new Loader(_this2.projectType, resource, subresource).load(getContext, finish).catch(function (e) {
        console.error(e);
        alert(_this2.localize("error-loading-project"));
        finish();
      });
    };
  },

  _setUpMouseWheel: function _setUpMouseWheel() {
    this.addEventListener("wheel", function (event) {
      var parent = event.target;
      var isBlocklyToolboxChild = false;

      while (parent) {
        if (parent.classList.contains("blocklyToolboxDiv")) isBlocklyToolboxChild = true;

        parent = parent.parentElement;
      }

      if (isBlocklyToolboxChild) {
        event.preventDefault();
        event.stopPropagation();
      }
    }, true);
  },
  startLoading: function startLoading() {
    var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "isLoading";

    this[property] = true;
  },
  stopLoading: function stopLoading() {
    var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "isLoading";

    this[property] = false;
  },


  ideCss: function ideCss(showIsLoading) {
    return showIsLoading ? "gray" : "";
  },

  _computeShowIsLoading: function _computeShowIsLoading(isLoading, isLoadingProjects, isLoadingAssets) {
    return isLoading || isLoadingProjects || isLoadingAssets;
  },

  _setTheRightUrl: function _setTheRightUrl() {
    if (window.GBS_DESKTOP) return;

    var url = window.location.href;
    url = url.replace(/#\/?(blocks|code|teacher)/g, "");
    if (this.projectType === "code") url = url.replace(/gobstones-web/g, "gobstones-sr");
    if (this.projectType === "blocks") url = url.replace(/gobstones-web/g, "gobstones-jr");
    if (this.projectType === "teacher") url = url.replace(/gobstones-web/g, "gobstones-teacher");

    history.replaceState({}, '', url);
  },


  _setUpKeys: function _setUpKeys() {
    var _this3 = this;

    window.GBS_DISABLE_TUTORIAL = function () {
      if (window.GBS_TOUR_ON) {
        window.MATERIAL_WALKER_CLOSE();
        window.GBS_TOUR_ON = false;
        window.GBS_TOUR_ENDED = true;

        setTimeout(function () {
          if (confirm(_this3.localize("do-you-want-to-disable-tutorial"))) {
            window.STORAGE.setItem("show-tutorial", false);
            document.querySelector("#menu").showTutorial = false;
          }
        }, 150);

        return;
      }
    };

    $(document).keydown(function (e) {
      if (e.keyCode == 27) {
        // ESC
        window.GBS_DISABLE_TUTORIAL();
      }
    });
  },

  _showTour: function _showTour() {
    if (!this.$.boards.showCode || this.projectType === "teacher") return;

    var shouldNotShow = window.STORAGE.getItem("show-tutorial") === "false";
    if (window.GBS_TOUR_ENDED || shouldNotShow) return;
    window.GBS_TOUR_ON = true;

    $.walk([{
      target: "#code-placeholder",
      content: '<a style="font-size: small; color: aliceblue" href="javascript: window.GBS_DISABLE_TUTORIAL()">' + this.localize("tutorial-0") + '</a><br>' + this.localize("tutorial-1"),
      color: '#2e3aa1',
      acceptText: 'OK'
    }, {
      target: ".panel-right",
      content: this.localize("tutorial-2"),
      color: '#2e3aa1',
      acceptText: 'OK'
    }, {
      target: "#theBoardsTab",
      content: this.localize("tutorial-2.5"),
      color: '#2e3aa1',
      acceptText: 'OK'
    }, {
      target: "#playButton",
      content: this.localize("tutorial-3"),
      color: '#0b465d',
      acceptText: 'OK'
    }, {
      target: "#speedSlider",
      content: this.localize("tutorial-3.5"),
      color: '#0b465d',
      acceptText: 'OK'
    }, {
      target: "#project-buttons-placeholder",
      content: this.localize("tutorial-4"),
      color: '#2e3aa1',
      acceptText: 'OK'
    }, {
      target: "#open-description-button",
      content: this.localize("tutorial-4.5"),
      color: '#2e3aa1',
      acceptText: 'OK'
    }, {
      target: "#options-button",
      content: this.localize("tutorial-5"),
      color: '#2e3aa1',
      acceptText: 'OK'
    }]);
  }
});