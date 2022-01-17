const { app, BrowserWindow } = require('electron');
const usb = require('usb-detection');
const serialport = require("serialport");
const path = require("path")
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })
    win.loadURL(`file://${path.join(__dirname,'dist/html/index.html')}`)
}
app.once("ready", () => {
    createWindow();
    usb.startMonitoring();
    usb.on("change", () => {
        serialport.list().then((list) => {
            console.log(list);
        })
    })
}
)
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})