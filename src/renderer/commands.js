import React from "react"
import { Table, InputNumber, Switch, Input, Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
const columns = [
    {
        title: 'Message',
        dataIndex: 'msg',
        render: (text) => 
        {
            return <Input onDoubleClick={()=>{
                console.log("db click!")
            }} value={text}/>
        }
    },
    {
        title: 'Description',
        dataIndex: 'desc',
        render: (text) => 
        {
            return <Button style={{width:80}} type="primary">{text}</Button>
        }
    },
    {
        title: 'Delay',
        dataIndex: 'delay',
        render: (text) => 
        {
            return <InputNumber min={0} step={0.1} value={text}/>
        }
    },
];
const data = [
    {key:"1",msg:"G1",desc:"run",delay:1000}
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    }),
};
export default function Commands(props) {
    let { state } = props;
    const selectionType = "checkbox"
    return <div style={{ position: "fixed", top: 50, width: 480, right: 3, bottom: 40, border: "1px solid #ddd", whiteSpace: "pre-line", overflowY: "scroll" }} >
        <Table
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 40 }}
            rowSelection={{
                type: selectionType,
                ...rowSelection,
            }}
            pagination={{ position: [] }}
            rowCount={data.length}
            columns={columns}
            dataSource={data}
            size="small"
            footer={() => {
                return <div style={{position:"relative"}}>
                    <Button style={{ position: "absolute", right: 3, top: 3 }} size="small" type="primary" shape="circle" icon={<MinusOutlined />}></Button>
                    <Button style={{ position: "absolute", right: 43, top: 3 }}size="small" type="primary" shape="circle" icon={<PlusOutlined />}></Button>
                </div>
            }}
        />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 39, borderTop:"1px solid #ddd" }}>
            <Button style={{ position: "absolute", width:80, left: 3, top: 3 }}>Import</Button>
            <Button style={{ position: "absolute", width:80, left: 86, top: 3 }}>Export</Button>
            <InputNumber style={{ position: "absolute", width:60, right: 98, top: 3 }} min={0} defaultValue={1} onChange={() => { }} />
            <Switch checkedChildren="Loop Send" unCheckedChildren="Loop Send" style={{ position: "absolute", right: 3, top: 8 }} />
        </div>
    </div>
}