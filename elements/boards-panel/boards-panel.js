"use strict";

Polymer({
  is: 'boards-panel',
  behaviors: [Polymer.BusListenerBehavior, Polymer.PermissionsBehavior, Polymer.LocalizationBehavior, Polymer.ExpressionBehavior, Polymer.ToastBehavior],
  properties: {
    showCode: {
      type: Boolean,
      value: true
    },
    interactive: {
      type: Object,
      value: {
        running: false,
        wasShowingCode: false
      }
    },
    selectedTab: {
      type: Number,
      value: 0,
      observer: "_updateSelectedTab"
    },
    sizeX: {
      type: Number,
      value: 4,
      observer: "_updateSize"
    },
    sizeY: {
      type: Number,
      value: 4,
      observer: "_updateSize"
    },
    size: {
      type: Object,
      computed: "_computeSize(sizeX, sizeY)",
      observer: "_updateSize"
    },
    initialBoardOptions: {
      type: Object,
      value: { editable: true }
    },

    finalState: Object,
    error: Object,

    availableInitialStates: {
      type: Array,
      value: []
    },
    initialState: {
      type: Object,
      computed: "_computeInitialState(selectedInitialState)",
      observer: "_onBoardSelected"
    },
    selectedInitialState: {
      type: Number,
      value: -1
    },

    availableAttires: {
      type: Array,
      value: []
    },
    attire: {
      type: Object,
      computed: "_computeAttire(selectedAttire, showAttire)"
    },
    selectedAttire: {
      type: Number,
      value: 0
    },
    showAttire: {
      type: Boolean,
      value: false,
      observer: "_updateAttire"
    },

    permissions: {
      type: Object,
      value: {
        can_view_edition_panel: true,
        can_edit_board: true,
        can_toggle_attire_visibility: true
      }
    },

    i: {
      type: Number,
      value: 0
    },
    tooltipAnimation: Object
  },
  listeners: {
    "board-changed": "_onBoardChanged"
  },
  observers: ["_onToolboxViewPermissionChange(permissions.can_view_edition_panel)", "_onInitialBoardOptionsChange(selectedTab, showAttire, permissions.*)"],

  ready: function ready() {
    var _this = this;

    this.DEFAULT_SIZE_X = 4;
    this.DEFAULT_SIZE_Y = 4;

    this.stylist = new Stylist();
    this.stylist.setPanelAsResizable(this.size);

    this.async(function () {
      _this.initialStateEditor = _this.$$("#initialStateEditor");
    });

    this._adapter = new ParserAndBoardAdapter();

    this.subscribeTo("run-request", function (eventInfo) {
      _this._onRunRequest(eventInfo);
    }).subscribeTo("cancel-request", function () {
      _this._cleanState();
    }).subscribeTo("execution-result", function (eventInfo) {
      _this._onResult(eventInfo);
    }).subscribeTo("compilation-error", function (eventInfo) {
      _this._onCompilationError(eventInfo);
    }).subscribeTo("execution-error", function (eventInfo) {
      _this._onExecutionError(eventInfo);
    }).subscribeTo("unknown-error", function (eventInfo) {
      _this._onUnknownError(eventInfo);
    }).subscribeTo("editor-dirty", function () {
      _this._cleanState();
    }).subscribeTo("interactive-run", function () {
      _this._saveInteractive();
    }).subscribeTo("execution-stop", function () {
      _this._restoreInteractive();
    });

    if (this.availableInitialStates.length > 0) return;
    this._bootstrap();

    this.tooltipAnimation = {
      "entry": [{ "name": "fade-in-animation", "timing": { "delay": 1000 } }],
      "exit": [{ "name": "fade-out-animation" }]
    };
  },

  toggleShowCode: function toggleShowCode() {
    this.setShowCode(!this.showCode);
  },

  setShowCode: function setShowCode(showCode) {
    this.showCode = showCode;
    this.fire("show-code-changed", this.showCode);

    setTimeout(function () {
      try {
        var element = $(".ace_text-input")[0];
        if (showCode) element.focus();else element.blur();
      } catch (e) {}
    }, 0);
  },

  toggleShowAttire: function toggleShowAttire() {
    if (this.availableAttires.length === 0) return;
    this.showAttire = !this.showAttire;
  },

  addOrSetAttire: function addOrSetAttire(attire) {
    if (this.setAttire(attire.name)) return;

    this.push("availableAttires", attire);
    this.selectedAttire = this.availableAttires.length - 1;
  },

  setAttire: function setAttire(name) {
    var availableAttire = _.find(this.availableAttires, { name: name });
    if (availableAttire) this.selectedAttire = this.availableAttires.indexOf(availableAttire);
    return availableAttire;
  },

  addInitialState: function addInitialState(initialState) {
    this.push("availableInitialStates", initialState);
    this.selectedInitialState = this.availableInitialStates.length - 1;
  },

  reset: function reset() {
    this.showAttire = false;
    this.set("permissions.can_view_edition_panel", true);
    this.set("permissions.can_edit_board", true);
    this.set("permissions.can_toggle_attire_visibility", true);
    this.stylist.reset();

    this.sizeX = this.DEFAULT_SIZE_X;
    this.sizeY = this.DEFAULT_SIZE_Y;

    this.cleanBoard();
    this.availableInitialStates = [];
    this.availableAttires = [];

    this._bootstrap();
    this._fillTable();
    this._cleanState();
    this.selectedInitialState = 0;
    this.i++; // ^ to force computed update
    this.selectedAttire = 0;

    window.BUS.fire("reset");
  },

  cleanBoard: function cleanBoard() {
    this.set("initialState.header", { x: 0, y: 0 });
    this.set("initialState.table", this._buildEmptyTable(this.sizeX, this.sizeY));

    this._cleanState();
  },

  addBoard: function addBoard() {
    this._bootstrap(this.DEFAULT_SIZE_X, this.DEFAULT_SIZE_Y);
  },

  removeCurrentBoard: function removeCurrentBoard() {
    var _this2 = this;

    this._removeBoard(function (index) {
      _this2.splice("availableInitialStates", index, 1);
    });
  },

  removeFirstBoard: function removeFirstBoard() {
    var _this3 = this;

    this._removeBoard(function (index) {
      _this3.shift("availableInitialStates");
    });
  },

  getSizeOf: function getSizeOf(_ref) {
    var table = _ref.table;

    return { x: table[0].length, y: table.length };
  },

  finishLoadingBoards: function finishLoadingBoards() {
    this._selecting = false;
  },

  _bootstrap: function _bootstrap() {
    var sizeX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.sizeX;
    var sizeY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.sizeY;

    this.addInitialState({
      header: { x: 0, y: 0 },
      table: this._buildEmptyTable(sizeX, sizeY)
    });
  },

  _buildEmptyTable: function _buildEmptyTable(sizeX, sizeY) {
    return _.range(sizeY).map(function (row) {
      return _.range(sizeX).map(function (cell) {
        return {};
      });
    });
  },

  _removeBoard: function _removeBoard(action) {
    if (this.availableInitialStates.length < 2) return;

    var oldIndex = this.selectedInitialState;
    var newIndex = this.selectedInitialState - 1;

    if (newIndex < 0) this.selectedInitialState = 1;
    action(oldIndex);
    this.selectedInitialState = Math.max(0, newIndex);
  },

  _onRunRequest: function _onRunRequest(options) {
    this._cleanState();

    if (options.useRandomBoard) this.selectedInitialState = _.random(0, this.availableInitialStates.length - 1);

    window.BUS.fire("initial-state", {
      header: this.initialState.header,
      table: this._adapter.adaptToParser(this.initialState.table),
      size: this.size
    });
  },

  _onResult: function _onResult(result) {
    var board = result.board;

    this._setFinalState({
      header: _.pick(board, "x", "y"),
      table: this._adapter.adaptToBoard(board.table)
    });
  },

  _onCompilationError: function _onCompilationError(report) {
    this.showToast(report.line ? "[" + report.line + "] " + report.error.message : this.localize(report.libraryHasErrors ? "the-library-has-errors" : "the-program-has-errors"));
  },

  _onExecutionError: function _onExecutionError(error) {
    this.error = error;
    this.selectedTab = 1;
  },

  _onUnknownError: function _onUnknownError(error) {
    this.showToast(this.localize("unknown-interpreter-error"));
  },

  _setFinalState: function _setFinalState(finalState) {
    var _this4 = this;

    var firstTime = !this.finalState;
    this.set("finalState", finalState);
    this.selectedTab = 1;

    setTimeout(function () {
      _this4.$$("#finalStateEditor").update(finalState.table, finalState.header);
      if (firstTime) _this4._updateBoardStyles();
    }, 1);
  },

  _onBoardChanged: function _onBoardChanged(event) {
    var _this5 = this;

    var isFromInitialState = event.path.some(function (it) {
      return it === _this5.initialStateEditor;
    });
    if (!isFromInitialState) return;

    var initialState = this.availableInitialStates[this.selectedInitialState];
    // ^ Use this and not `this.initialState`! The listeners execute before computed properties.

    initialState.header = this.initialStateEditor.header;
    initialState.table = this.initialStateEditor.table;

    this._cleanState();
  },

  _onBoardSelected: function _onBoardSelected() {
    var size = this.getSizeOf(this.initialState);

    this.sizeX = size.x;
    this.sizeY = size.y;

    this._fillTable();
    this.finishLoadingBoards();
  },

  _fillTable: function _fillTable() {
    if (this.initialStateEditor) this.initialStateEditor.fillTable();
  },

  _cleanState: function _cleanState() {
    this.finalState = null;
    this.error = null;
    this.selectedTab = 0;
  },

  _showCodeVisible: function _showCodeVisible(_ref2) {
    var base = _ref2.base;

    return !base.running;
  },

  _showCodeDirection: function _showCodeDirection(value) {
    return value ? 'left' : 'right';
  },

  _computeSize: function _computeSize(sizeX, sizeY) {
    var x = sizeX === "" ? this.size.x : this._limitSize(sizeX);
    var y = sizeY === "" ? this.size.y : this._limitSize(sizeY);
    if (sizeX !== "") this.sizeX = x;
    if (sizeY !== "") this.sizeY = y;

    return { x: x, y: y };
  },

  _computeAttire: function _computeAttire(selectedAttire, showAttire) {
    var attire = this.availableAttires[selectedAttire];
    if (attire) attire.enabled = showAttire;
    return attire;
  },

  _computeInitialState: function _computeInitialState(selectedInitialState) {
    this._selecting = true;
    return this.availableInitialStates[selectedInitialState];
  },

  _onInitialBoardOptionsChange: function _onInitialBoardOptionsChange(selectedTab, showAttire, _ref3) {
    var base = _ref3.base;

    this.set("initialBoardOptions.editable", !this.isInitialBoardNotEditable(selectedTab, showAttire, base));
  },

  _saveInteractive: function _saveInteractive() {
    this.interactive.wasShowingCode = this.showCode;
    if (this.showCode) this.toggleShowCode();
    this.set("interactive.running", true);
    setTimeout(function () {
      return document.activeElement.blur();
    }, 0);
  },

  _restoreInteractive: function _restoreInteractive() {
    if (!this.interactive.running) return;

    this.set("interactive.running", false);
    if (this.interactive.wasShowingCode !== this.showCode) this.toggleShowCode();
  },

  _limitSize: function _limitSize(n) {
    return Math.max(Math.min(n, 30), 1);
  },

  _updateAttire: function _updateAttire() {
    this.set("attire.enabled", this.showAttire);
    if (this.stylist) this.stylist.refresh();
  },

  _updateSelectedTab: function _updateSelectedTab() {
    this._updateBoardStyles();
    if (window.GBS_IS_RUNNING) this.selectedTab = 1;
  },

  _onToolboxViewPermissionChange: function _onToolboxViewPermissionChange(visible) {
    if (this.stylist) this.stylist.toolboxVisible = visible;
    $(window).trigger("resize");
  },

  _updateSize: function _updateSize() {
    var _this6 = this;

    this._updateStylist(function () {
      _this6.stylist.refresh();
    }, function () {
      if (!_this6._selecting) _this6._fillTable();
    });
  },

  _updateBoardStyles: function _updateBoardStyles() {
    var _this7 = this;

    this._updateStylist(function () {
      _this7.stylist.setSelectedTab(_this7.selectedTab);
      var finalBoard = _this7.$$("#finalStateEditor");
      if (finalBoard) {
        finalBoard._updateStyles({ base: _this7.attire });
        _this7.stylist.refresh();
      }
    });
  },

  _updateStylist: function _updateStylist(action) {
    var _this8 = this;

    var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _.noop;

    $(".theBoardContainer").stop(true);
    $(".theBoardContainer").css("opacity", 0);
    init();
    setTimeout(function () {
      if (_this8.stylist) action();
      $(".theBoardContainer").fadeTo(300, 1);
    }, 1);
  },

  isBoom: function isBoom(error) {
    return error !== undefined && error !== null;
  },
  isInitialBoardSelected: function isInitialBoardSelected(selectedTab) {
    return selectedTab === 0;
  },
  isFinalBoardSelected: function isFinalBoardSelected(selectedTab) {
    return selectedTab === 1;
  },
  isFinalBoardVisible: function isFinalBoardVisible(finalState, error) {
    return finalState || error;
  },
  isInitialBoardNotEditable: function isInitialBoardNotEditable(selectedTab, showAttire, permissions) {
    return selectedTab === 1 || showAttire || !this.hasPermission(permissions, "can_edit_board");
  },

  buttonCssClass: function buttonCssClass(element) {
    if (!this.domHost) return;
    return this.domHost.buttonCssClass(element);
  },

  boardSizeCss: function boardSizeCss(selectedTab, showAttire, permissions) {
    return this.isInitialBoardNotEditable(selectedTab, showAttire, permissions) ? "gray" : "";
  },

  boardChangeButtonCss: function boardChangeButtonCss(selectedTab) {
    return this.isInitialBoardSelected(selectedTab) ? "" : "hidden";
  },

  boardButtonCss: function boardButtonCss(selectedTab, showAttire, permissions) {
    return "black-button" + (this.isInitialBoardNotEditable(selectedTab, showAttire, permissions) ? " hidden" : "");
  }
});