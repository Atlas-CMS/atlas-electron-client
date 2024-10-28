"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Preload (Isolated World)
var electron_1 = require("electron");
console.log("[Iliad] Electron Connect script loaded...");
electron_1.contextBridge.exposeInMainWorld('electron', {
    exists: true,
});
electron_1.contextBridge.exposeInMainWorld('bridge', {
    emit: function (channel, data) {
        electron_1.ipcRenderer.send(channel, data);
    },
    on: function (channel, callback) {
        electron_1.ipcRenderer.on(channel, function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return callback.apply(void 0, args);
        });
    },
});
exports.default = 'electron_connect.js';
