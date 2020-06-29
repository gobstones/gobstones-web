"use strict";

Polymer({
  is: 'metadata-editor',
  properties: {
    metadata: {
      type: Object,
      value: {}
    },
    defaultToolbox: String,
    cover: {
      type: String,
      value: null
    },
    previewChanges: {
      type: Boolean,
      value: false
    }
  },
  behaviors: [Polymer.BusListenerBehavior, Polymer.PermissionsBehavior, Polymer.LocalizationBehavior, Polymer.LoaderBehavior],
  observers: ["_onMetadataChanged(metadata.*)", "_onPreviewChangesChanged(previewChanges)"],

  ready: function ready() {
    this.set("metadata", this._defaultMetadata());

    this.stylist = new Stylist();
    this.stylist.setUpMetadataEditorCustomizations();
  },

  getMetadata: function getMetadata() {
    return this.metadata;
  },

  setMetadata: function setMetadata(config) {
    this.set("metadata", config);
  },

  reset: function reset() {
    this.setMetadata(this._defaultMetadata());
    this.defaultToolbox = "";
    this.previewChanges = false;
    this.cover = null;
  },

  grayedUnless: function grayedUnless(_ref, property) {
    var base = _ref.base;

    return !_.get(base, property) ? "gray" : "";
  },

  loadImage: function loadImage(e) {
    $(this.$.image).click();
  },

  onLoadedImage: function onLoadedImage(event) {
    var _this = this;

    var file = _.first(event.target.files);

    var fileReader = new FileReader();
    fileReader.onload = function (event) {
      var base64 = event.target.result;
      _this.set("cover", base64);
    };
    fileReader.readAsDataURL(file);

    event.target.value = null;
  },

  _onMetadataChanged: function _onMetadataChanged(_ref2) {
    var base = _ref2.base;

    var FIELDS_OF_EDITION_SECTION = ["board.collapse_toolbox", "board.user_permissions.can_change_initial_board", "board.user_permissions.can_view_size_section", "board.user_permissions.can_view_attire_section", "board.user_permissions.can_toggle_visibility", "attire.user_permissions.can_toggle_visibility"];
    var FIELDS_OF_ATTIRE_SECTION = ["attire.user_permissions.can_toggle_visibility"];

    var editionFieldsOn = FIELDS_OF_EDITION_SECTION.some(function (it) {
      return _.get(base, it);
    });
    var attireFieldsOn = FIELDS_OF_ATTIRE_SECTION.some(function (it) {
      return _.get(base, it);
    });

    this.defaultToolbox = base.blocks && base.blocks.defaultToolbox;

    try {
      if (!base.board.visible_edition && editionFieldsOn) {
        this.setMetadata(_.merge({}, this.metadata, {
          board: {
            collapse_toolbox: false,
            user_permissions: {
              can_change_initial_board: false,
              can_view_size_section: false,
              can_view_attire_section: false,
              can_toggle_visibility: false
            }
          },
          attire: {
            user_permissions: {
              can_toggle_visibility: false
            }
          }
        }));
      }

      if (!base.board.user_permissions.can_view_attire_section && attireFieldsOn) {
        this.setMetadata(_.merge({}, this.metadata, {
          attire: {
            user_permissions: {
              can_toggle_visibility: false
            }
          }
        }));
      }

      if (this.previewChanges) this._previewChanges(base);
    } catch (e) {}
  },

  _onPreviewChangesChanged: function _onPreviewChangesChanged(previewChanges) {
    try {
      if (previewChanges) this._previewChanges(this.metadata);else this._resetPreview();
    } catch (e) {}
  },
  _previewChanges: function _previewChanges(metadata) {
    new MetadataLoader().readSecondaryOptions(this._context(), metadata);
  },
  _resetPreview: function _resetPreview() {
    new MetadataLoader().resetSecondaryOptions(this._context());
  },
  _defaultMetadata: function _defaultMetadata() {
    return {
      library: {
        visible: true
      },
      source: {
        visible: true,
        percentage: 0.6
      },
      board: {
        visible_edition: true,
        collapse_toolbox: false,
        user_permissions: {
          can_change_initial_board: true,
          can_change_initial_board_source: true,
          can_edit_board: true,
          can_view_size_section: true,
          can_view_attire_section: true
        }
      },
      execution_speed: {
        user_permissions: {
          can_change_speed: true
        }
      },
      attire: {
        user_permissions: {
          can_toggle_visibility: true
        }
      },
      initialDescription: true,
      link: "",
      blocks: {
        visible: [],
        disabled: []
      }
    };
  }
});