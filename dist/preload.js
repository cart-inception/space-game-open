"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    // App info
    getAppVersion: () => electron_1.ipcRenderer.invoke('app-version'),
    getAppName: () => electron_1.ipcRenderer.invoke('app-name'),
    getAppPath: (name) => electron_1.ipcRenderer.invoke('app-path', name),
    // Menu events
    onNewGame: (callback) => {
        electron_1.ipcRenderer.on('menu-new-game', callback);
    },
    onOpenGame: (callback) => {
        electron_1.ipcRenderer.on('menu-open-game', callback);
    },
    // File operations
    openFile: () => electron_1.ipcRenderer.invoke('dialog:openFile'),
    saveFile: (data) => electron_1.ipcRenderer.invoke('dialog:saveFile', data),
    // Remove all listeners
    removeAllListeners: (channel) => {
        electron_1.ipcRenderer.removeAllListeners(channel);
    },
});
