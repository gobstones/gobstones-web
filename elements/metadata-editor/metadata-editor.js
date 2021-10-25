"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

Polymer({
  is: 'metadata-editor',
  properties: {
    metadata: {
      type: Object,
      value: {}
    },
    defaultToolbox: String,
    advancedMode: {
      type: Boolean,
      value: false
    },
    editionModeName: {
      type: String,
      computed: "_computeEditionModeName(advancedMode)"
    },
    allToolboxes: {
      type: Array,
      value: _.values(Toolboxes)
    },
    allTools: {
      type: Array,
      value: [].concat(_toConsumableArray(PrimitiveTools.features), _toConsumableArray(Toolboxes.free.features), _toConsumableArray(ExecutionTypes.interactive.features))
    },
    selectedToolboxIndex: {
      type: Number,
      value: 0
    },
    selectedToolbox: {
      type: Object,
      computed: "_computeSelectedItem(allToolboxes, selectedToolboxIndex)"
    },
    allActivityTypes: {
      type: Array,
      value: _.values(ActivityTypes)
    },
    selectedActivityTypeIndex: {
      type: Number,
      value: 0
    },
    selectedActivityType: {
      type: Object,
      computed: "_computeSelectedItem(allActivityTypes, selectedActivityTypeIndex)"
    },
    previewChanges: {
      type: Boolean,
      value: false
    },
    changesFromAdvancedMode: {
      type: Boolean,
      value: false
    },
    advancedSyncPending: {
      type: Boolean,
      value: false
    },
    boardEditionOptionsDisabled: {
      type: Boolean,
      value: false
    },
    attireSectionDisabled: {
      type: Boolean,
      value: false
    },
    executionType: {
      type: Object,
      value: ExecutionTypes.sequential
    },
    constructionMode: {
      type: Object,
      value: ConstructionModes.blocks
    }
  },
  /* @faloi:
  Agregué este listener para que el blocks-toolbox-selector avise cuando cambian los
  bloques seleccionados.
  Ver https://polymer-library.polymer-project.org/1.0/docs/devguide/events#event-listeners
  */
  listeners: {
    'teacher-selected-blocks-changed': '_onSelectedBlocksChanged'
  },
  behaviors: [Polymer.BusListenerBehavior, Polymer.PermissionsBehavior, Polymer.LocalizationBehavior, Polymer.LoaderBehavior],
  observers: ["_onMetadataChanged(metadata.*)", "_onBasicSettingsChanged(selectedActivityType, selectedToolbox, executionType)"],

  ready: function ready() {
    this.set("metadata", this._defaultMetadata());

    this.stylist = new Stylist();
    this.stylist.setUpMetadataEditorCustomizations();

    this.subscribeTo('teacher-preview-configuration-changed', this._onPreviewChangesChanged.bind(this));

    // Hack para que inicialice
    this._resetBasicMode();
  },

  getMetadata: function getMetadata() {
    return this.metadata;
  },

  setMetadata: function setMetadata(config) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$fromLoader = _ref.fromLoader,
        fromLoader = _ref$fromLoader === undefined ? false : _ref$fromLoader;

    this.set("metadata", config);

    if (fromLoader) {
      this._selectEditionMode(config);
    }
  },

  setInitialSettings: function setInitialSettings(_ref2) {
    var constructionMode = _ref2.constructionMode,
        executionType = _ref2.executionType;

    this._appendMetadata({
      activity: {
        construction_mode: constructionMode.id,
        execution_type: executionType.id
      }
    });

    this.executionType = executionType;
    this.constructionMode = constructionMode;
  },


  reset: function reset() {
    this.setMetadata(this._defaultMetadata());
    this.defaultToolbox = "";
  },

  _appendMetadata: function _appendMetadata(data) {
    this.setMetadata(_.merge({}, this.metadata, data));
  },
  _selectEditionMode: function _selectEditionMode(_ref3) {
    var activity = _ref3.activity;

    // Retrocompatibilidad: si no está activity es porque se creó en modo avanzado
    if (_.get(activity, 'creation_mode') === 'basic') {
      this.advancedMode = false;
      this.selectedActivityTypeIndex = _.findIndex(this.allActivityTypes, { name: activity.type });
      this.selectedToolboxIndex = _.findIndex(this.allToolboxes, { name: activity.toolbox });
    } else {
      this.advancedMode = true;
      // Fuerza a que aparezca el cartel "tenés que descartar cambios"
      this.changesFromAdvancedMode = true;
      this._forceToolboxSelectorRefresh();
    }
  },


  _computeEditionModeName: function _computeEditionModeName(advancedMode) {
    return advancedMode ? 'avanzado' : 'básico';
  },

  _goToAdvancedMode: function _goToAdvancedMode() {
    this.advancedMode = true;
  },

  _resetBasicMode: function _resetBasicMode() {
    this._onBasicSettingsChanged(this.selectedActivityType, this.selectedToolbox, this.executionType);
  },

  _isToolSelected: function _isToolSelected(selectedToolbox, selectedActivityType, executionType, tool) {
    return selectedToolbox.features.concat(selectedActivityType.features).concat(executionType.features).includes(tool);
  },

  _computeSelectedItem: function _computeSelectedItem(list, index) {
    return list[index];
  },

  // @faloi: no se puede poner un || en el binding, por eso creé esta función
  _either: function _either(x, y) {
    return x || y;
  },

  _discardAdvancedModeChanges: function _discardAdvancedModeChanges() {
    this.changesFromAdvancedMode = false;
    this.reset();
    this._resetBasicMode();
  },

  _onBasicSettingsChanged: function _onBasicSettingsChanged(selectedActivityType, selectedToolbox, executionType) {
    this._changeBlocks({
      visible: selectedToolbox.blocks.concat(selectedActivityType.blocks).concat(executionType.blocks)
    });

    this.setMetadata(_.merge({}, this.metadata, selectedActivityType.settings, {
      activity: {
        type: selectedActivityType.name,
        toolbox: selectedToolbox.name,
        creation_mode: 'basic'
      }
    }));
  },

  _notifyBasicChangesToToolboxSelector: function _notifyBasicChangesToToolboxSelector() {
    /* @faloi:
    Esto es TREMENDO hack para que le avise al blocks-selector que hubo cambios.
    Lo hice así porque no se avivaba de los cambios, y el setTimeout está porque recién se suscribe
    al evento cuando se attachea el componente...
    */
    if (this.advancedMode && !this.changesFromAdvancedMode) {
      this._forceToolboxSelectorRefresh();
    }
  },
  _forceToolboxSelectorRefresh: function _forceToolboxSelectorRefresh() {
    var _this = this;

    setTimeout(function () {
      window.BUS.fire('teacher-toolbox-changed', _this.metadata.blocks);
      _this.advancedSyncPending = true;
    }, 0);
  },


  _onBoardVisibleEditionChanged: function _onBoardVisibleEditionChanged() {
    var boardVisibleEdition = this.metadata.board.visible_edition;
    this.boardEditionOptionsDisabled = !boardVisibleEdition;
    this.setMetadata(_.merge({}, this.metadata, {
      board: {
        collapse_toolbox: false,
        user_permissions: {
          can_change_initial_board: boardVisibleEdition,
          can_view_size_section: boardVisibleEdition,
          can_view_attire_section: boardVisibleEdition,
          can_toggle_visibility: boardVisibleEdition
        }
      },
      attire: {
        user_permissions: {
          can_toggle_visibility: boardVisibleEdition
        }
      }
    }));
  },

  _onAttireSectionVisibleChanged: function _onAttireSectionVisibleChanged() {
    var attireSectionVisible = this.metadata.board.user_permissions.can_view_attire_section;
    this.attireSectionDisabled = !attireSectionVisible;
    this.setMetadata(_.merge({}, this.metadata, {
      attire: {
        user_permissions: {
          can_toggle_visibility: attireSectionVisible
        }
      }
    }));
  },

  _onSelectedBlocksChanged: function _onSelectedBlocksChanged(_ref4) {
    var newBlocks = _ref4.detail;

    this._notifyAdvancedModeChanges();
    this._changeBlocks(newBlocks);
  },

  _changeBlocks: function _changeBlocks(blocks) {
    this.metadata.blocks = blocks;
    this._refreshPreviewIfEnabled(this.metadata);
  },

  _notifyAdvancedModeChanges: function _notifyAdvancedModeChanges() {
    if (this.advancedSyncPending) {
      this.advancedSyncPending = false;
    } else if (this.advancedMode && !this.changesFromAdvancedMode) {
      this.changesFromAdvancedMode = true;
      this.setMetadata(_.assign({}, this.metadata, {
        activity: {
          creation_mode: 'advanced'
        }
      }));
    }
  },

  _onMetadataChanged: function _onMetadataChanged(_ref5) {
    var base = _ref5.base;

    this._notifyAdvancedModeChanges();
    this.defaultToolbox = base.blocks && base.blocks.defaultToolbox;
    this.notifyPath('metadata.blocks');
    this._refreshPreviewIfEnabled(base);
  },

  _refreshPreviewIfEnabled: function _refreshPreviewIfEnabled(metadata) {
    if (this.previewChanges) {
      this._previewChanges(metadata);
    }
  },
  _onPreviewChangesChanged: function _onPreviewChangesChanged(previewChanges) {
    try {
      /* @faloi:
      Es redundante mantener este estado local,
      pero no sé cómo manejar estado global sin pasearlo por todos los componentes.
      */
      this.previewChanges = previewChanges;
      if (previewChanges) this._previewChanges(this.metadata);else this._resetPreview();
    } catch (e) {
      // Quién sabe para qué es este catch
    }
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
        visible: false
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