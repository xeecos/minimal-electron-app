import React,{useReducer,useEffect} from "react";
import ReactDOM from "react-dom";
import Ports from "./ports"
import Communication from "./comm"
import Logs from "./logs"
import Sender from "./sender"
import reducer from "./redux"
import "antd/dist/antd.css";
import "../style/style.css";

function App()
{
    const [state, dispatch] = useReducer(reducer, { connected: false, messages:[], ports:[], port:"", baudRate: 230400, lineEnd:"\\n" });
    useEffect(() => {
        Communication.on("serial","list",(res)=>{
            console.log("list:",res);
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
                <Logs state={state} dispatch={dispatch}/>
                <Sender state={state} dispatch={dispatch}/>
            </div>
}
ReactDOM.render(
    <App/>,
    document.getElementById("app")
);