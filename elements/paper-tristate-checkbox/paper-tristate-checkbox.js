'use strict';

Polymer({
  is: 'paper-tristate-checkbox',

  listeners: {
    'tap': '_regularTap'
  },

  behaviors: [Polymer.IronFormElementBehavior, Polymer.IronValidatableBehavior, Polymer.PaperInkyFocusBehavior],

  hostAttributes: {
    role: 'checkbox',
    'aria-checked': 'mixed',
    tabindex: 0
  },

  properties: {
    /**
     * Fired when the checked state changes due to user interaction.
     *
     * @event change
     */

    /**
     * Fired when the checked state changes.
     *
     * @event iron-change
     */
    ariaActiveAttribute: {
      type: String,
      value: 'aria-checked'
    },

    /**
     * There are three possible states: `'on'`, `'off'`, and `null`.
     */
    state: {
      type: String,
      value: null,
      reflectToAttribute: true,
      notify: true
    },

    /**
     * The element's value when `'on'`/checked.
     */
    checked: {
      type: String,
      value: "x"
    },

    /**
     * The element's value when `'off'`/unchecked.
     */
    unchecked: {
      type: String,
      value: " "
    },

    /**
     * The element's value when `null`/indeterminate.
     */
    indeterminate: {
      type: String,
      value: ""
    },

    /**
     * The element's value based on its current state.
     */
    value: {
      type: String,
      computed: '_computeValue(state)'
    }
  },

  /**
   * Creates this element in JavaScript.
   *
   * @param {String} label The element's label.
   * @param {String} state The element's state. Allowable values are
   * `'on'`/checked, `'off'`/unchecked, and `null`/indeterminate. All
   * other values are treated as `null`.
   */
  factoryImpl: function factoryImpl(label, state) {
    this.$.checkboxLabel.innerHTML = label;
    if (state == 'on' || state == 'off') {
      this.state = state;
    } else {
      state = null;
    }
  },

  // Computed methods.

  _computeValue: function _computeValue(state) {
    if (state == 'on') {
      this.setAttribute(this.ariaActiveAttribute, 'true');
      return this.checked;
    } else if (state == 'off') {
      this.setAttribute(this.ariaActiveAttribute, 'false');
      return this.unchecked;
    } else {
      this.setAttribute(this.ariaActiveAttribute, 'mixed');
      // indeterminate can become undefined, so force empty string
      return this.indeterminate ? this.indeterminate : "";
    }
  },

  // Element Behavior

  // Rotate through the state values.
  _regularTap: function _regularTap() {
    if (this.state == null) {
      this.state = 'on';
    } else if (this.state == 'on') {
      this.state = 'off';
    } else {
      this.state = null;
    }
  },

  _computeCheckboxClass: function _computeCheckboxClass(state) {
    if (state == 'on' || state == null) {
      return 'checked';
    } else {
      return '';
    }
  },

  _computeCheckmarkClass: function _computeCheckmarkClass(state) {
    if (state == 'off' || state == null) {
      return 'hidden';
    } else {
      return '';
    }
  },

  _computeIndeterminatemarkClass: function _computeIndeterminatemarkClass(state) {
    if (state == 'off' || state == 'on') {
      return 'hidden';
    } else {
      return '';
    }
  },

  // create ripple inside the checkboxContainer
  _createRipple: function _createRipple() {
    this._rippleContainer = this.$.checkboxContainer;
    return Polymer.PaperInkyFocusBehaviorImpl._createRipple.call(this);
  }

});