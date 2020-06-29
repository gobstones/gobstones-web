"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stylist = function () {
  _createClass(Stylist, null, [{
    key: "DEFAULT_PERCENTAGE",
    get: function get() {
      return 0.55;
    }
  }]);

  function Stylist() {
    var _this = this;

    _classCallCheck(this, Stylist);

    this.toolboxVisible = true;
    this.sizeVisible = true;
    this.attireVisible = true;
    this.selectedTab = 0;

    this.SCALE = 0.8;
    this.MAX_PERCENTAGE = 0.9;
    this.TOOLBAR_HEIGHT = 64;
    this.IS_TOOLBOX_VISIBLE = function () {
      return _this.toolboxVisible && (_this.sizeVisible || _this.attireVisible);
    };
    this.TOOLBOX_HEIGHT = function () {
      return !_this.sizeVisible && !_this.attireVisible ? 0 : 86 / (!_this.sizeVisible || !_this.attireVisible ? 2 : 1);
    };
    this.TOOLBAR_AND_TOOLBOX_HEIGHT = function () {
      return _this.TOOLBAR_HEIGHT + (_this.IS_TOOLBOX_VISIBLE() ? _this.TOOLBOX_HEIGHT() : 0);
    };

    this.BOARD_CSS_CLASS = ".theBoard";
    this.BOARD_CONTAINER_CSS_CLASS = ".theBoardContainer";
    this.LEFT_PANEL_CSS_CLASS = ".panel-left";
  }

  _createClass(Stylist, [{
    key: "setSelectedTab",
    value: function setSelectedTab(tab) {
      this.selectedTab = tab;
      this.refresh();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.toolboxVisible = true;
      this.sizeVisible = true;
      this.attireVisible = true;
      this.setSelectedTab(0);

      setTimeout(function () {
        document.querySelector("#gobstones-ide").resizeLeftPanel(true);
      });
    }
  }, {
    key: "correctEditorHeight",
    value: function correctEditorHeight(editor) {
      var lineHeight = editor.renderer.lineHeight;
      var availableLines = ($(document).height() - this.TOOLBAR_HEIGHT - this._getTabsHeight()) / editor.renderer.lineHeight;

      editor.setOption("minLines", availableLines);
      editor.setOption("maxLines", availableLines);
    }
  }, {
    key: "setUpZoom",
    value: function setUpZoom() {
      var _this2 = this;

      var delta = 0.1;

      $(document).ready(function () {
        $(".panel-right").bind("mousewheel", function (e) {
          var parent = e.originalEvent.target;

          while (parent) {
            if (parent.tagName.toLowerCase() === "results-inspector") return;

            parent = parent.parentElement;
          }

          if (e.originalEvent.wheelDelta > 0) _this2.SCALE += delta;else _this2.SCALE -= delta;

          if (_this2.SCALE < 0.5) _this2.SCALE = 0.5;
          if (_this2.SCALE > 0.98) _this2.SCALE = 0.98;

          _this2.refresh();
        });
      });
    }
  }, {
    key: "setPanelAsResizable",
    value: function setPanelAsResizable(boardDimensions) {
      var _this3 = this;

      $(document).ready(function () {
        _this3._makeResizable();
        setTimeout(function () {
          $(_this3.LEFT_PANEL_CSS_CLASS + " .ui-resizable-s").hide();
          $(_this3.LEFT_PANEL_CSS_CLASS + " .ui-resizable-se").hide();

          _this3.refresh();
        }, 0);
      });

      $(window).resize(function () {
        var percentage = _this3._getPercentage();
        var isBorder = _this3._isBorder(percentage);

        if (!isBorder) window.STORAGE.setItem("code-panel-percentage", _this3._getPercentage());

        _this3.refresh();
      });
    }
  }, {
    key: "setUpBlocklyCustomizations",
    value: function setUpBlocklyCustomizations() {
      var _this4 = this;

      var resize = function resize() {
        var panel = $(_this4.LEFT_PANEL_CSS_CLASS);
        $("#blocklyDiv").css("width", panel.width() + "px");
        $("#blocklyDiv").css("height", panel.height() - _this4.TOOLBAR_HEIGHT - _this4._getTabsHeight() + "px");

        // fix for white overlay in procedure comments:
        $("#blocklyDiv").unbind("click");
        $("#blocklyDiv").click(function () {
          return $(".blocklyMinimalBody").height("100%");
        });

        // fix buttons position:
        // const x = $('#blocklyDiv').width() - 92;
        // const y = $('#blocklyDiv').height() - 174;
        // $('.blocklyTrash').css("transform", `translate(${x}px, ${y}px)`);
        // $('.blocklyTrash').css("display", "unset");
        // $('.blocklyZoom').css("transform", `translate(${x + 8}px, ${y - 120}px)`);
        // $('.blocklyZoom').css("display", "unset");
      };

      setTimeout(resize, 0);
      $(window).resize(resize);

      var setColors = function setColors(cssClass, opacity, tintKind, color) {
        var scrollbars = $(cssClass);
        scrollbars.css("opacity", opacity);

        scrollbars.each(function (i, scrollbar) {
          scrollbar.setAttributeNS(null, tintKind, color);
        });
      };

      setTimeout(function () {
        setColors(".blocklyScrollbarBackground", 0.2, "fill", "#0b465d");
        setColors(".blocklyScrollbarHandle", 1, "stroke", "black");

        var oldAnimateLid_ = Blockly.Trashcan.prototype.animateLid_;
        Blockly.Trashcan.prototype.animateLid_ = function () {
          oldAnimateLid_.call(this);

          var opacity = goog.math.lerp(1, 1, this.lidOpen_);
          this.svgGroup_.style.opacity = opacity;
        };
        $(".blocklyTrash").css("opacity", 1);
      }, 0);
    }
  }, {
    key: "setUpMarkdownEditorCustomizations",
    value: function setUpMarkdownEditorCustomizations() {
      this._setUpResize(".CodeMirror", -100);
    }
  }, {
    key: "setUpMetadataEditorCustomizations",
    value: function setUpMetadataEditorCustomizations() {
      this._setUpResize(".metadata-editor-options");
    }
  }, {
    key: "_setUpResize",
    value: function _setUpResize(selector) {
      var _this5 = this;

      var extraPixels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var resize = function resize() {
        var panel = $(_this5.LEFT_PANEL_CSS_CLASS);
        $(selector).css("height", panel.height() - _this5.TOOLBAR_HEIGHT - _this5._getTabsHeight() + extraPixels + "px");
      };

      setTimeout(resize, 0);
      $(window).resize(resize);
    }
  }, {
    key: "refresh",
    value: function refresh() {
      var percentage = this._keepAspectRatioOnWindowResize(this.LEFT_PANEL_CSS_CLASS);
      this._scaleAndCenterBoard(percentage);
    }
  }, {
    key: "_keepAspectRatioOnWindowResize",
    value: function _keepAspectRatioOnWindowResize() {
      var documentWidth = $(document).width();
      if (!this.lastDocumentWidth) {
        this.lastDocumentWidth = documentWidth;
        return Stylist.DEFAULT_PERCENTAGE;
      }

      var percentage = this._getPercentage();

      var leftPanel = $(this.LEFT_PANEL_CSS_CLASS);
      leftPanel.width(documentWidth * percentage);
      this.lastDocumentWidth = documentWidth;

      return percentage;
    }
  }, {
    key: "_scaleAndCenterBoard",
    value: function _scaleAndCenterBoard(percentage) {
      var board = this._getBoard();

      board.css({ opacity: 0, transform: "scale(1)" });
      var scale = this._getScale(percentage);
      this._centerBoard(percentage);

      board.css({ opacity: 1, transform: "scale(" + scale + ")" });
    }
  }, {
    key: "_centerBoard",
    value: function _centerBoard(percentage) {
      // center vertically
      var middleY = this._getRightPanelHeight() / 2;
      var offsetY = this._getBoardHeight() / 2;
      $(this.BOARD_CSS_CLASS).css("margin-top", middleY - offsetY + "px");

      // center horizontally
      $(".theBoardContainer").width(0); // avoid increasing container width
      var panelWidth = this._getRightPanelWidth(percentage);
      var middleX = panelWidth / 2;
      var offsetX = this._getBoardWidth() / 2;

      this._getBoard().css("margin-left", middleX - offsetX + "px");
    }
  }, {
    key: "_makeResizable",
    value: function _makeResizable() {
      $(this.LEFT_PANEL_CSS_CLASS).resizable({
        resizeHeight: false
      });
    }
  }, {
    key: "_getPercentage",
    value: function _getPercentage() {
      var leftPanel = $(this.LEFT_PANEL_CSS_CLASS);
      var percentage = leftPanel.width() / this.lastDocumentWidth;
      if (_.isNaN(percentage)) return Stylist.DEFAULT_PERCENTAGE;

      return this._isBorder(percentage) ? percentage : Math.min(percentage, this.MAX_PERCENTAGE);
    }
  }, {
    key: "_isBorder",
    value: function _isBorder(percentage) {
      return Math.abs(1 - percentage) < 0.0001 || Math.abs(percentage) < 0.0001;
    }
  }, {
    key: "_getRightPanelWidth",
    value: function _getRightPanelWidth(percentage) {
      return $(document).width() * (1 - percentage);
    }
  }, {
    key: "_getRightPanelHeight",
    value: function _getRightPanelHeight() {
      return $(document).height() - this.TOOLBAR_AND_TOOLBOX_HEIGHT();
    }
  }, {
    key: "_getBoardWidth",
    value: function _getBoardWidth() {
      return this._getBoard().width();
    }
  }, {
    key: "_getBoardHeight",
    value: function _getBoardHeight() {
      return this._getBoard().height();
    }
  }, {
    key: "_getTabsHeight",
    value: function _getTabsHeight() {
      var ide = document.querySelector("#gobstones-ide");
      return ide.projectType === "teacher" ? 48 : 0;
    }
  }, {
    key: "_getScale",
    value: function _getScale(percentage) {
      var panelWidth = this._getRightPanelWidth(percentage);
      var boardWidth = this._getBoardWidth();
      var scaleX = panelWidth / boardWidth;

      var panelHeight = this._getRightPanelHeight();
      var boardHeight = this._getBoardHeight();
      var scaleY = panelHeight / boardHeight;

      var scale = Math.max(Math.min(scaleX, scaleY) * this.SCALE, 0);
      var fixedScale = scale.toFixed(1);
      var finalScale = parseFloat(fixedScale);
      if (parseInt(_.last(fixedScale)) % 2 === 1) finalScale += 0.02;

      return finalScale;
    }
  }, {
    key: "_getBoard",
    value: function _getBoard() {
      var boards = $(".theBoardContainer").find(".gbs_board");
      return this.selectedTab === 0 ? boards.first() : boards.last();
    }
  }]);

  return Stylist;
}();

;