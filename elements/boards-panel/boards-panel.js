"use strict";

Polymer({
  is: 'boards-panel',
  behaviors: [Polymer.BusListenerBehavior, Polymer.PermissionsBehavior, Polymer.LocalizationBehavior, Polymer.ExpressionBehavior, Polymer.ToastBehavior],
  properties: {
    projectType: {
      type: String,
      value: "none"
    },
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
    returnValue: Object,

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
    isToolboxVisible: {
      type: Boolean,
      value: true
    },

    permissions: {
      type: Object,
      value: {
        can_change_initial_board: true,
        can_view_edition_panel: true,
        can_edit_board: true,
        can_toggle_attire_visibility: true,
        can_view_size_section: true,
        can_view_attire_section: true
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
  observers: ["_onToolboxViewPermissionChange(permissions.can_view_edition_panel, permissions.can_view_size_section, permissions.can_view_attire_section)", "_onInitialBoardOptionsChange(selectedTab, showAttire, permissions.*)"],

  attached: function attached() {
    this.tooltipAnimation = {
      "entry": [{ "name": "fade-in-animation", "timing": { "delay": 0 } }],
      "exit": [{ "name": "fade-out-animation", "timing": { "delay": 0 } }]
    };
  },

  ready: function ready() {
    var _this = this;

    this.DEFAULT_SIZE_X = 4;
    this.DEFAULT_SIZE_Y = 4;

    this.stylist = new Stylist();
    this.stylist.setUpZoom();
    this.stylist.setPanelAsResizable(this.size);

    window.GobstonesBoard.setAttireProvider({
      get: function get(name) {
        var attire = _.find(_this.availableAttires, { name: name });
        if (!attire) {
          alert("The description is using the attire '" + name + "' but it wasn't found.");
          return null;
        }

        return _.assign({}, attire, { enabled: true });
      }
    });

    this.async(function () {
      _this.initialStateEditor = _this.$$("#initialStateEditor");
    });

    this.subscribeTo("run-request", function (eventInfo) {
      _this._onRunRequest(eventInfo);
    }).subscribeTo("cancel-request", function () {
      _this._cleanState();
    }).subscribeTo("execution-result", function (eventInfo) {
      _this._onResult(eventInfo);
    }).subscribeTo("return-value", function (eventInfo) {
      _this._onReturnValue(eventInfo);
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

    this.reset();
  },

  toggleShowCode: function toggleShowCode() {
    this.setShowCode(!this.showCode);
  },

  setShowCode: function setShowCode(showCode) {
    this.showCode = showCode;
    this._ide().showCodeChanged({ detail: this.showCode });

    setTimeout(function () {
      try {
        var element = $(".ace_text-input")[0];
        if (showCode) element.focus();else element.blur();
      } catch (e) {
        // Quién sabe para qué sirve esto
      }
    }, 0);
  },

  toggleShowAttire: function toggleShowAttire() {
    if (this.availableAttires.length === 0) return;
    this.showAttire = !this.showAttire;
  },

  addOrSetAttire: function addOrSetAttire(attire) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$fromLoader = _ref.fromLoader,
        fromLoader = _ref$fromLoader === undefined ? false : _ref$fromLoader;

    if (this.setAttire(attire.name)) {
      if (fromLoader) {
        attire.name = this._makeDuplicatedName(attire.name);
      } else {
        return;
      }
    }

    this.push("availableAttires", attire);
    this.selectedAttire = -1;
    this.selectedAttire = this.availableAttires.length - 1;
  },


  removeCurrentAttire: function removeCurrentAttire() {
    if (this.availableAttires.length === 1) {
      this.showAttire = false;
      this.attire.enabled = false;
    }

    var index = this.selectedAttire;
    var availableAttires = this.availableAttires;
    this.selectedAttire = -1;
    this.set("availableAttires", availableAttires.filter(function (it, i) {
      return i !== index;
    }));
    this.selectedAttire = Math.max(0, index - 1);
  },

  updateCurrentAttire: function updateCurrentAttire(attire) {
    var _this2 = this;

    var index = this.selectedAttire;
    var availableAttires = this.availableAttires;

    this._updatingAttire = true;

    this.selectedAttire = -1;
    this.set("availableAttires", []);
    this.async(function () {
      _this2.set("availableAttires", availableAttires.map(function (it, i) {
        return i === index ? attire : it;
      }));
      _this2.selectedAttire = index;

      _this2._updatingAttire = false;
    });
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
    this.isToolboxVisible = true;
    this.showAttire = false;
    this.set("permissions.can_change_initial_board", true);
    this.set("permissions.can_view_edition_panel", true);
    this.set("permissions.can_edit_board", true);
    this.set("permissions.can_toggle_attire_visibility", true);
    this.set("permissions.can_view_size_section", true);
    this.set("permissions.can_view_attire_section", true);
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
    this._initialRandomBoard = null;
    this._lastRandomBoard = null;
    this.i++; // HACK: to force refresh computed update
    this.selectedAttire = 0;

    this._bootstrap();
    this.removeCurrentBoard();

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
    var _this3 = this;

    this._removeBoard(function (index) {
      _this3.splice("availableInitialStates", index, 1);
    });
  },

  removeFirstBoard: function removeFirstBoard() {
    var _this4 = this;

    this._removeBoard(function () {
      _this4.shift("availableInitialStates");
    });
  },

  showReturnValue: function showReturnValue() {
    this.$$("#inspectResultsModal").open();
  },

  getSizeOf: function getSizeOf(_ref2) {
    var table = _ref2.table;

    return { x: table[0].length, y: table.length };
  },

  initializeBoards: function initializeBoards() {
    this._selecting = false;
  },

  toggleToolbox: function toggleToolbox(value) {
    this.isToolboxVisible = _.isBoolean(value) ? value : !this.isToolboxVisible;
    this._updateStylistToolboxVisible();
  },

  _makeDuplicatedName: function _makeDuplicatedName(name) {
    var duplicatedCount = 1;
    var newName = name + " (" + duplicatedCount + ")";

    while (this._attireExists(newName)) {
      duplicatedCount++;
      newName = name + " (" + duplicatedCount + ")";
    }

    return newName;
  },
  _attireExists: function _attireExists(name) {
    return _.some(this.availableAttires, { name: name });
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
    return _.range(sizeY).map(function () {
      return _.range(sizeX).map(function () {
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
    if (!this.initialState) throw new Error("Initial state not found. WEIRD!");

    this._cleanState();

    var useRandomBoard = options.useRandomBoard,
        controller = options.controller;

    if (useRandomBoard) {
      if (this._initialRandomBoard == null || this._lastRandomBoard + 1 === this._initialRandomBoard) {
        this._initialRandomBoard = _.random(0, this.availableInitialStates.length - 1);
        this._lastRandomBoard = this._initialRandomBoard;
      } else {
        this._lastRandomBoard++;

        if (this._lastRandomBoard === this.availableInitialStates.length) this._lastRandomBoard = 0;
      }

      this.selectedInitialState = this._lastRandomBoard;
    }

    var initialState = {
      header: this.initialState.header,
      table: this.initialState.table,
      size: this.size
    };

    window.BUS.fire("initial-state", { initialState: initialState, controller: controller });
  },

  _onResult: function _onResult(result) {
    var _result$board = result.board,
        head = _result$board.head,
        table = _result$board.table;


    this._setFinalState({
      header: head,
      table: table
    });
  },

  _onReturnValue: function _onReturnValue(_ref3) {
    var value = _ref3.value;

    this.returnValue = value;
  },

  _onCompilationError: function _onCompilationError(report) {
    this.showToast(this.localize(report.libraryHasErrors ? "the-library-has-errors" : "the-program-has-errors"));
  },

  _onExecutionError: function _onExecutionError(error) {
    this.error = error;
    this._setSelectedTab(1);
  },

  _onUnknownError: function _onUnknownError(_error) {
    this.showToast(this.localize("unknown-interpreter-error"));
  },

  _setFinalState: function _setFinalState(finalState) {
    var _this5 = this;

    var firstTime = !this.finalState;

    this.set("finalState", finalState);
    this._setSelectedTab(1);

    var draw = function draw() {
      _this5.$$("#finalStateEditor").update(finalState.table, finalState.header);
    };

    setTimeout(function () {
      draw();

      if (firstTime) {
        _this5._updateBoardStyles();
        setTimeout(draw);
      }
    });
  },

  _onBoardChanged: function _onBoardChanged(event) {
    var _this6 = this;

    var isFromInitialState = ('composedPath' in event ? event.composedPath() : event.paht).some(function (it) {
      return it === _this6.initialStateEditor;
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
    this.initializeBoards();
  },

  _fillTable: function _fillTable() {
    if (this.initialStateEditor) this.initialStateEditor.fillTable();
  },

  _cleanState: function _cleanState() {
    this.finalState = null;
    this.error = null;
    this.returnValue = null;
    this._setSelectedTab(0);
  },

  _setSelectedTab: function _setSelectedTab(selectedTab) {
    var _this7 = this;

    // this is to avoid a Polymer's bug where the tab pink bar doesn't appear
    setTimeout(function () {
      _this7.selectedTab = selectedTab;
    });
  },


  _showCodeVisible: function _showCodeVisible(_ref4) {
    var base = _ref4.base;

    return !base.running;
  },

  _showCodeDirection: function _showCodeDirection(value) {
    return value ? 'left' : 'right';
  },

  _hasReturnValue: function _hasReturnValue(returnValue) {
    return returnValue && returnValue.value;
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
    if (!this._updatingAttire) window.BUS.fire("selected-attire", attire);
    if (attire) attire.enabled = showAttire;
    return attire;
  },

  _computeInitialState: function _computeInitialState(selectedInitialState) {
    this._selecting = true;
    return this.availableInitialStates[selectedInitialState];
  },

  _onInitialBoardOptionsChange: function _onInitialBoardOptionsChange(selectedTab, showAttire, _ref5) {
    var base = _ref5.base;

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
    if (window.GBS_IS_RUNNING) this._setSelectedTab(1);
  },

  _onToolboxViewPermissionChange: function _onToolboxViewPermissionChange(visible, sizeVisible, attireVisible) {
    if (!this.stylist) return;
    this._updateStylistToolboxVisible(visible, sizeVisible, attireVisible);
  },

  _updateSize: function _updateSize() {
    var _this8 = this;

    this._updateStylist(function () {
      _this8.stylist.refresh();
    }, function () {
      if (!_this8._selecting) _this8._fillTable();
    });
  },

  _updateBoardStyles: function _updateBoardStyles() {
    var _this9 = this;

    this._updateStylist(function () {
      _this9.stylist.setSelectedTab(_this9.selectedTab);
      var finalBoard = _this9.$$("#finalStateEditor");
      if (finalBoard) {
        finalBoard._updateStyles({ base: _this9.attire });
        _this9.stylist.refresh();
      }
    });
  },

  _updateStylist: function _updateStylist(action) {
    var _this10 = this;

    var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _.noop;

    $(".theBoardContainer").stop(true);
    $(".theBoardContainer").css("opacity", 0);
    init();
    setTimeout(function () {
      if (_this10.stylist) action();
      $(".theBoardContainer").fadeTo(300, 1);
    }, 1);
  },

  shouldShowToolbox: function shouldShowToolbox(permissions, isToolboxVisible) {
    var hasPermission = this.hasPermission(permissions, "can_view_edition_panel");

    return hasPermission && isToolboxVisible;
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
  },

  toggleToolboxButtonCss: function toggleToolboxButtonCss(isToolboxVisible) {
    return "toggle-toolbox-button-" + (isToolboxVisible ? "up" : "down");
  },

  toggleToolboxButtonIcon: function toggleToolboxButtonIcon(isToolboxVisible) {
    return "icons:arrow-drop-" + (isToolboxVisible ? "up" : "down");
  },

  transparentOrOpaqueCss: function transparentOrOpaqueCss(permissions, permissionName) {
    var hasPermission = this.hasPermission(permissions, permissionName);
    return hasPermission ? "opaque" : "transparent";
  },


  _updateStylistToolboxVisible: function _updateStylistToolboxVisible() {
    var hasPermission = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.permissions.can_view_edition_panel;
    var sizeVisible = arguments[1];
    var attireVisible = arguments[2];

    this.stylist.toolboxVisible = hasPermission && this.isToolboxVisible;
    if (sizeVisible !== undefined) this.stylist.sizeVisible = sizeVisible;
    if (attireVisible !== undefined) this.stylist.attireVisible = attireVisible;
    $(window).trigger("resize");
  },

  _ide: function _ide() {
    return document.querySelector("#gobstones-ide");
  }
});