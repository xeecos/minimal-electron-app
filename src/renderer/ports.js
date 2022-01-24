import React,{useState,useContext,useEffect} from "react"
import Communication from "./comm"
import { Select, Button } from 'antd';

const { Option } = Select;
export default function Ports(props)
{
    const baudrates = [9600, 19200, 38400, 51200, 115200, 230400, 460800, 921600, 1000000, 2000000, 4000000]
    let {state,dispatch} = props;
    const options_ports = [];
    const options_baudrates = [];
    state.ports.forEach((port, index) => {
        options_ports.push(<Option key={`port_${index}`} value={`${port.comName}`} title={`${port.deviceName}`}>{`${port.deviceName}`}</Option>);
    })
    baudrates.forEach((baudrate, index) => {
        options_baudrates.push(<Option key={`baud_${baudrate}`} value={`${baudrate}`}>{baudrate}</Option>);
    })
    return <div className="ports">
        <Select defaultValue=" - " disabled={state.connected} style={{ width: 280 }} value={state.port} onChange={(v) => {
            dispatch({type:"port",value:v});
        }}>
            {options_ports}
        </Select>
        <Select defaultValue="115200" disabled={state.connected} style={{ width: 120, marginLeft: 4 }} value={state.baudRate} onChange={(v) => { 
            dispatch({type:"baudRate",value:v});
        }}>
            {options_baudrates}
        </Select>
        <Button type="primary" style={{ marginLeft: 8 }} onClick={()=>{
            state.connected?Communication.send({method:"serial",action:"disconnect"}):Communication.send({method:"serial",action:"connect",port:state.port,baudRate:state.baudRate})
        }}>
            {state.connected ? "Disconnect" : "Connect"}
        </Button>
    </div>
}