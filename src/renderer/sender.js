import React from "react"
import {Input,Select} from "antd"
const { Option } = Select;
export default function Sender(props)
{
    const { state, dispatch } = props;
    return <div style={{position:"fixed",bottom:3,left:0,right:0}}>
        <Input 
            disabled={!state.connected} 
            style={{width:"calc(100% - 93px)",marginLeft:3}} 
            onPressEnter={(evt)=>{
                dispatch({type:"messages",action:"send",value:`${evt.target.value}${state.lineEnd}`});
            }} 
            addonBefore="send"
        />
        <Select 
            disabled={!state.connected} 
            style={{ width: 84,marginLeft:3, marginRight:3 }} 
            value={state.lineEnd}
            defaultValue={state.lineEnd}
            onChange={(v)=>{
                if(v!="-")
                {
                    dispatch({type:"lineEnd",value:v});
                }
            }}>
            <Option value="\n">\n</Option>
            <Option value="\r">\r</Option>
            <Option value="\r\n">\r\n</Option>
            <Option value="-"> - </Option>
        </Select>
    </div>
}