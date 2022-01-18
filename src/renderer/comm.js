import {ipcRenderer} from "electron"
class Communication
{
    constructor()
    {
        const self = this;
        self._events = [];
        ipcRenderer.on("main",(evt,args)=>{
            console.log(args)
            if(self.resolve)
            {
                self.resolve(args);
                self.resolve = null;
            }
            self._events.forEach(item=>{
                if(item.method==args.method&&item.action==args.action)
                {
                    item.callback(args);
                }
            })
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
    on(method,action,callback)
    {
        const self = this;
        self._events.push({method,action,callback})
    }
}
export default new Communication();