/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 14:43:34
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-14 13:30:32
 */
import React, { Component } from "react";
import logo from "@/assets/images/logo.svg";
import "./index.less";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '123'   
        }
    }
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
