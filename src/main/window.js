const { BrowserWindow } = require('electron');
class Window {
    constructor() {

    }
    load(url) {
        const self = this;
        if (!self._win) {
            self._win = new BrowserWindow({
                width: 800,
                height: 600,
                show: false
            });
        }
        return new Promise(resolve => {
            self._win.once('ready-to-show', () => {
                self._win.show();
                resolve();
            });
            self._win.loadURL(url);
        })
    }
    openDevTools() {
        this._win.openDevTools();
    }
    send(channel, data) {
        this._win.webContents.send(channel, data);
    }
}
export default new Window();