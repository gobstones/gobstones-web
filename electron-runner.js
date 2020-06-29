'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Import required libraries
var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');
var freeport = require('freeport');
var path = require('path');

var _require = require('electron'),
    app = _require.app,
    BrowserWindow = _require.BrowserWindow,
    ipcMain = _require.ipcMain,
    globalShortcut = _require.globalShortcut,
    Menu = _require.Menu;

isMac = process.platform === 'darwin';

var template = [].concat(_toConsumableArray(isMac ? [{
  label: app.getName(),
  submenu: [{ role: 'about',
    label: 'Acerca de Gobstones' }, { type: 'separator' }, { role: 'hide',
    label: 'Ocultar Gobstones' }, { role: 'hideothers',
    label: 'Ocultar otros' }, { role: 'unhide',
    label: 'Mostrar Gobstones' }, { type: 'separator' }, { role: 'quit',
    label: 'Salir de Gobstones' }]
}] : [{
  label: 'Archivo',
  submenu: [{ role: 'quit',
    label: 'Salir de Gobstones' }]
}]), [
// { role: 'editMenu' }
{
  label: 'Editar',
  submenu: [{ role: 'undo',
    label: 'Deshacer' }, { role: 'redo',
    label: 'Rehacer' }, { type: 'separator' }, { role: 'cut',
    label: 'Cortar' }, { role: 'copy',
    label: 'Copiar' }, { role: 'paste',
    label: 'Pegar' }, { type: 'separator' }, { role: 'delete',
    label: 'Borrar' }, { type: 'separator' }, { role: 'selectAll',
    label: 'Seleccionar todo' }]
},
// { role: 'viewMenu' }
{
  label: 'Vista',
  submenu: [{ role: 'reload',
    label: 'Recargar' }, { role: 'forcereload',
    label: 'Forzar Recarga' }, { role: 'toggledevtools',
    label: 'Mostrar herramientas de desarrollador' }, { type: 'separator' }, { role: 'resetzoom',
    label: 'Tamaño original' }, { role: 'zoomin',
    label: 'Acercar' }, { role: 'zoomout',
    label: 'Alejar' }, { type: 'separator' }, { role: 'togglefullscreen',
    label: 'Mostrar en pantalla completa' }]
},
// { role: 'windowMenu' }
{
  label: 'Ventana',
  submenu: [{ role: 'minimize',
    label: 'Minimizar' }, { role: 'zoom',
    label: 'Acercarse' }].concat(_toConsumableArray(isMac ? [{ type: 'separator' }, { role: 'front',
    label: 'Traer al frente' }, { type: 'separator' }, { role: 'window',
    label: 'Ventana' }] : [{ role: 'close',
    label: 'Cerrar' }]))
}]);

function start(mode) {
  // The running node.js server, the main app window
  // are all global to the function
  var server = createServer();
  var mainWindow = void 0;

  // Useful functions
  function runModeSuffix(mode) {
    return mode ? '#/' + mode : '';
  }

  function runModeTitle(mode) {
    var names = {
      'code': 'Gobstones Sr.',
      'blocks': 'Gobstones Jr.',
      'teacher': 'Gobstones Teacher'
    };
    return mode ? names[mode] : 'Gobstones';
  }

  function preloadScript() {
    return path.join(appFolder(), 'electron-preload.js');
  }

  function appFolder() {
    return __dirname;
  }

  function serverAddress(port) {
    return 'http://localhost:' + port + '/' + runModeSuffix(mode);
  }

  function createServer() {
    var serve = serveStatic(appFolder(), { 'index': ['index.html'] });

    return http.createServer(function (req, res) {
      serve(req, res, finalhandler(req, res));
    });
  }

  function customPrompt() {
    var promptResponse;
    ipcMain.on('prompt', function (eventRet, arg) {
      var encodeHtmlEntity = function encodeHtmlEntity(str) {
        var buf = [];
        for (var i = str.length - 1; i >= 0; i--) {
          buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
        }
        return buf.join('');
      };
      promptResponse = null;
      var promptWindow = new BrowserWindow({
        width: 400,
        height: 200,
        show: false,
        resizable: false,
        movable: false,
        alwaysOnTop: true,
        frame: false
      });
      arg.val = arg.val || '';
      var promptHtml = '<form><label for="val">' + encodeHtmlEntity(arg.title) + '</label>\
      <input id="val" value="' + arg.val + '" autofocus />\
      <button type="submit" onclick="require(\'electron\').ipcRenderer.send(\'prompt-response\', document.getElementById(\'val\').value);window.close()">Ok</button>\
      <button type="cancel" onclick="window.close()">Cancel</button>\
      <style>body {font-family: sans-serif;} button {float:right; margin-left: 10px;} label,input {margin-bottom: 10px; width: 100%; display:block;}</style></form>';
      promptWindow.loadURL('data:text/html,' + promptHtml);
      promptWindow.show();
      promptWindow.on('closed', function () {
        eventRet.returnValue = promptResponse;
        promptWindow = null;
      });
    });
    ipcMain.on('prompt-response', function (event, arg) {
      if (arg === '') {
        arg = null;
      }
      promptResponse = arg;
    });
  }

  function createWindow(port) {
    mainWindow = new BrowserWindow({
      width: 1024,
      height: 800,
      icon: path.join(appFolder(), 'favicon.ico'),
      title: runModeTitle(mode) + " " + ('v' + app.getVersion()),
      webPreferences: {
        nodeIntegration: true,
        preload: preloadScript(),
        webSecurity: false
      }
    });
    var menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    mainWindow.loadURL(serverAddress(port));
    mainWindow.maximize();
    mainWindow.on('closed', function () {
      return mainWindow = null;
    });
    mainWindow.on('page-title-updated', function (ev) {
      return ev.preventDefault();
    });
    return mainWindow;
  }

  // Run the application
  freeport(function (err, port) {
    if (err) throw err;
    server.listen(port);
    // Configure custom prompt
    customPrompt();
    // Configure electron app default actions
    app.on('ready', function () {
      globalShortcut.register('CommandOrControl+R', function () {
        mainWindow.reload();
      });
      globalShortcut.register('CommandOrControl+Shift+R', function () {
        mainWindow.webContents.reloadIgnoringCache();
      });
      globalShortcut.register('CommandOrControl+Shift+I', function () {
        mainWindow.webContents.openDevTools();
      });
      mainWindow = createWindow(port);
    });

    app.on('window-all-closed', function () {
      globalShortcut.unregister('CommandOrControl+R');
      globalShortcut.unregister('CommandOrControl+Shift+R');
      globalShortcut.unregister('CommandOrControl+Shift+I');
      if (process.platform !== 'darwin') {
        app.quit();
      };
    });

    app.on('activate', function () {
      if (mainWindow === null) {
        mainWindow = createWindow(port);
      }
    });
  });
}

module.exports = start;
//# sourceMappingURL=electron-runner.js.map
