window.GBS_DESKTOP = true;
window.GBS_REQUIRE = require;

const ipcRenderer = require("electron").ipcRenderer;
window.prompt = function(title, val) {
  return ipcRenderer.sendSync("prompt", { title, val });
};
