import {ipcRenderer} from "electron"
class Communication
{
    constructor()
    {
        const self = this;
        ipcRenderer.on("main",(evt,args)=>{
            if(self.resolve)
            {
                self.resolve(args);
                self.resolve = null;
            }
        });
    }
    send(data)
    {
        ipcRenderer.send("renderer",data)
    }
    request(data)
    {
        const self = this;
        return new Promise(resolve=>{
            self.resolve = resolve;
            self.send(data);
        });
    }
}
export default new Communication();