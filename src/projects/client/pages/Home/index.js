/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 14:43:34
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-11 11:08:51
 */
import React, { Component } from "react";
import logo from "@/assets/images/logo.svg";
import "./index.less";

class App extends Component {
    render() {
        return (
            <div className="App-pc">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>我是客户端</p>
                </header>
            </div>
        );
    }
}

export default App;
