'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeyCodeAdapter = function () {
  function KeyCodeAdapter() {
    _classCallCheck(this, KeyCodeAdapter);

    this.modifiers = ['CTRL_ALT_SHIFT_', 'ALT_SHIFT_', 'CTRL_ALT_', 'CTRL_SHIFT_', 'CTRL_', 'ALT_', 'SHIFT_'];

    this.names = {
      ARROW_LEFT: "left",
      ARROW_RIGHT: "right",
      ARROW_UP: "up",
      ARROW_DOWN: "down",
      MINUS: "-"
      /*
      NOT SUPPORTED by keymaster:
        PLUS: "+",
        ASTERISK: "*",
        SLASH: "/",
        EQUALS: "=",
        L_PARENT: "(",
        R_PARENT: ")",
        L_BRACKET: "{",
        R_BRACKET: "}",
        L_ANGLEBR: "<",
        R_ANGLEBR: ">"
      */
    };
  }

  _createClass(KeyCodeAdapter, [{
    key: 'adapt',
    value: function adapt(keyDef) {
      var modifierWithKey = keyDef.substring(2);

      var modifier = _.find(this.modifiers, function (it) {
        return _.startsWith(modifierWithKey, it);
      });

      var key = modifierWithKey.replace(modifier, '');

      return ((modifier ? modifier.replace(/_/g, "+") : "") + this._adaptKey(key)).toLowerCase();
    }
  }, {
    key: '_adaptKey',
    value: function _adaptKey(key) {
      return this.names[key] || key;
    }
  }]);

  return KeyCodeAdapter;
}();

;