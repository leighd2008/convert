const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

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

ipcMain.on('videos:added', (event, videos) => {
  const promise = new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videos[0].path, (err, metadata) => {
      resolve(metadata);
    });
  });
  promise.then((metadata) => {console.log(metadata); })
});

module.exports = mainWindow;