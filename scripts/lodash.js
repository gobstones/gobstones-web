"use strict";

String.prototype.getPath = function () {
    return this.substring(0, this.lastIndexOf("/") + 1);
};