import React from "react"
export default function Logs(props)
{
    let {state} = props;
    let messages = [];
    for(let i=0,count=state.messages.length;i<count;i++)
    {
        messages.push(`${state.messages[i].time.getTime()} - ${state.messages[i].action} - ${state.messages[i].data.toString()}`)
    };
    return <div style={{position:"fixed",top:40,left:3,right:488,bottom:40,border:"1px solid #ddd",whiteSpace: "pre-line",overflowY: "scroll"}} >{messages.join("\n")}</div>
}