/*
 * @Description: 登录页
 * @Author: qingyang
 * @Date: 2020-09-10 14:43:34
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-24 15:57:59
 */
import React, { Component } from "react";
import {Button, Form, Input } from 'antd';

interface comState {
    name: string,
    psw: string
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };
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
    onFinish = (values: any) => {
        //TODO 登录接口请求成功之后获取token
        localStorage.setItem('token', '12313')
        if(localStorage.getItem('token')){
            //刷新页面用来重新渲染app节点
             window.location.reload()
        }
      };
    
    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
    render() {
        return (
            <div id="login">
                <div className="wrap"></div>
                <p style={{color:'red'}}>我是登录页面</p>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                                Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Login
