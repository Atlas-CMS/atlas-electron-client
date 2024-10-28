"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clickHandlers = void 0;
var electron_1 = require("electron");
var csp_1 = require("./csp");
var electron_squirrel_startup_1 = __importDefault(require("electron-squirrel-startup"));
var bodyState_1 = __importDefault(require("./classes/bodyState"));
var dotenv_1 = require("dotenv");
var electron_json_storage_1 = __importDefault(require("electron-json-storage"));
if (electron_squirrel_startup_1.default) {
    electron_1.app.quit();
}
function getFromStorage(key) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    electron_json_storage_1.default.get(key, function (error, data) {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(data);
                        }
                    });
                })];
        });
    });
}
electron_json_storage_1.default.setDataPath();
(0, dotenv_1.configDotenv)();
var components = {
    "windows-controls": "<div data-component=\"electron-menu\" id=\"windows-controls\">\n  <div id=\"windows-controls-container\">\n    <div id=\"windows-controls-buttons\">\n      <button class=\"windows-controls-button\" id=\"close-button\" title=\"Close\">\n        <svg\n          xmlns=\"http://www.w3.org/2000/svg\"\n          viewBox=\"0 0 512 512\"\n          stroke=\"currentColor\"\n          fill=\"currentColor\"\n          stroke-width=\"0\"\n        >\n          <path\n            d=\"M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z\"\n          ></path>\n        </svg>\n      </button>\n      <button\n        class=\"windows-controls-button\"\n        id=\"minimize-button\"\n        title=\"Minimize\"\n      >\n        <svg\n          stroke=\"currentColor\"\n          fill=\"currentColor\"\n          stroke-width=\"0\"\n          viewBox=\"0 0 512 512\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M368.5 240h-225c-8.8 0-16 7.2-16 16 0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7h225c8.8 0 16-7.2 16-16s-7.2-16-16-16z\"\n          ></path>\n        </svg>\n      </button>\n      <button\n        class=\"windows-controls-button\"\n        id=\"maximize-button\"\n        title=\"Maximize\"\n      >\n        <svg\n          class=\"expand rotate45\"\n          stroke=\"currentColor\"\n          fill=\"currentColor\"\n          stroke-width=\"0\"\n          viewBox=\"0 0 24 24\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path d=\"M9 6 3 12 9 18V6ZM15 18 21 12 15 6V18Z\"></path>\n        </svg>\n        <svg\n          class=\"compress rotate45\"\n          stroke=\"currentColor\"\n          fill=\"currentColor\"\n          stroke-width=\"0\"\n          viewBox=\"0 0 24 24\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path d=\"M5 18 11 12 5 6V18ZM19 6 13 12 19 18V6Z\"></path>\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n",
    "electron-menu": "<div data-component=\"electron-menu\" id=\"electron-menu\">\n  <p id=\"atlas-menu-attribution\" class=\"atlasTitle no-highlight\">\n    <span id=\"atlas-menu-version\" class=\"versionNumber monospace-font\"\n      >v <span id=\"atlas-version-dropzone\">x.x.x</span></span\n    >\n    ATLAS\n  </p>\n</div>\n",
    "meta-unsafe": "<meta\n  http-equiv=\"Content-Security-Policy\"\n  content=\"script-src 'self' 'unsafe-inline';\"\n/>\n",
};
var parsedStyles = "<style>\n// Atlas-Electron style sheets\nhtml,\nbody,\nhtml:root {\n  --electron-padding-top: 1.5rem;\n  --atlas-purple-dark: rgb(33, 33, 52);\n  --atlas-purple-light: rgb(123, 121, 255);\n  --apple-red: rgb(255, 59, 48);\n  --apple-red-dark: rgb(255, 69, 58);\n  --apple-orange: rgb(255, 149, 0);\n  --apple-orange-dark: rgb(255, 159, 10);\n  --apple-yellow: rgb(255, 204, 0);\n  --apple-yellow-dark: rgb(255, 214, 10);\n  --apple-green: rgb(52, 199, 89);\n  --apple-green-dark: rgb(86, 227, 110);\n  --apple-teal-blue: rgb(90, 200, 250);\n  --apple-teal-blue-dark: rgb(100, 210, 260);\n}\n\nhtml {\n  --electron-padding-top: 1.5rem;\n  --atlas-purple-dark: rgb(33, 33, 52);\n  --atlas-purple-light: rgb(123, 121, 255);\n  --apple-red: rgb(255, 59, 48);\n  --apple-red-dark: rgb(255, 69, 58);\n  --apple-orange: rgb(255, 149, 0);\n  --apple-orange-dark: rgb(255, 159, 10);\n  --apple-yellow: rgb(255, 204, 0);\n  --apple-yellow-dark: rgb(255, 214, 10);\n  --apple-green: rgb(52, 199, 89);\n  --apple-green-dark: rgb(86, 227, 110);\n  --apple-teal-blue: rgb(90, 200, 250);\n  --apple-teal-blue-dark: rgb(100, 210, 260);\n  height: 100%;\n}\nhtml .left-menu {\n  padding-top: var(--electron-padding-top) !important;\n}\nhtml div:has(> [data-component=navbar]) > div:not(:has(> p[role=log])) {\n  padding-top: var(--electron-padding-top) !important;\n}\nhtml #electron-menu {\n  background-color: var(--atlas-purple-dark);\n  -webkit-app-region: drag;\n  position: fixed;\n  height: 1.5rem;\n  width: 100dvw;\n  z-index: 999;\n  left: 0;\n  top: 0;\n  justify-content: space-between;\n  align-items: center;\n  display: flex;\n  padding: 0rem 1rem;\n}\nhtml #electron-menu > #windows-controls {\n  -webkit-app-region: no-drag;\n}\n\n#windows-controls {\n  order: -1;\n}\n\n#windows-controls-buttons {\n  align-items: center;\n  display: flex;\n  gap: 0.5rem;\n}\n#windows-controls-buttons:hover .windows-controls-button svg {\n  opacity: 1;\n}\n\n.windows-controls-button {\n  background-color: var(--wcb-color, white);\n  border: 0.5px solid rgba(0, 0, 0, 0.2);\n  border-radius: 50%;\n  overflow: hidden;\n  cursor: pointer;\n  height: 0.75rem;\n  width: 0.75rem;\n  justify-content: center;\n  align-items: center;\n  display: flex;\n}\n.windows-controls-button#minimize-button {\n  --wcb-color-hover: var(--apple-yellow-dark);\n  --wcb-color: var(--apple-yellow);\n}\n.windows-controls-button#maximize-button {\n  --wcb-color-hover: var(--apple-green-dark);\n  --wcb-color: var(--apple-green);\n}\n.windows-controls-button#close-button {\n  --wcb-color-hover: var(--apple-red-dark);\n  --wcb-color: var(--apple-red);\n}\n.windows-controls-button:hover {\n  background-color: var(--wcb-color-hover, white);\n}\n.windows-controls-button svg {\n  transition: opacity 80ms ease-in-out;\n  height: 1rem;\n  width: 1rem;\n  opacity: 0;\n}\n\nsvg.rotate45 {\n  transform: rotate(45deg);\n}\n\nbody[focused=false] .windows-controls-button {\n  background-color: #4a4a6a !important;\n}\nbody:not([maximized]) #maximize-button svg.expand {\n  display: block;\n}\nbody:not([maximized]) #maximize-button svg.compress {\n  display: none;\n}\nbody[maximized=true] #maximize-button svg.expand {\n  display: none;\n}\nbody[maximized=true] #maximize-button svg.compress {\n  display: block;\n}\nbody[maximized=false] #maximize-button svg.expand {\n  display: block;\n}\nbody[maximized=false] #maximize-button svg.compress {\n  display: none;\n}\n\n.no-highlight {\n  user-select: none;\n}\n.no-highlighthighlight::selection {\n  background-color: transparent;\n}\n\n.monospace-font {\n  font-family: \"Fira Code\", monospace;\n}\n\n#atlas-menu-attribution {\n  margin-left: auto;\n  text-align: right;\n  color: rgb(255, 255, 255);\n  letter-spacing: 1.6px;\n  font-weight: 1000;\n  font-size: 12px;\n  cursor: default;\n}\n#atlas-menu-attribution span#atlas-menu-version {\n  color: rgb(165, 165, 186);\n  letter-spacing: -2px;\n  margin-right: 4px;\n  font-weight: 100;\n  font-size: 12px;\n}\n#atlas-menu-attribution span#atlas-menu-version span.first-letter {\n  margin-right: 4px;\n}\n\n/* Windows */\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  *::-webkit-scrollbar {\n    width: 10px;\n    background-color: #f5f5f5;\n  }\n  *::-webkit-scrollbar-thumb {\n    background-color: #ccc;\n    border-radius: 5px;\n  }\n  *::-webkit-scrollbar-track {\n    background-color: #f5f5f5;\n    border-radius: 5px;\n  }\n  *::-webkit-scrollbar-button {\n    background-color: #f5f5f5;\n    border-radius: 5px;\n  }\n}\n/* macOS */\n@media not all and (min-resolution: 0.001dpcm) {\n  *::-webkit-scrollbar {\n    width: 10px;\n    background-color: #f5f5f5;\n  }\n  *::-webkit-scrollbar-thumb {\n    background-color: #ccc;\n    border-radius: 5px;\n  }\n  *::-webkit-scrollbar-track {\n    background-color: #f5f5f5;\n    border-radius: 5px;\n  }\n  *::-webkit-scrollbar-button {\n    background-color: #f5f5f5;\n    border-radius: 5px;\n  }\n}\nhtml *::-webkit-scrollbar {\n  width: 10px;\n  height: 10px;\n  background-color: #f5f5f5;\n}\nhtml *::-webkit-scrollbar-thumb {\n  background-color: #d3ced4;\n  border-radius: 5px;\n}\nhtml *::-webkit-scrollbar-thumb::hover {\n  background-color: #bab3bb;\n}\nhtml *::-webkit-scrollbar-track {\n  background-color: #f5f5f5;\n  border-radius: 5px;\n}\nhtml *::-webkit-scrollbar-button {\n  background-color: #f5f5f5;\n  display: none !important;\n  border-radius: 5px;\n}</style>";
var styleTag = parsedStyles;
// console.log(styleTag);
var tray;
electron_1.nativeTheme.themeSource = "light";
var contentSecurityPolicy = (0, csp_1.generateCSP)({
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
var createWindow = function () {
    var win = new electron_1.BrowserWindow({
        icon: "".concat(__dirname, "/assets/win/icon.ico"), // This will not work for iOS!
        trafficLightPosition: { x: 16, y: 5 },
        backgroundColor: "#202133",
        titleBarStyle: "hidden",
        transparent: false,
        resizable: true,
        height: 800,
        width: 1400,
        webPreferences: {
            preload: "".concat(__dirname, "/scripts/electron_connect.js"),
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
    win.loadURL("https://atlas-demo.up.railway.app/admin");
    win.once("ready-to-show", function () {
        win.show();
    });
    win.webContents.on("dom-ready", function () {
        console.log(styleTag);
        setTimeout(function () {
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
            setTimeout(function () {
                Object.keys(exports.clickHandlers).forEach(function (id) {
                    win.webContents.send("registerClickListener", id);
                });
                // Trigger version update from client config
                win.webContents.send("triggerVersionInjection");
            }, 500);
            var bodyStateSync = new bodyState_1.default(win);
            bodyStateSync.setAttribute("bss-initialized", "true");
            // electron-menu
        }, 2000);
    });
    electron_1.ipcMain.on("rendererReady", function (_, data) {
        console.log("rendererReady", data);
    });
    electron_1.ipcMain.on("domElementClicked", function (_, btnId) {
        if (exports.clickHandlers === null || exports.clickHandlers === void 0 ? void 0 : exports.clickHandlers[btnId]) {
            exports.clickHandlers[btnId](win);
        }
        else {
            console.warn("[Iliad]-[Strapi]", "No click handler for ".concat(btnId));
        }
    });
    electron_1.ipcMain.on("updateTitle", function (_, data) {
        tray.setTitle("".concat(data));
        console.log("updateTitle", data);
    });
    electron_1.ipcMain.on("updateTooltip", function (_, data) {
        tray.setToolTip("".concat(data));
        console.log("updateTooltip", data);
    });
    tray.setToolTip("This is my application");
    electron_1.ipcMain.on("log", function (event, data) {
        console.log("[Iliad]-[Strapi]", data);
    });
};
electron_1.app.whenReady().then(function () {
    tray = new electron_1.Tray(electron_1.nativeImage.createFromPath("./src/assets/iliad_atlas.png"));
    tray.setToolTip("by Iliad");
    tray.setTitle("Atlas Suite");
    console.log({ contentSecurityPolicy: contentSecurityPolicy });
    // Apply Content Security Policy (CSP)
    electron_1.session.defaultSession.webRequest.onHeadersReceived(function (details, callback) {
        callback({
            responseHeaders: __assign(__assign({}, details.responseHeaders), { "Content-Security-Policy": [contentSecurityPolicy] }),
        });
    });
    createWindow();
});
exports.clickHandlers = {
    "minimize-button": function (win) {
        win.minimize();
    },
    "maximize-button": function (win) {
        if (win.isMaximized()) {
            win.unmaximize();
        }
        else {
            win.maximize();
        }
    },
    "close-button": function (win) {
        win.close();
    },
};
