// Import required libraries
const finalhandler = require('finalhandler');
const http = require('http');
const serveStatic = require('serve-static');
const freeport = require('freeport');
const path = require('path');
const {app, BrowserWindow, ipcMain, globalShortcut, Menu} = require('electron');

  isMac = process.platform === 'darwin';

  const template = [
   // { role: 'appMenu' }
   ...(isMac ? [{
     label: app.getName(),
     submenu: [
       { role: 'about',
         label: 'Acerca de Gobstones' },
       { type: 'separator' },
       { role: 'hide',
         label: 'Ocultar Gobstones' },
       { role: 'hideothers',
         label: 'Ocultar otros' },
       { role: 'unhide',
         label: 'Mostrar Gobstones' },
       { type: 'separator' },
       { role: 'quit',
         label: 'Salir de Gobstones'}
     ]
   }] : [
     {
       label: 'Archivo',
       submenu: [
         { role: 'quit',
           label: 'Salir de Gobstones' }
       ]
     }
   ])
   ,
   // { role: 'editMenu' }
   {
     label: 'Editar',
     submenu: [
       { role: 'undo',
         label: 'Deshacer' },
       { role: 'redo',
         label: 'Rehacer' },
       { type: 'separator' },
       { role: 'cut',
         label: 'Cortar' },
       { role: 'copy',
         label: 'Copiar' },
       { role: 'paste',
         label: 'Pegar' },
       { type: 'separator' },
       { role: 'delete',
         label: 'Borrar' },
       { type: 'separator' },
       { role: 'selectAll',
         label: 'Seleccionar todo'}
     ]
   },
   // { role: 'viewMenu' }
   {
     label: 'Vista',
     submenu: [
       { role: 'reload',
         label: 'Recargar'},
       { role: 'forcereload',
         label: 'Forzar Recarga'},
       { role: 'toggledevtools',
         label: 'Mostrar herramientas de desarrollador'},
       { type: 'separator' },
       { role: 'resetzoom',
         label: 'Tamaño original'},
       { role: 'zoomin',
         label: 'Acercar'},
       { role: 'zoomout',
         label: 'Alejar'},
       { type: 'separator' },
       { role: 'togglefullscreen',
         label: 'Mostrar en pantalla completa'}
     ]
   },
   // { role: 'windowMenu' }
   {
     label: 'Ventana',
     submenu: [
       { role: 'minimize',
         label: 'Minimizar' },
       { role: 'zoom',
         label: 'Acercarse'},
       ...(isMac ? [
         { type: 'separator' },
         { role: 'front',
           label: 'Traer al frente' },
         { type: 'separator' },
         { role: 'window',
           label: 'Ventana'}
       ] : [
         { role: 'close',
           label: 'Cerrar'}
       ])
     ]
   },
 ]


function start(mode, isPackaged) {
  // isPackaged is optional, it indicated that the
  // app has been packaged to a OS managed app, such as
  // a .deb for linux. The package manager handles
  // updates if that is the case.
  isPackaged = isPackaged || false;

  // The running node.js server, the main app window
  // are all global to the function
  const server = createServer();
  let mainWindow;

  // Register the fact that this is packaged globally
  if (isPackaged) {
    window.IS_PACKAGED = true;
  }
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
      title: runModeTitle(mode) + " " + `v${app.getVersion()}`,
      webPreferences: {
        nodeIntegration: true,
        preload: preloadScript(),
        webSecurity: false
      }
    });
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
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
