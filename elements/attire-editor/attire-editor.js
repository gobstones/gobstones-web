"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Polymer({
  is: 'attire-editor',
  properties: {
    attire: {
      type: Object,
      value: null
    }
  },
  behaviors: [Polymer.BusListenerBehavior, Polymer.PermissionsBehavior, Polymer.LocalizationBehavior, Polymer.LoaderBehavior],

  attached: function attached() {
    this.tooltipAnimation = {
      "entry": [{ "name": "fade-in-animation", "timing": { "delay": 0 } }],
      "exit": [{ "name": "fade-out-animation", "timing": { "delay": 0 } }]
    };
  },

  ready: function ready() {
    var _this = this;

    this.subscribeTo("selected-attire", function (attire) {
      if (_this.attire && _.isEqual(_.omit(attire, 'enabled'), _.omit(_this._sanitizeAttire(_this.attire), 'enabled'))) return;

      if (_.isEqual(attire, {})) attire = null;
      _this.attire = attire;
    });
  },

  addAttire: function addAttire() {
    var name = this._getUniqueName();
    if (!name) return;

    this._boards().addOrSetAttire({
      name: name,
      enabled: false,
      rules: []
    });
    this.addRule();
    this._boards().showAttire = true;
  },

  removeAttire: function removeAttire() {
    this._boards().removeCurrentAttire();
  },

  renameAttire: function renameAttire() {
    var name = this._getUniqueName();
    if (!name) return;

    this.set("attire.name", name);
    this._update();
  },

  addRule: function addRule() {
    this.push("attire.rules", {
      when: {
        red: "0",
        green: "0",
        blue: "0",
        black: "0"
      },
      image: null,
      text: ""
    });
    this._update();
  },

  removeRule: function removeRule(e) {
    if (!confirm(this.localize("attire-editor-tooltip-remove-rule-confirm"))) {
      return;
    }

    var index = e.model.index;
    this.set("attire.rules", this.attire.rules.filter(function (it, i) {
      return i !== index;
    }));
    this._update();
  },

  downRule: function downRule(e) {
    var index = e.model.index;
    if (index === this.attire.rules.length - 1) return;
    this._moveRule(index, index + 1);
  },

  upRule: function upRule(e) {
    var index = e.model.index;
    if (index === 0) return;
    this._moveRule(index, index - 1);
  },

  loadImage: function loadImage(e) {
    this.currentRule = e.model.item;
    $(this.$.image).click();
  },

  onLoadedImage: function onLoadedImage(event) {
    var _this2 = this;

    var file = _.first(event.target.files);

    var fileReader = new FileReader();
    fileReader.onload = function (event) {
      var base64 = event.target.result;

      var rules = _this2.attire.rules;
      _this2.set("attire.rules", []);
      _this2.async(function () {
        _this2.currentRule.fileName = file.name;
        _this2.currentRule.image = base64;
        _this2.set("attire.rules", rules);
        _this2._update();
      });
    };
    fileReader.readAsDataURL(file);

    event.target.value = null;
  },

  _getUniqueName: function _getUniqueName() {
    var _this3 = this;

    var name = null;
    var withExistsWarning = false;

    var _loop = function _loop() {
      var input = prompt(_this3.localize("attire-editor-add-new-attires-message") + (withExistsWarning ? _this3.localize("an-available-name") : ""));
      if (!input) return {
          v: void 0
        };

      var exists = _this3._boards().availableAttires.some(function (it) {
        return it.name === input;
      });

      if (!exists) name = input;else withExistsWarning = true;
    };

    while (!name) {
      var _ret = _loop();

      if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
    }

    return name.slice(0, 25);
  },

  _update: function _update() {
    this._boards().updateCurrentAttire(this._sanitizeAttire(this.attire));
  },

  _moveRule: function _moveRule(oldIndex, newIndex) {
    var _this4 = this;

    var rules = arrayMove(this.attire.rules, oldIndex, newIndex);
    this.set("attire.rules", []);
    this.async(function () {
      _this4.set("attire.rules", rules);
    });
  },

  _sanitizeAttire: function _sanitizeAttire() {
    var _this5 = this;

    var attire = _.cloneDeep(this.attire);
    attire.rules = attire.rules.filter(function (it) {
      return _this5._isValid(it.when.red) && _this5._isValid(it.when.green) && _this5._isValid(it.when.blue) && _this5._isValid(it.when.black) && (it.image !== null || it.text);
    }).map(function (it) {
      it.when.red = _this5._sanitizeValue(it.when.red);
      it.when.green = _this5._sanitizeValue(it.when.green);
      it.when.blue = _this5._sanitizeValue(it.when.blue);
      it.when.black = _this5._sanitizeValue(it.when.black);
      if (it.text === "") it.text = null;
      console.warn(JSON.stringify(attire, null, 2));

      return it;
    });

    return attire;
  },

  _sanitizeValue: function _sanitizeValue(v) {
    if (v === "*" || v === "+") return v;
    return parseInt(v);
  },

  _isValid: function _isValid(v) {
    return _.isFinite(parseInt(v)) || v === "*" || v === "+";
  },

  _boards: function _boards() {
    return this._context().boards;
  }
});