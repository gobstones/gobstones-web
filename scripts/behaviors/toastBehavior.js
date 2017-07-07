"use strict";

Polymer.ToastBehavior = {
  showToast: function showToast(message) {
    this.$.toast.text = message;
    this.$.toast.opened = true;
    this.$.toast.center();
  }
};