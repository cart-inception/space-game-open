import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // App info
  getAppVersion: () => ipcRenderer.invoke('app-version'),
  getAppName: () => ipcRenderer.invoke('app-name'),
  getAppPath: (name: string) => ipcRenderer.invoke('app-path', name),

  // Menu events
  onNewGame: (callback: () => void) => {
    ipcRenderer.on('menu-new-game', callback);
  },
  onOpenGame: (callback: () => void) => {
    ipcRenderer.on('menu-open-game', callback);
  },

  // File operations
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (data: string) => ipcRenderer.invoke('dialog:saveFile', data),

  // Remove all listeners
  removeAllListeners: (channel: string) => {
    ipcRenderer.removeAllListeners(channel);
  },
});

// Type definitions for the exposed API
export interface ElectronAPI {
  getAppVersion: () => Promise<string>;
  getAppName: () => Promise<string>;
  getAppPath: (name: string) => Promise<string>;
  onNewGame: (callback: () => void) => void;
  onOpenGame: (callback: () => void) => void;
  openFile: () => Promise<any>;
  saveFile: (data: string) => Promise<any>;
  removeAllListeners: (channel: string) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}