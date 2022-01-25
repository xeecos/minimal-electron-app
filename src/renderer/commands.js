import React from "react"
import { Table, InputNumber, Switch, Divider } from 'antd';
const columns = [
    {
        title: 'Message',
        dataIndex: 'msg',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Description',
        dataIndex: 'desc',
    },
    {
        title: 'Delay',
        dataIndex: 'delay',
    },
];
const data = [];

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
        />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 39, borderTop:"1px solid #ddd" }}>
            <InputNumber style={{ position: "absolute", width:60, right: 98, top: 3 }} min={0} defaultValue={1} onChange={() => { }} />
            <Switch checkedChildren="Loop Send" unCheckedChildren="Loop Send" style={{ position: "absolute", right: 3, top: 8 }} />
        </div>
    </div>
}