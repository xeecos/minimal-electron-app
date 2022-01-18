import usb from 'usb-detection';
import serialport from "serialport";
class Uart {
    constructor() {
        const self = this;
        self._list = [];
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
    destroy() {
        usb.stopMonitoring();
    }
}
export default new Uart();