const { app, BrowserWindow, ipcMain } = require('electron');
const usb = require('usb-detection');
const serialport = require("serialport");
const path = require("path")
const iconv = require('iconv-lite'); 
let serial_list = [];
function isDev() {
    return process.mainModule.filename.indexOf('app.asar') === -1;
}
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })
    isDev() ? win.openDevTools() : {};
    win.loadURL(`file://${path.join(__dirname, `html/index.html`)}`)
}
function createCommunication() {
    ipcMain.on("renderer",(evt,args)=>{
        if(args.method=="serial")
        {
            switch(args.action)
            {
                case "list":
                {
                    args.data = serial_list;
                }
            }
        }
        evt.sender.send('main', args);
    });
}
function updateSerialPorts()
{
    serialport.list().then((list) => {
        serial_list = list;
    })
}
app.once("ready", () => {
    usb.startMonitoring();
    usb.on("change", () => {
        updateSerialPorts();
    })
    updateSerialPorts();
    createWindow();
    createCommunication();
}
)
app.on('window-all-closed', function () {
    usb.stopMonitoring();
    app.quit()
})