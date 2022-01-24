import React,{useContext,useState} from "react"
export default function Logs(props)
{
    let {state} = props;
    return <div style={{position:"fixed",top:40,left:3,right:3,bottom:40,border:"1px solid #ddd",whiteSpace: "pre-line",overflowY: "scroll"}} >{state.messages.join("\n")}</div>
}