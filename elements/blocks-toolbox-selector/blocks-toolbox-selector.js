"use strict";

Polymer({
  is: 'blocks-toolbox-item',
  properties: {
    item: Object,
    previousState: String,
    state: {
      type: String,
      observer: "_onCheckboxChanged"
    }
  },
  listeners: {
    "child-changed": "_onChildChanged"
  },
  observers: ["onItemChanged(item.*)"],

  enabledCss: function enabledCss(_ref) {
    var item = _ref.base;

    return item.enabled ? "enabled" : "disabled";
  },

  onItemChanged: function onItemChanged() {
    this._isReading = true;
    this.state = this.item.state;
    this.fire("toolbox-changed");
    this._isReading = false;
  },

  _onCheckboxChanged: function _onCheckboxChanged() {
    if (this._isReading) return;

    if (this.state === "off") {
      this.item.setVisible(false);
      this.fire("child-changed", { item: this.item, visible: false });
    }

    if (this.state === "on") {
      this.item.setVisible(true);
      this.fire("child-changed", { item: this.item, visible: true });
    }

    if (this.state === null && !this._isEditingChild) this.state = "on";

    this.querySelectorAll("blocks-toolbox-item").forEach(function (it) {
      return it.onItemChanged();
    });
  },

  _onChildChanged: function _onChildChanged(_ref2) {
    var _ref2$detail = _ref2.detail,
        item = _ref2$detail.item,
        visible = _ref2$detail.visible;

    this._isEditingChild = true;
    var child = _.find(this.item.children, function (it) {
      return it.alias === item.alias;
    });
    if (child) child.visible = visible;
    this.onItemChanged();
    this._isEditingChild = false;
  }
});
Polymer({
  is: 'blocks-toolbox-selector',
  properties: {
    defaultToolbox: {
      type: String,
      notify: String
    },
    blocks: {
      type: Object,
      notify: true
    },
    _blocks: Array
  },
  behaviors: [Polymer.LocalizationBehavior],
  listeners: {
    "toolbox-changed": "_onBlocksUpdate"
  },
  observers: ["onBlocksChanged(blocks.*, defaultToolbox)"],

  onBlocksChanged: function onBlocksChanged(_ref3, defaultToolbox) {
    var blocks = _ref3.base;

    if (this._isEditingBlocks) return;

    var forEachBlock = function forEachBlock(array, func) {
      array.forEach(function (it) {
        func(it);
        forEachBlock(it.children, func);
      });
    };

    this._blocks = this._buildBlocks(this._getTree(), blocks);
  },


  ready: function ready() {
    this._blocks = this._buildBlocks(this._getTree());
  },

  _getTree: function _getTree() {
    var customDefaultToolbox = this.defaultToolbox;
    var hasCustomDefaultToolbox = _.trim(customDefaultToolbox) !== "";
    if (!hasCustomDefaultToolbox) return this._defaultTree();

    return Blockly.Xml.textToDom("\n          <xml id=\"toolbox\" style=\"display: none\">\n            " + customDefaultToolbox + "\n          </xml>\n        ");
  },
  _defaultTree: function _defaultTree() {
    return Blockly.Xml.textToDom("\n          <xml id=\"toolbox\" style=\"display: none\">\n            <category name=\"Comandos\">\n              <category name=\"Comandos primitivos\">\n                <block type=\"Poner\"></block>\n                <block type=\"Sacar\"></block>\n                <block type=\"Mover\"></block>\n                <block type=\"IrAlBorde\"></block>\n                <block type=\"VaciarTablero\"></block>\n                <block type=\"BOOM\"></block>\n              </category>\n              <category name=\"Procedimientos primitivos\">\n              </category>\n              <category name=\"Mis procedimientos\" custom=\"PROCEDURE_CALLS\">\n              </category>\n              <category name=\"Alternativas\">\n                <block type=\"AlternativaSimple\"></block>\n                <block type=\"AlternativaCompleta\"></block>\n              </category>\n              <category name=\"Repeticiones\">\n                <block type=\"RepeticionSimple\"></block>\n                <block type=\"RepeticionCondicional\"></block>\n                <block type=\"ForEach\"></block>\n              </category>\n              <category name=\"Asignaci\xF3n\">\n                <block type=\"Asignacion\"></block>\n              </category>\n            </category>\n            <category name=\"Expresiones\">\n              <category name=\"Literales\">\n                <block type=\"math_number\"></block>\n                <block type=\"ColorSelector\"></block>\n                <block type=\"DireccionSelector\"></block>\n                <block type=\"BoolSelector\"></block>\n                <block type=\"List\"></block>\n              </category>\n              <category name=\"Expresiones primitivas\">\n                <block type=\"hayBolitas\"></block>\n                <block type=\"puedeMover\"></block>\n                <block type=\"nroBolitas\"></block>\n              </category>\n              <category name=\"Funciones primitivas\">\n              </category>\n              <category name=\"Mis funciones\" custom=\"FUNCTION_CALLS\">\n              </category>\n              <category name=\"Operadores\">\n                <block type=\"OperadorNumerico\"></block>\n                <block type=\"OperadorDeComparacion\"></block>\n                <block type=\"OperadorLogico\"></block>\n                <block type=\"not\"></block>\n                <block type=\"OperadoresDeEnumeracion\"></block>\n              </category>\n            </category>\n            <category name=\"Definiciones\">\n              <category name=\"Programas\">\n                <block type=\"Program\"></block>\n                <block type=\"InteractiveProgram\"></block>\n              </category>\n              <category name=\"Eventos\">\n                <block type=\"InteractiveLetterBinding\"></block>\n                <block type=\"InteractiveNumberBinding\"></block>\n                <block type=\"InteractiveKeyBinding\"></block>\n              </category>\n              <category name=\"Procedimientos\">\n                <block type=\"procedures_defnoreturnnoparams\"></block>\n                <block type=\"procedures_defnoreturn\"></block>\n              </category>\n              <category name=\"Funciones\">\n                <block type=\"procedures_defreturnsimple\"></block>\n                <block type=\"procedures_defreturnsimplewithparams\"></block>\n                <block type=\"procedures_defreturn\"></block>\n              </category>\n            </category>\n            <category name=\"Auxiliares Docente\" gbs_visible=\"teacher\">\n              <block type=\"ComandoCompletar\"></block>\n              <block type=\"ExpresionCompletar\"></block>\n              <block type=\"AsociacionDeTeclaCompletar\"></block>\n            </category>\n          </xml>\n        ");
  },
  _buildBlocks: function _buildBlocks(rootNode, blocks) {
    var _this = this;

    var toArray = function toArray(arrayLike) {
      return Array.apply(null, arrayLike);
    };

    return _(toArray(rootNode.children)).map(function (node) {
      var getInfo = function getInfo(it) {
        if (!it) return null;
        var name = it.attributes[0].value;
        if (!name) return null;

        var alias = _.findKey(Blockly.GobstonesLanguage.blockIDAliases, function (it) {
          return it === name;
        });
        var finalAlias = alias || name;

        return { name: name, alias: finalAlias };
      };

      var info = getInfo(node);
      if (!info) return;

      var name = info.name,
          alias = info.alias;

      var hasVisibleBlocksList = blocks && blocks.visible && blocks.visible.length > 0;

      var item = {
        name: name,
        alias: alias,
        visible: !hasVisibleBlocksList,
        enabled: blocks ? !_.includes(blocks.disabled, alias) : true,
        children: _this._buildBlocks(node, blocks),
        isBlock: node.tagName === "block",
        setVisible: function setVisible(isVisible) {
          this.visible = isVisible;
          this.children.forEach(function (it) {
            return it.setVisible(isVisible);
          });
        },
        setEnabled: function setEnabled(isEnabled) {
          this.enabled = isEnabled;
        },
        get state() {
          var isChecked = function isChecked(it) {
            return it.visible && it.children.every(isChecked);
          };
          var hasChildren = this.children.length > 0;
          var allChildrenChecked = this.children.every(isChecked);
          var noneChildrenChecked = this.children.every(function (it) {
            return !it.visible;
          });

          return hasChildren ? allChildrenChecked ? "on" : noneChildrenChecked ? "off" : null : this.visible ? "on" : "off";
        }
      };

      var isVisible = function isVisible() {
        var currentNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : node;

        var currentNodeInfo = getInfo(currentNode);
        if (!currentNodeInfo) return false;

        return _.includes(blocks.visible, currentNodeInfo.alias) || isVisible(currentNode.parentElement);
      };
      if (hasVisibleBlocksList && isVisible()) item.setVisible(true);

      return item;
    }).compact().value();
  },
  _onBlocksUpdate: function _onBlocksUpdate() {
    var _this2 = this;

    if (!this.__onBlocksUpdate) this.__onBlocksUpdate = _.debounce(function () {
      _this2._isEditingBlocks = true;
      _this2.blocks = {
        visible: _this2._getVisibleBlocks(_this2._blocks),
        disabled: _this2._getDisabledBlocks(_this2._blocks),
        defaultToolbox: _.trim(_this2.defaultToolbox) !== "" ? _this2.defaultToolbox : undefined
      };
      _this2._isEditingBlocks = false;
    }, 100);

    this.__onBlocksUpdate();
  },
  _getVisibleBlocks: function _getVisibleBlocks(array) {
    var _this3 = this;

    return _(array).reject({ state: "off" }).flatMap(function (it) {
      return it.state === "on" ? it.alias : _this3._getVisibleBlocks(it.children);
    }).value();
  },
  _getDisabledBlocks: function _getDisabledBlocks(array) {
    var _this4 = this;

    return _(array).flatMap(function (it) {
      return it.children.length > 0 ? _this4._getDisabledBlocks(it.children) : it.enabled ? null : it.alias;
    }).compact().value();
  }
});