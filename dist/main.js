"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
// Keep a global reference of the window object
let mainWindow = null;
const isDev = process.env.NODE_ENV === 'development';
function createWindow() {
    // Create the browser window
    mainWindow = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path_1.default.join(__dirname, 'preload.js'),
        },
        icon: path_1.default.join(__dirname, '../assets/icon.png'), // We'll create this later
        show: false, // Don't show until ready-to-show
    });
    // Load the app
    if (isDev) {
        mainWindow.loadURL('http://localhost:3000');
        // Open DevTools in development
        mainWindow.webContents.openDevTools();
    }
    else {
        mainWindow.loadFile(path_1.default.join(__dirname, '../renderer/index.html'));
    }
    // Show window when ready to prevent visual flash
    mainWindow.once('ready-to-show', () => {
        if (mainWindow) {
            mainWindow.show();
        }
    });
    // Handle window closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    // Handle external links
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        electron_1.shell.openExternal(url);
        return { action: 'deny' };
    });
}
// This method will be called when Electron has finished initialization
electron_1.app.whenReady().then(() => {
    createWindow();
    // On macOS, re-create window when dock icon is clicked
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
    // Set up application menu
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'New Game',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => {
                        // Handle new game
                        if (mainWindow) {
                            mainWindow.webContents.send('menu-new-game');
                        }
                    },
                },
                {
                    label: 'Open',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        // Handle open game
                        if (mainWindow) {
                            mainWindow.webContents.send('menu-open-game');
                        }
                    },
                },
                { type: 'separator' },
                {
                    label: 'Quit',
                    accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
                    click: () => {
                        electron_1.app.quit();
                    },
                },
            ],
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
            ],
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' },
            ],
        },
    ];
    const menu = electron_1.Menu.buildFromTemplate(template);
    electron_1.Menu.setApplicationMenu(menu);
});
// Quit when all windows are closed
electron_1.app.on('window-all-closed', () => {
    // On macOS, app and menu bar stay active until Cmd+Q
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
// Handle IPC messages
electron_1.ipcMain.handle('app-version', () => {
    return electron_1.app.getVersion();
});
electron_1.ipcMain.handle('app-name', () => {
    return electron_1.app.getName();
});
electron_1.ipcMain.handle('app-path', (_event, name) => {
    return electron_1.app.getPath(name);
});
