import { app, BrowserWindow, ipcMain } from 'electron';

export default async function createWindow(
  options: Electron.BrowserWindowConstructorOptions
) {
  const win = new BrowserWindow(options);

  win.webContents.openDevTools();

  // win.loadURL(`${process.env.ILIAD_CLIENT_ENDPOINT}/admin`);
  win.loadURL(`http://localhost:1776/admin`);
}
