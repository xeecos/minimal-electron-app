import React,{useReducer,useEffect} from "react";
import { Tabs } from 'antd';
import ReactDOM from "react-dom";
import reducer from "./redux"
import Ports from "./ports"
import Communication from "./comm"
import Logs from "./logs"
import Commands from "./commands"
import Conditions from "./conditions"
import GraphView from "./graph"
import GraphSetting from "./graph-setting"
import Sender from "./sender"
import FileSender from "./file-sender"
import "antd/dist/antd.css";
import "../style/style.css";

const { TabPane } = Tabs;

function App()
{
    const [state, dispatch] = useReducer(reducer, { mode:"General",connected: false, messages:[], ports:[], port:"", baudRate: 230400, lineEnd:"\\n" });
    useEffect(() => {
        Communication.on("serial","list",(res)=>{
            res.data.sort((a, b) => { 
                return a.comName.replace("COM", "") - b.comName.replace("COM", "")
            });
            dispatch({type:"ports",value:res.data});
        })
        Communication.on("serial","connect",(res)=>{
            dispatch({type:"connected",value:res.connected});
        });
        Communication.on("serial","data",(res)=>{
            dispatch({type:"messages",action:"recv",value:res.data});
        });
        Communication.send({method:"serial",action:"list"});
    }, []);
    return  <div className="app">
                <Ports state={state} dispatch={dispatch}/>
                <Tabs style={{marginLeft:4}} defaultActiveKey="1" onChange={()=>{}}>
                    <TabPane tab="General" key="1">
                        <Logs state={state} dispatch={dispatch}/>
                        <Commands state={state} dispatch={dispatch}/>
                        <Sender state={state} dispatch={dispatch}/>
                    </TabPane>
                    <TabPane tab="Stream" key="2">
                        <Logs state={state} dispatch={dispatch}/>
                        <Conditions state={state} dispatch={dispatch}/>
                        <FileSender state={state} dispatch={dispatch}/>
                    </TabPane>
                    <TabPane tab="Graphics" key="3">
                        <GraphView state={state} dispatch={dispatch}/>
                        <GraphSetting state={state} dispatch={dispatch}/>
                        <Sender state={state} dispatch={dispatch}/>
                    </TabPane>
                </Tabs>
            </div>
}
ReactDOM.render(
    <App/>,
    document.getElementById("app")
);