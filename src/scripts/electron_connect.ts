// Preload (Isolated World)
import { contextBridge, ipcRenderer } from 'electron';

console.log(`[Iliad] Electron Connect script loaded...`);
contextBridge.exposeInMainWorld('electron', {
  exists: true,
});

contextBridge.exposeInMainWorld('bridge', {
  emit: (channel: string, data: any) => {
    ipcRenderer.send(channel, data);
  },
  on: (channel: string, callback: (...args: any[]) => void) => {
    ipcRenderer.on(channel, (event, ...args) => callback(...args));
  },
});

export default 'electron_connect.js';
