// start server

const finalhandler = require('finalhandler');
const http = require('http');
const serveStatic = require('serve-static');
const freeport = require('freeport');
const path = require('path');

const serve = serveStatic('.', { 'index': ['index.html'] });

const server = http.createServer((req, res) => {
  serve(req, res, finalhandler(req, res));
});

freeport((err, port) => {
  if (err) throw err;
  server.listen(port);

  // start electron

  const electron = require('electron');
  const app = electron.app;
  const BrowserWindow = electron.BrowserWindow;

  // <CUSTOM prompt()>
  var ipcMain = electron.ipcMain;
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
      width: 300,
      height: 100,
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
  // </CUSTOM prompt()>

  let mainWindow;

  function createWindow() {
    mainWindow = new BrowserWindow({
      width: 1024,
      height: 800,
      icon: path.join(__dirname, 'favicon.ico'),
      webPreferences: {
        nodeIntegration: true,
        preload: __dirname + "/start-electron-preload.js",
        webSecurity: false
      }
    });
    mainWindow.loadURL(`http://localhost:${port}`);
    mainWindow.maximize();
    mainWindow.on('closed', () => mainWindow = null);
  }

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    if (mainWindow === null) createWindow();
  });
})

