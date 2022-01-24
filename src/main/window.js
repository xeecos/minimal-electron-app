const { BrowserWindow,ipcMain } = require('electron');
class Window {
    constructor() {
        
        ipcMain.on("renderer",this.onMessage.bind(this));
        this._channels = {};
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
        });
    }
    openDevTools() {
        this._win.openDevTools();
    }
    send(channel, data) {
        this._win.webContents.send(channel, data);
    }
    onMessage(evt,msg)
    {
        if(this._channels[msg.method])
        {
            this._channels[msg.method](evt.sender,msg);
        }
    }
    on(channel,callback)
    {
        this._channels[channel] = callback;
    }
}
export default new Window();