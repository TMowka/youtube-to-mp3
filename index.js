const {
  app, BrowserWindow, Menu, ipcMain,
} = require('electron');
const isElectronDev = require('electron-is-dev');
const ytdl = require('ytdl-core');
const fs = require('fs-extra');
const sanitizeFilename = require('sanitize-filename');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');

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

const inputChannelName = 'NODE';
const outputChannelName = 'WINDOW';

ipcMain.on(`${inputChannelName}-convert`, async (event, id, downloadFolder = app.getPath('downloads'), bitRate = 160) => {
  try {
    const { title } = await ytdl.getInfo(id);
    const sanitizedTitle = sanitizeFilename(title);
    const videoFullPath = path.join(downloadFolder, `tmp_${sanitizedTitle}.mp4`);
    const audioFullPath = path.join(downloadFolder, sanitizedTitle);
    const videoObj = ytdl(id, { filter: 'audioonly' });

    mainWindow.webContents.send(`${outputChannelName}-set-progress`, 0);
    mainWindow.webContents.send(`${outputChannelName}-set-step`, 'downloading');

    // Download temp mp4 file
    await new Promise((resolve) => {
      videoObj.on('progress', (chunkLength, downloaded, total) => {
        const progress = Math.floor((downloaded / total) * 100);
        mainWindow.webContents.send(`${outputChannelName}-set-progress`, progress);
      });

      videoObj
        .pipe(fs.createWriteStream(videoFullPath))
        .on('finish', resolve);
    });

    mainWindow.webContents.send(`${outputChannelName}-set-step`, 'converting');
    mainWindow.webContents.send(`${outputChannelName}-set-progress`, -1);

    // Convert temp mp4 file to mp3
    await new Promise((resolve) => {
      ffmpeg(videoFullPath)
        .setFfmpegPath(ffmpegStatic.path)
        .format('mp3')
        .audioBitrate(bitRate)
        .output(fs.createWriteStream(audioFullPath))
        .on('end', resolve)
        .run();
    });

    // Remove temp mp4 file
    await fs.unlink(videoFullPath);

    mainWindow.webContents.send(`${outputChannelName}-set-step`, '');
  } catch (error) {
    console.error(error);
  }
});
