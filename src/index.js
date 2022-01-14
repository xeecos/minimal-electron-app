const { app, BrowserWindow } = require('electron')
function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600
    })
  
    win.loadURL('https://github.com')
  }
  app.once("ready",()=>{
      createWindow()
    }
  )
  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })