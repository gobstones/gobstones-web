"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MetadataLoader = function (_TextLoader) {
  _inherits(MetadataLoader, _TextLoader);

  function MetadataLoader() {
    _classCallCheck(this, MetadataLoader);

    var _this = _possibleConstructorReturn(this, (MetadataLoader.__proto__ || Object.getPrototypeOf(MetadataLoader)).call(this));

    _.defaults(_this, SingleFileComponent);

    _this.SUFFIX = ".json";
    _this.shouldHandle = function (path) {
      return !_.includes(path, "/") && _.endsWith(path, _this.SUFFIX);
    };

    _this.SPEED_NAMES = ["low", "medium", "high", "instantaneous"];
    _this.RANDOM_SOURCE = "random";
    _this.SELECTED_SOURCE = "selected";
    return _this;
  }

  _createClass(MetadataLoader, [{
    key: "buildContent",
    value: function buildContent(context) {
      return JSON.stringify({
        name: context.getProjectName(),
        type: context.ide.projectType,
        library: {
          visible: context.toolbar.permissions.can_use_library
        },
        source: {
          visible: context.boards.showCode
        },
        board: {
          active: context.boards.selectedInitialState + 1,
          initial_board_source: context.editor.runner.useRandomBoard ? this.RANDOM_SOURCE : this.SELECTED_SOURCE,
          visible_edition: context.boards.permissions.can_view_edition_panel,
          user_permissions: {
            can_change_source: context.editor.runner.permissions.can_change_source,
            can_edit_board: context.boards.permissions.can_edit_board
          }
        },
        execution_speed: {
          active: this.SPEED_NAMES[context.editor.runner.speed - 1],
          user_permissions: {
            can_change_speed: context.editor.runner.permissions.can_change_speed
          }
        },
        attire: {
          active: context.boards.attire != null ? context.boards.attire.name : null,
          visible: context.boards.showAttire,
          user_permissions: {
            can_toggle_visibility: context.boards.permissions.can_toggle_attire_visibility
          }
        },
        blocks: context.editor.toolbox
      }, null, 2);
    }
  }, {
    key: "readContent",
    value: function readContent(context, content, fileName) {
      var metadata = JSON.parse(content);

      context.boards.finishLoadingBoards();

      // defaults
      if (!metadata.source) metadata.source = { visible: true };

      // name
      context.setProjectName(metadata.name);

      // board
      context.boards.selectedInitialState = metadata.board.active - 1;
      context.editor.runner.useRandomBoard = metadata.board.initial_board_source === this.RANDOM_SOURCE;
      context.boards.setShowCode(metadata.source.visible);

      // execution_speed
      var speed = this.SPEED_NAMES.indexOf(metadata.execution_speed.active) + 1;
      context.editor.runner.speed = speed === 0 ? 4 : speed;

      // permissions
      context.toolbar.set("permissions.can_use_library", metadata.library.visible);
      context.boards.set("permissions.can_view_edition_panel", metadata.board.visible_edition);
      context.editor.runner.set("permissions.can_change_source", metadata.board.user_permissions.can_change_source);
      context.boards.set("permissions.can_edit_board", metadata.board.user_permissions.can_edit_board);
      context.editor.runner.set("permissions.can_change_speed", metadata.execution_speed.user_permissions.can_change_speed);
      context.boards.set("permissions.can_toggle_attire_visibility", metadata.attire.user_permissions.can_toggle_visibility);

      // attire
      setTimeout(function () {
        // wait for gs-board to fire "board-changed" and update the model
        context.boards.setAttire(metadata.attire.active);
        context.boards.showAttire = metadata.attire.visible;
      }, 0);

      if (metadata.blocks) context.editor.toolbox = metadata.blocks;
    }
  }]);

  return MetadataLoader;
}(TextLoader);

;