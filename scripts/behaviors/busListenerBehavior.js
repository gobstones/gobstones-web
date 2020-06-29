"use strict";

Polymer.BusListenerBehavior = {
  subscribeTo: function subscribeTo(eventName, eventHandler) {
    var handler = function handler(event) {
      return eventHandler(event.detail);
    };
    this.async(function () {
      window.BUS.addEventListener(eventName, handler);
    });
    return this;
  }
};