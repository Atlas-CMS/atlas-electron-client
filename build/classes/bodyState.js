"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BodyStateSync = /** @class */ (function () {
    function BodyStateSync(window) {
        this.attributes = new Map();
        this.window = null;
        this.window = window;
        this.registerListeners(this.window);
    }
    BodyStateSync.prototype.getAttribute = function (key) {
        return this.attributes.get(key) || "";
    };
    BodyStateSync.prototype.setAttribute = function (key, value, _window) {
        var win = _window || this.window;
        if (!win) {
            console.error("No window found");
            return;
        }
        console.log("setAttribute", key, value);
        this.attributes.set(key, value);
        win.webContents.send("updateBodyAttribute", { key: key, value: value });
    };
    BodyStateSync.prototype.registerListeners = function (_window) {
        var _this = this;
        _window === null || _window === void 0 ? void 0 : _window.on("focus", function () {
            _this.setAttribute("focused", "true", _window);
        });
        _window === null || _window === void 0 ? void 0 : _window.on("blur", function () {
            _this.setAttribute("focused", "false", _window);
        });
        _window === null || _window === void 0 ? void 0 : _window.on("maximize", function () {
            _this.setAttribute("maximized", "true", _window);
        });
        _window === null || _window === void 0 ? void 0 : _window.on("unmaximize", function () {
            _this.setAttribute("maximized", "false", _window);
        });
        _window === null || _window === void 0 ? void 0 : _window.on("minimize", function () {
            _this.setAttribute("minimized", "true", _window);
        });
        _window === null || _window === void 0 ? void 0 : _window.on("restore", function () {
            _this.setAttribute("minimized", "false", _window);
        });
        _window === null || _window === void 0 ? void 0 : _window.on("enter-full-screen", function () {
            _this.setAttribute("fullscreen", "true", _window);
        });
        _window === null || _window === void 0 ? void 0 : _window.on("leave-full-screen", function () {
            _this.setAttribute("fullscreen", "false", _window);
        });
        _window === null || _window === void 0 ? void 0 : _window.on("show", function () {
            _this.setAttribute("el-hidden", "false", _window);
        });
        _window === null || _window === void 0 ? void 0 : _window.on("hide", function () {
            _this.setAttribute("el-hidden", "true", _window);
        });
    };
    return BodyStateSync;
}());
exports.default = BodyStateSync;
