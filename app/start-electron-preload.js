window.GBS_DESKTOP = true;

window.GBS_REQUIRE = require;
window.GBS_DIRNAME = __dirname;

const ipcRenderer = require("electron").ipcRenderer;
window.prompt = function(title, val) {
  return ipcRenderer.sendSync("prompt", { title, val });
};