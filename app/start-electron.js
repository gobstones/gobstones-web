// start server

const args = require('args');
const finalhandler = require('finalhandler');
const http = require('http');
const serveStatic = require('serve-static');
const freeport = require('freeport');
const path = require('path');
const {app, BrowserWindow, ipcMain} = require('electron');

// Server and Window are global objects
const server = createServer();
let mainWindow;

args
  .option('blocks', 'Start the program in block mode only', false)
  .option('code', 'Start the program in code mode only', false)
  .option('teacher', 'Start the program in teacher mode only', false)
  .example(
    'start-electron.js',
    'Run the application allowing the user to choose how to start the app, blocks, code, or teacher mode'
  )
  .example(
    'start-electron.js --code',
    'Run the application as senior, only code mode'
  )

// const flags = args.parse(process.argv)
const flags = {
  blocks: false,
  code: false,
  teacher: false
}
function runModeSuffix() {
  return flags.blocks ? '#/blocks' : (flags.code ? '#/code' : (flags.teacher ? '#/teacher' : ''))
}

function runModeTitle() {
  return flags.blocks ? 'Gobstones Jr' : (flags.code ? 'Gobstones Sr' : (flags.teacher ? 'Gobstones Teacher' : 'Gobstones'))
}

function preloadScript() {
  return path.join(appFolder(), 'start-electron-preload.js');
}

function appFolder() {
  return __dirname;
}

function serverAddress(port) {
  return `http://localhost:${port}/` + runModeSuffix();
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
  let mainWindow = new BrowserWindow({
    width: 1024,
    height: 800,
    icon: path.join(appFolder(), 'favicon.ico'),
    title: runModeTitle(),
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
}

// Run the application
freeport((err, port) => {
  if (err) throw err;
  server.listen(port);
  // Configure custom prompt
  customPrompt()
  // Configure electron app default actions
  app.on('ready', () => {
    mainWindow = createWindow(port)
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    if (mainWindow === null) { mainWindow = createWindow(port); }
  });
})
