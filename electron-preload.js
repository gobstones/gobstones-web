"use strict";

window.GBS_DESKTOP = true;
window.GBS_REQUIRE = require;

var ipcRenderer = require("electron").ipcRenderer;
window.prompt = function (title, val) {
  return ipcRenderer.sendSync("prompt", { title: title, val: val });
};
//# sourceMappingURL=electron-preload.js.map
