'use strict';

// start server

var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');
var freeport = require('freeport');

var serve = serveStatic('.', { 'index': ['index.html'] });

var server = http.createServer(function (req, res) {
  serve(req, res, finalhandler(req, res));
});

freeport(function (err, port) {
  if (err) throw err;
  server.listen(port);

  // start electron

  var electron = require('electron');
  var app = electron.app;
  var BrowserWindow = electron.BrowserWindow;

  var mainWindow = void 0;

  function createWindow() {
    mainWindow = new BrowserWindow({ width: 1024, height: 800 });
    mainWindow.loadURL('http://localhost:' + port);
    mainWindow.on('closed', function () {
      return mainWindow = null;
    });
  }

  app.on('ready', createWindow);

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', function () {
    if (mainWindow === null) createWindow();
  });
});
//# sourceMappingURL=start-electron.js.map
