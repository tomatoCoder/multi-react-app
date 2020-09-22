/*
 * @Description: 登录页
 * @Author: qingyang
 * @Date: 2020-09-10 14:43:34
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-22 14:27:44
 */
import React, { Component } from "react";

interface comState {
    name: string,
    psw: string
}


class Login extends Component<any, comState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: '123',
            psw: ''  
        }
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <div id="login">
                <div className="wrap"></div>
               <p style={{color:'red'}}>我是登录页面1</p>
            </div>
        );
    }
}

export default Login
