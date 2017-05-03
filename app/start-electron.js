// start server

const finalhandler = require('finalhandler');
const http = require('http');
const serveStatic = require('serve-static');
const freeport = require('freeport');

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

  let mainWindow;

  function createWindow() {
    mainWindow = new BrowserWindow({width: 800, height: 600});
    mainWindow.loadURL(`http://localhost:${port}`);
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

