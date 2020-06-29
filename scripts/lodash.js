"use strict";

String.prototype.getPath = function () {
  return this.substring(0, this.lastIndexOf("/") + 1);
};

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};