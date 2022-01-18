import React from "react"
import Communication from "./comm"
import { Select, Button } from 'antd';

const { Option } = Select;
export default class Ports extends React.Component {
    constructor() {
        super();
        this.state = {
            connected: false,
            ports: [],
            baudrates: [9600, 19200, 38400, 51200, 115200, 230400, 460800, 921600, 1000000, 2000000, 4000000]
        }
    }
    componentDidMount() {
        const self = this;
        Communication.request({ method: "serial", action: "list" }).then((res) => {
            res.data.sort((a, b) => { return a.comName.replace("COM", "") - b.comName.replace("COM", "") });
            self.setState({ ports: res.data });
        });
    }
    render() {
        const self = this;
        const options_ports = [];
        const options_baudrates = [];
        this.state.ports.forEach((port, index) => {
            options_ports.push(<Option key={`port_${index}`} value={`${port.comName}`} title={`${port.comName}(${port.manufacturer})`}>{`${port.comName} ( ${port.manufacturer} )`}</Option>);
        })
        this.state.baudrates.forEach((baudrate, index) => {
            options_baudrates.push(<Option key={`baud_${baudrate}`} value={`${baudrate}`}>{baudrate}</Option>);
        })
        return <div className="ports">
            <Select defaultValue=" - " disabled={self.state.connected} style={{ width: 200 }} onChange={(v) => {console.log(v) }}>
                {options_ports}
            </Select>
            <Select defaultValue="115200" disabled={self.state.connected} style={{ width: 120, marginLeft: 4 }} onChange={() => { }}>
                {options_baudrates}
            </Select>
            <Button type="primary" style={{ marginLeft: 8 }} onClick={()=>{
                self.setState({connected:!self.state.connected})
            }}>
                {this.state.connected ? "Disconnect" : "Connect"}
            </Button>
        </div>
    }
}