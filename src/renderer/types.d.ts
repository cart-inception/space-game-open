// Global type definitions for the renderer process

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
    electronAPI?: ElectronAPI;
  }
}

export {};