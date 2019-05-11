const {
  app, BrowserWindow, Menu, ipcMain,
} = require('electron');
const isElectronDev = require('electron-is-dev');
const ytdl = require('ytdl-core');
const fs = require('fs-extra');
const sanitizeFilename = require('sanitize-filename');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const binaries = require('ffmpeg-binaries');

if (isElectronDev) {
  require('electron-reload')(`${__dirname}/public`); // eslint-disable-line global-require
}

let mainWindow;

const createMainWindow = () => {
  const browserOptions = {
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  };

  mainWindow = new BrowserWindow(browserOptions);
  mainWindow.loadURL(`file://${__dirname}/app/index.html`);

  const template = [
    {
      label: 'File',
      submenu: [
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: 'Ctrl+Q',
          click: () => app.quit(),
        },
      ],
    },
  ];

  if (isElectronDev) {
    template.push({
      label: 'Dev Tools',
      click: () => mainWindow.webContents.openDevTools(),
    });
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

const inputChannelName = 'BACK_END';
const outputChannelName = 'FRONT_END';

ipcMain.on(`${inputChannelName}-convert`, async (id, downloadFolder = app.getPath('downloads'), bitRate = 160) => {
  const { title } = await ytdl.getInfo(id);
  const sanitizedTitle = sanitizeFilename(title);
  const videoFullPath = path.join(downloadFolder, `tmp_${sanitizedTitle}.mp4`);
  const audioFullPath = path.join(downloadFolder, sanitizedTitle);
  const videoObj = ytdl(id, { filter: 'audioonly' });

  await new Promise((resolve) => {
    videoObj.on('progress', (chunkLength, downloaded, total) => {
      console.log('videoObj progress: ', Math.floor((downloaded / total) * 100));
    });

    videoObj
      .pipe(fs.createWriteStream(videoFullPath))
      .on('finish', resolve);
  });

  await new Promise((resolve) => {
    ffmpeg(videoFullPath)
      .setFfmpegPath(binaries.ffmpegPath())
      .format('mp3')
      .audioBitrate(bitRate)
      .on('progress', (progress) => {
        console.log('ffmpeg progress: ', Math.floor(progress.percent));
      })
      .output(fs.createWriteStream(audioFullPath))
      .on('end', resolve)
      .run();
  });
});
