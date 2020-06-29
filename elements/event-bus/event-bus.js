'use strict';

Polymer({
  is: 'event-bus',

  ready: function ready() {
    var _this = this;

    if (window.BUS) {
      var eventsToListen = window.BUS.eventsToListen || [];

      eventsToListen.forEach(function (event) {
        return _this.addEventListener(event.name, event.handler);
      });
    }

    window.BUS = this;
  }
});