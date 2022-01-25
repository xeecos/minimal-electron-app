import React from "react"
import { Input, Button } from "antd"
export default function FileSender(props) {
    return <div style={{ position: "fixed", bottom: 3, left: 0, right: 0 }}>
        <Input style={{width:200}} type="file" /><Button type="primary" shape="round" >▸</Button>
    </div>
}