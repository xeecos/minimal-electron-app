import { app } from 'electron';
import path from "path";
import Window from "./window";
import Utils from "./utils";
import Uart from "./uart"

app.once("ready", () => {
    Window.load(`file://${path.join(__dirname, `html/index.html`)}`).then(()=>{
        if(Utils.isDev()){
            Window.openDevTools();
        };
        Uart.ready(Window);
    });
});
app.once('window-all-closed', function () {
    Uart.destroy();
    app.quit();
});