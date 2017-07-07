"use strict";

// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

Polymer({
  is: 'gobstones-ide',
  listeners: {
    "show-code-changed": "_showCodeChanged",
    "show-boards-changed": "_showBoardsChanged"
  },
  behaviors: [Polymer.LocalizationBehavior, Polymer.LoaderBehavior],
  properties: {
    projectType: String,
    isLoading: {
      type: Boolean,
      value: false
    },
    modalContent: {
      type: String,
      value: ""
    }
  },

  ready: function ready() {
    this._setUpLoaders();
  },

  setModal: function setModal(markdown) {
    this.modalContent = markdown;
    window.BUS.fire("has-description", markdown !== "");
  },

  toggleModal: function toggleModal() {
    document.querySelector("#modal").toggle();
  },

  isBlocksProject: function isBlocksProject(projectType) {
    return projectType === 'blocks';
  },
  isCodeProject: function isCodeProject(projectType) {
    return projectType === 'code';
  },

  compileMd: function compileMd(markdown) {
    return this._renderMarkdown(this._renderEmojis(markdown));
  },

  buttonCssClass: function buttonCssClass(show) {
    return !show ? "button-disabled" : "";
  },

  _renderMarkdown: function _renderMarkdown(markdown) {
    return new showdown.Converter({ tables: true }).makeHtml(markdown);
  },

  _renderEmojis: function _renderEmojis(markdown) {
    var emoji = new EmojiConvertor();
    emoji.img_sets.apple.path = this._makeAppUrl('images/emojis/img-apple-64/');
    emoji.img_sets.apple.sheet = this._makeAppUrl('images/emojis/sheet_apple_64.png');

    return emoji.replace_colons(markdown);
  },

  _makeAppUrl: function _makeAppUrl(partialUrl) {
    return location.pathname + partialUrl;
  },

  _showCodeChanged: function _showCodeChanged(_ref) {
    var detail = _ref.detail;

    this._resizeLeftPanel(detail, 0);
  },

  _showBoardsChanged: function _showBoardsChanged(_ref2) {
    var detail = _ref2.detail;

    this._resizeLeftPanel(detail, $(document).width());
  },

  _resizeLeftPanel: function _resizeLeftPanel(show, size) {
    $(".panel-left").width(show ? $(document).width() * 0.6 : size);
    $(window).trigger("resize");
  },

  _setUpLoaders: function _setUpLoaders() {
    var getContext = this._context.bind(this);

    var projectUrl = getParameterByName("url");
    if (projectUrl) return this._setUpLoader(UrlLoader, projectUrl, getContext);

    var gitHubSlug = getParameterByName("github");
    if (gitHubSlug) return this._setUpLoader(GitHubLoader, gitHubSlug, getContext);
  },

  _setUpLoader: function _setUpLoader(Loader, url, getContext) {
    var _this = this;

    window.LOAD_PENDING_PROJECT = function () {
      _this.isLoading = true;
      var finish = function finish() {
        _this.isLoading = false;
      };

      new Loader(_this.projectType).load(url, getContext, finish).catch(function (e) {
        console.error(e);
        alert(_this.localize("error-loading-project"));
        finish();
      });
    };
  },

  ideCss: function ideCss(isLoading) {
    return isLoading ? "gray" : "";
  }
});