import type { BrowserWindow } from "electron";

export default class BodyStateSync {
  attributes = new Map<string, string>();
  window: BrowserWindow | null = null;
  constructor(window: BrowserWindow) {
    this.window = window;
    this.registerListeners(this.window);
  }

  getAttribute(key: string): string {
    return this.attributes.get(key) || "";
  }

  setAttribute(key: string, value: string, _window?: BrowserWindow): void {
    const win = _window || this.window;
    if (!win) {
      console.error("No window found");
      return;
    }

    console.log("setAttribute", key, value);
    this.attributes.set(key, value);
    win.webContents.send("updateBodyAttribute", { key, value });
  }

  registerListeners(_window: BrowserWindow): void {
    _window?.on("focus", () => {
      this.setAttribute("focused", "true", _window);
    });

    _window?.on("blur", () => {
      this.setAttribute("focused", "false", _window);
    });

    _window?.on("maximize", () => {
      this.setAttribute("maximized", "true", _window);
    });

    _window?.on("unmaximize", () => {
      this.setAttribute("maximized", "false", _window);
    });

    _window?.on("minimize", () => {
      this.setAttribute("minimized", "true", _window);
    });

    _window?.on("restore", () => {
      this.setAttribute("minimized", "false", _window);
    });

    _window?.on("enter-full-screen", () => {
      this.setAttribute("fullscreen", "true", _window);
    });

    _window?.on("leave-full-screen", () => {
      this.setAttribute("fullscreen", "false", _window);
    });

    _window?.on("show", () => {
      this.setAttribute("el-hidden", "false", _window);
    });

    _window?.on("hide", () => {
      this.setAttribute("el-hidden", "true", _window);
    });
  }
}
