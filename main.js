const electron = require('electron');

const { app, BrowserWindow } = electron;

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // enableRemote needed for windows
      enableRemoteModule: true,
      backgroundThrottling: false,
    }
  }),
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
});

module.exports = mainWindow;