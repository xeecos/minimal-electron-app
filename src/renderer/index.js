import React from "react";
import ReactDOM from "react-dom";
import Ports from "./ports"
import "antd/dist/antd.css";
import "../style/style.css";

ReactDOM.render(
    <div className="app">
        <Ports />
    </div>,
    document.getElementById("app")
);