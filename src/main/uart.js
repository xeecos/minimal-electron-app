import usb from 'usb-detection';
import serialport from "serialport";
class Uart {
    constructor() {
        const self = this;
        self._list = [];
        self._window = null;
    }
    ready(window) {
        const self = this;
        usb.startMonitoring();
        usb.on("change", () => {
            self.getSerialPorts().then(() => {
                window.send("main", { method: "serial", action: "list", data: self._list })
            });
        });
        self.getSerialPorts().then(() => {
            window.send("main", { method: "serial", action: "list", data: self._list })
        });
        window.on("serial",self.onMessage.bind(self));
        self._window = window;
    }
    onMessage(sender,msg)
    {
        const self = this;
        switch(msg.action)
        {
            case "connect":
            {
                self.connect(msg.port,msg.baudRate).then(()=>{
                    self._window.send("main",{method:"serial",action:"connect",connected:true})
                },()=>{
                    self._window.send("main",{method:"serial",action:"connect",connected:false})
                });
            }
            break;
            case "disconnect":
            {
                self.disconnect().then(()=>{
                    self._window.send("main",{method:"serial",action:"connect",connected:false})
                })
            }
            break;
            case "send":
            {
                if(self._uart&&self._uart.isOpen)
                {
                    self._uart.write(Buffer.from(msg.data.split("\\n").join("\n").split("\\r").join("\r")));
                    self._uart.drain(()=>{
                    });
                }
            }
            break;
            case "file":
            {
                
            }
            break;
        }
    }
    findDeviceIndex(devices, name) {
        for (let i = 0; i < devices.length; i++) {
            if (devices[i].indexOf(name) > -1) {
                return i;
            }
        }
        return -1;
    }
    getSerialPorts() {
        const self = this;
        return new Promise(resolve => {
            serialport.list().then((ports) => {
                self.getUSBList().then(devices => {
                    ports.forEach((port, index) => {
                        let idx = self.findDeviceIndex(devices, port.comName);
                        if (idx > -1) {
                            ports[index].deviceName = `${ports[index].comName} (${devices[idx].split(" (")[0]})`;
                        }
                        else {
                            ports[index].deviceName = `${ports[index].comName} (${ports[index].manufacturer})`
                        }
                    })
                    self._list = ports;
                    resolve();
                })
            })
        })
    }

    getUSBList() {
        return new Promise(resolve => {
            usb.find((err, devices) => {
                let list = [];
                devices.forEach(device => {
                    if (device.deviceName.indexOf("(COM") > -1) {
                        list.push(device.deviceName);
                    };
                });
                resolve(list);
            });
        })
    }
    connect(port,baudRate)
    {
        const self = this;
        return new Promise((resolve,reject)=>{
            self._uart = new serialport(port,{baudRate:Number(baudRate),autoOpen:false},(err,res)=>{
                
            });
            self._uart.open(err=>{
                if(!err)
                {
                    self._uart.on("data",(data)=>{
                        self._window.send("main",{method:"serial",action:"data",data})
                    })
                    resolve();
                }
                else
                {
                    reject();
                }
            });
        })
    }
    disconnect()
    {
        const self = this;
        return new Promise(resolve=>{
            if(!self._uart)return resolve();
            try
            {
                self._uart.close();
            }
            catch(err)
            {

            }
            self._uart = null;
            setTimeout(()=>{resolve();},100);
        })
    }
    destroy() {
        usb.stopMonitoring();
    }
}
export default new Uart();