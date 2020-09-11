/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 14:43:34
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-11 14:31:12
 */
import React, { Component } from "react";
import logo from "@/assets/images/logo.svg";
import "./index.less";
import { isDef } from "@/utils/base.ts";
// import { isDef } from "@/utils/base";

class App extends Component {
    componentDidMount() {
        let u = 1;
        console.log(isDef(u))
    }
    render() {
        return (
            <div className="App-pc">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>我是服务端</p>
                </header>
            </div>
        );
    }
}

export default App;
