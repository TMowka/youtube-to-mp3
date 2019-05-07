const { app, BrowserWindow, Menu } = require('electron');
const isElectronDev = require('electron-is-dev');

if (isElectronDev) {
  require('electron-reload')(`${__dirname}/public`); // eslint-disable-line global-require
}

let mainWindow;

const createMainWindow = () => {
  const browserOptions = {
    width: 800,
    height: 600,
    maximizeable: false,
  };

  mainWindow = new BrowserWindow(browserOptions);
  mainWindow.loadURL(`file://${__dirname}/app/index.html`);

  const template = [
    {
      label: 'Youtube To Mp3',
      submenu: [
        { label: 'About', selector: 'orderFrontStandardAboutPanel:' },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => app.quit(),
        },
      ],
    },
  ];

  if (isElectronDev) {
    template.push({
      label: 'Dev Tools',
      submenu: [
        {
          label: 'Open Dev Tools',
          click: () => mainWindow.webContents.openDevTools(),
        },
      ],
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
