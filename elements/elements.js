"use strict";

var Bus = function Bus() {
  this.eventsToListen = [];
};

Bus.prototype.addEventListener = function (name, handler) {
  this.eventsToListen.push({ name: name, handler: handler });
};

window.BUS = new Bus();