import {
  app,
  Tray,
  ipcMain,
  session,
  nativeImage,
  nativeTheme,
  BrowserWindow,
} from "electron";
import { generateCSP, CSPPolicy } from "./csp";
import startup from "electron-squirrel-startup";
import BodyStateSync from "./classes/bodyState";
import { configDotenv } from "dotenv";
import sass from "sass";
import fs from "fs";
import storage from "electron-json-storage";

if (startup) {
  app.quit();
}

async function getFromStorage<T = any>(key: string) {
  return new Promise((resolve, reject) => {
    storage.get(key, (error: any, data: T) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

storage.setDataPath();

configDotenv();

const components = {
  "windows-controls": `<div data-component="electron-menu" id="windows-controls">
  <div id="windows-controls-container">
    <div id="windows-controls-buttons">
      <button class="windows-controls-button" id="close-button" title="Close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
        >
          <path
            d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"
          ></path>
        </svg>
      </button>
      <button
        class="windows-controls-button"
        id="minimize-button"
        title="Minimize"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M368.5 240h-225c-8.8 0-16 7.2-16 16 0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7h225c8.8 0 16-7.2 16-16s-7.2-16-16-16z"
          ></path>
        </svg>
      </button>
      <button
        class="windows-controls-button"
        id="maximize-button"
        title="Maximize"
      >
        <svg
          class="expand rotate45"
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 6 3 12 9 18V6ZM15 18 21 12 15 6V18Z"></path>
        </svg>
        <svg
          class="compress rotate45"
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 18 11 12 5 6V18ZM19 6 13 12 19 18V6Z"></path>
        </svg>
      </button>
    </div>
  </div>
</div>
`,
  "electron-menu": `<div data-component="electron-menu" id="electron-menu">
  <p id="atlas-menu-attribution" class="atlasTitle no-highlight">
    <span id="atlas-menu-version" class="versionNumber monospace-font"
      >v <span id="atlas-version-dropzone">x.x.x</span></span
    >
    ATLAS
  </p>
</div>
`,
  "meta-unsafe": `<meta
  http-equiv="Content-Security-Policy"
  content="script-src 'self' 'unsafe-inline';"
/>
`,
};

const parsedStyles = `<style>
// Atlas-Electron style sheets
html,
body,
html:root {
  --electron-padding-top: 1.5rem;
  --atlas-purple-dark: rgb(33, 33, 52);
  --atlas-purple-light: rgb(123, 121, 255);
  --apple-red: rgb(255, 59, 48);
  --apple-red-dark: rgb(255, 69, 58);
  --apple-orange: rgb(255, 149, 0);
  --apple-orange-dark: rgb(255, 159, 10);
  --apple-yellow: rgb(255, 204, 0);
  --apple-yellow-dark: rgb(255, 214, 10);
  --apple-green: rgb(52, 199, 89);
  --apple-green-dark: rgb(86, 227, 110);
  --apple-teal-blue: rgb(90, 200, 250);
  --apple-teal-blue-dark: rgb(100, 210, 260);
}

html {
  --electron-padding-top: 1.5rem;
  --atlas-purple-dark: rgb(33, 33, 52);
  --atlas-purple-light: rgb(123, 121, 255);
  --apple-red: rgb(255, 59, 48);
  --apple-red-dark: rgb(255, 69, 58);
  --apple-orange: rgb(255, 149, 0);
  --apple-orange-dark: rgb(255, 159, 10);
  --apple-yellow: rgb(255, 204, 0);
  --apple-yellow-dark: rgb(255, 214, 10);
  --apple-green: rgb(52, 199, 89);
  --apple-green-dark: rgb(86, 227, 110);
  --apple-teal-blue: rgb(90, 200, 250);
  --apple-teal-blue-dark: rgb(100, 210, 260);
  height: 100%;
}
html .left-menu {
  padding-top: var(--electron-padding-top) !important;
}
html div:has(> [data-component=navbar]) > div:not(:has(> p[role=log])) {
  padding-top: var(--electron-padding-top) !important;
}
html #electron-menu {
  background-color: var(--atlas-purple-dark);
  -webkit-app-region: drag;
  position: fixed;
  height: 1.5rem;
  width: 100dvw;
  z-index: 999;
  left: 0;
  top: 0;
  justify-content: space-between;
  align-items: center;
  display: flex;
  padding: 0rem 1rem;
}
html #electron-menu > #windows-controls {
  -webkit-app-region: no-drag;
}

#windows-controls {
  order: -1;
}

#windows-controls-buttons {
  align-items: center;
  display: flex;
  gap: 0.5rem;
}
#windows-controls-buttons:hover .windows-controls-button svg {
  opacity: 1;
}

.windows-controls-button {
  background-color: var(--wcb-color, white);
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  height: 0.75rem;
  width: 0.75rem;
  justify-content: center;
  align-items: center;
  display: flex;
}
.windows-controls-button#minimize-button {
  --wcb-color-hover: var(--apple-yellow-dark);
  --wcb-color: var(--apple-yellow);
}
.windows-controls-button#maximize-button {
  --wcb-color-hover: var(--apple-green-dark);
  --wcb-color: var(--apple-green);
}
.windows-controls-button#close-button {
  --wcb-color-hover: var(--apple-red-dark);
  --wcb-color: var(--apple-red);
}
.windows-controls-button:hover {
  background-color: var(--wcb-color-hover, white);
}
.windows-controls-button svg {
  transition: opacity 80ms ease-in-out;
  height: 1rem;
  width: 1rem;
  opacity: 0;
}

svg.rotate45 {
  transform: rotate(45deg);
}

body[focused=false] .windows-controls-button {
  background-color: #4a4a6a !important;
}
body:not([maximized]) #maximize-button svg.expand {
  display: block;
}
body:not([maximized]) #maximize-button svg.compress {
  display: none;
}
body[maximized=true] #maximize-button svg.expand {
  display: none;
}
body[maximized=true] #maximize-button svg.compress {
  display: block;
}
body[maximized=false] #maximize-button svg.expand {
  display: block;
}
body[maximized=false] #maximize-button svg.compress {
  display: none;
}

.no-highlight {
  user-select: none;
}
.no-highlighthighlight::selection {
  background-color: transparent;
}

.monospace-font {
  font-family: "Fira Code", monospace;
}

#atlas-menu-attribution {
  margin-left: auto;
  text-align: right;
  color: rgb(255, 255, 255);
  letter-spacing: 1.6px;
  font-weight: 1000;
  font-size: 12px;
  cursor: default;
}
#atlas-menu-attribution span#atlas-menu-version {
  color: rgb(165, 165, 186);
  letter-spacing: -2px;
  margin-right: 4px;
  font-weight: 100;
  font-size: 12px;
}
#atlas-menu-attribution span#atlas-menu-version span.first-letter {
  margin-right: 4px;
}

/* Windows */
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  *::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }
  *::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 5px;
  }
  *::-webkit-scrollbar-track {
    background-color: #f5f5f5;
    border-radius: 5px;
  }
  *::-webkit-scrollbar-button {
    background-color: #f5f5f5;
    border-radius: 5px;
  }
}
/* macOS */
@media not all and (min-resolution: 0.001dpcm) {
  *::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }
  *::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 5px;
  }
  *::-webkit-scrollbar-track {
    background-color: #f5f5f5;
    border-radius: 5px;
  }
  *::-webkit-scrollbar-button {
    background-color: #f5f5f5;
    border-radius: 5px;
  }
}
html *::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #f5f5f5;
}
html *::-webkit-scrollbar-thumb {
  background-color: #d3ced4;
  border-radius: 5px;
}
html *::-webkit-scrollbar-thumb::hover {
  background-color: #bab3bb;
}
html *::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  border-radius: 5px;
}
html *::-webkit-scrollbar-button {
  background-color: #f5f5f5;
  display: none !important;
  border-radius: 5px;
}</style>`;

const styleTag = parsedStyles;

// console.log(styleTag);

let tray: Tray;
nativeTheme.themeSource = "light";

const contentSecurityPolicy = generateCSP({
  "script-src-elem": [
    "'self'",
    "editor.unlayer.com",
    "https://*.ckeditor.com",
    "unsafe-inline",
    "https://*.basemaps.cartocdn.com",
  ],
  "script-src": [
    "'self'",
    "editor.unlayer.com",
    "https://*.ckeditor.com",
    "unsafe-inline",
    "https://*.basemaps.cartocdn.com",
  ],
  "frame-src": [
    "'self'",
    "editor.unlayer.com",
    "plausible.io",
    "*.plausible.io",
    "youtube.com",
    "www.youtube.com",
    "vimeo.com",
    "*.vimeo.com",
    "facebook.com",
    "www.facebook.com",
    "*.spotify.com",
    "spotify.com",
    "plausible-analytics-ce-production-24cb.up.railway.app",
  ],
  "connect-src": ["'self'", "http:", "https:"],
  "img-src": [
    "'self'",
    "data:",
    "blob:",
    // These four were added for the Email Designer plugin.
    // I'm not sure how secure a blanket allowance for aws images is, but whatever.
    "res.cloudinary.com",
    "cdn.jsdelivr.net",
    "s3.amazonaws.com",
    "*.strapi.io",
    "strapi.io",
    "https://*.basemaps.cartocdn.com",
    "https://tile.openstreetmap.org",
  ],
  "media-src": [
    "'self'",
    "data:",
    "blob:",
    "res.cloudinary.com",

    "https://*.basemaps.cartocdn.com",
    "https://tile.openstreetmap.org",
  ],
});

// https://github.com/electron/windows-installer

const createWindow = () => {
  const win = new BrowserWindow({
    icon: `${__dirname}/assets/win/icon.ico`, // This will not work for iOS!
    trafficLightPosition: { x: 16, y: 5 },
    backgroundColor: "#202133",
    titleBarStyle: "hidden",
    transparent: false,
    resizable: true,
    height: 800,
    width: 1400,
    webPreferences: {
      preload: `${__dirname}/scripts/electron_connect.js`,
      contextIsolation: true,
      nodeIntegration: true,
      zoomFactor: 0.9,
    },
  });

  // win.loadURL(`${process.env.ILIAD_CLIENT_ENDPOINT}/admin`);
  // win.loadURL(`http://localhost:1776/admin`);
  // win.loadURL(
  //   `https://gcollective-railway-strapi-production.up.railway.app/admin`
  // );

  win.loadURL(`https://atlas-demo.up.railway.app/admin`);

  win.once("ready-to-show", () => {
    win.show();
  });

  win.webContents.on("dom-ready", () => {
    console.log(styleTag);
    setTimeout(() => {
      win.webContents.send("injectHTML", {
        querySelector: "head",
        html: styleTag,
      });
      win.webContents.send("injectHTML", {
        querySelector: "head",
        html: components["meta-unsafe"],
      });
      win.webContents.send("injectHTML", {
        querySelector: "body",
        html: components["electron-menu"],
      });

      // If platform is Windows
      if (process.platform === "win32") {
        win.webContents.send("injectHTML", {
          querySelector: "#electron-menu",
          html: components["windows-controls"],
        });
      }

      // Wait until injected HTML is rendered, then register click listeners
      setTimeout(() => {
        Object.keys(clickHandlers).forEach((id) => {
          win.webContents.send("registerClickListener", id);
        });

        // Trigger version update from client config
        win.webContents.send("triggerVersionInjection");
      }, 500);

      const bodyStateSync = new BodyStateSync(win);
      bodyStateSync.setAttribute("bss-initialized", "true");
      // electron-menu
    }, 2000);
  });

  ipcMain.on("rendererReady", (_, data) => {
    console.log("rendererReady", data);
  });

  ipcMain.on("domElementClicked", (_, btnId: string) => {
    if (clickHandlers?.[btnId]) {
      clickHandlers[btnId](win);
    } else {
      console.warn(`[Iliad]-[Strapi]`, `No click handler for ${btnId}`);
    }
  });

  ipcMain.on("updateTitle", (_, data) => {
    tray.setTitle(`${data}`);
    console.log("updateTitle", data);
  });

  ipcMain.on("updateTooltip", (_, data) => {
    tray.setToolTip(`${data}`);
    console.log("updateTooltip", data);
  });

  tray.setToolTip("This is my application");

  ipcMain.on("log", (event, data) => {
    console.log(`[Iliad]-[Strapi]`, data);
  });
};

app.whenReady().then(() => {
  tray = new Tray(nativeImage.createFromPath("./src/assets/iliad_atlas.png"));
  tray.setToolTip("by Iliad");
  tray.setTitle("Atlas Suite");

  console.log({ contentSecurityPolicy });

  // Apply Content Security Policy (CSP)
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [contentSecurityPolicy],
      },
    });
  });

  createWindow();
});

type ClickHandler = (win: BrowserWindow) => void;
export const clickHandlers: Record<string, ClickHandler> = {
  "minimize-button": (win: BrowserWindow) => {
    win.minimize();
  },
  "maximize-button": (win: BrowserWindow) => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  },
  "close-button": (win: BrowserWindow) => {
    win.close();
  },
};
