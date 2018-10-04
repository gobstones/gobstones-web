// Import required libraries
const finalhandler = require('finalhandler');
const http = require('http');
const serveStatic = require('serve-static');
const freeport = require('freeport');
const path = require('path');
const {app, BrowserWindow, ipcMain, globalShortcut} = require('electron');


function start(mode) {
  // The running node.js server, the main app window
  // are all global to the function
  const server = createServer();
  let mainWindow;

  // Useful functions
  function runModeSuffix(mode) {
    return mode ? ('#/' + mode) : ''
  }

  function runModeTitle(mode) {
    const names = {
      'code': 'Gobstones Sr.',
      'blocks': 'Gobstones Jr.',
      'teacher': 'Gobstones Teacher',
    }
    return mode ? names[mode] :'Gobstones'
  }

  function preloadScript() {
    return path.join(appFolder(), 'electron-preload.js');
  }

  function appFolder() {
    return __dirname;
  }

  function serverAddress(port) {
    return `http://localhost:${port}/` + runModeSuffix(mode);
  }

  function createServer() {
    const serve = serveStatic(appFolder(), { 'index': ['index.html'] });

    return http.createServer((req, res) => {
      serve(req, res, finalhandler(req, res));
    });
  }

  function customPrompt() {
    var promptResponse;
    ipcMain.on('prompt', function(eventRet, arg) {
      var encodeHtmlEntity = function(str) {
        var buf = [];
        for (var i=str.length-1;i>=0;i--) {
          buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
        }
        return buf.join('');
      };
      promptResponse = null
      var promptWindow = new BrowserWindow({
        width: 400,
        height: 200,
        show: false,
        resizable: false,
        movable: false,
        alwaysOnTop: true,
        frame: false
      })
      arg.val = arg.val || ''
      const promptHtml = '<form><label for="val">' + encodeHtmlEntity(arg.title) + '</label>\
      <input id="val" value="' + arg.val + '" autofocus />\
      <button type="submit" onclick="require(\'electron\').ipcRenderer.send(\'prompt-response\', document.getElementById(\'val\').value);window.close()">Ok</button>\
      <button type="cancel" onclick="window.close()">Cancel</button>\
      <style>body {font-family: sans-serif;} button {float:right; margin-left: 10px;} label,input {margin-bottom: 10px; width: 100%; display:block;}</style></form>'
      promptWindow.loadURL('data:text/html,' + promptHtml)
      promptWindow.show()
      promptWindow.on('closed', function() {
        eventRet.returnValue = promptResponse
        promptWindow = null
      })
    })
    ipcMain.on('prompt-response', function(event, arg) {
      if (arg === ''){ arg = null }
      promptResponse = arg
    })
  }

  function createWindow(port) {
    mainWindow = new BrowserWindow({
      width: 1024,
      height: 800,
      icon: path.join(appFolder(), 'favicon.ico'),
      title: runModeTitle(mode),
      webPreferences: {
        nodeIntegration: true,
        preload: preloadScript(),
        webSecurity: false
      }
    });
    mainWindow.loadURL(serverAddress(port));
    mainWindow.maximize();
    mainWindow.on('closed', () => mainWindow = null);
    mainWindow.on('page-title-updated', (ev) => ev.preventDefault());
    return mainWindow;
  }

  // Run the application
  freeport((err, port) => {
    if (err) throw err;
    server.listen(port);
    // Configure custom prompt
    customPrompt()
    // Configure electron app default actions
    app.on('ready', () => {
      globalShortcut.register('CommandOrControl+R', () => {
        mainWindow.reload();
      });
      globalShortcut.register('CommandOrControl+Shift+R', () => {
        mainWindow.webContents.reloadIgnoringCache();
      });
      globalShortcut.register('CommandOrControl+Shift+I', () => {
        mainWindow.webContents.openDevTools();
      });
      mainWindow = createWindow(port)
    });

    app.on('window-all-closed', () => {
      globalShortcut.unregister('CommandOrControl+R');
      globalShortcut.unregister('CommandOrControl+Shift+R');
      globalShortcut.unregister('CommandOrControl+Shift+I');
      if (process.platform !== 'darwin') {
        app.quit()
      };
    });

    app.on('activate', () => {
      if (mainWindow === null) { mainWindow = createWindow(port); }
    });
  })
}

module.exports = start
