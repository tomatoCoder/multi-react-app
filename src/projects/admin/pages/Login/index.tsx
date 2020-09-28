/*
 * @Description: 登录页
 * @Author: qingyang
 * @Date: 2020-09-10 14:43:34
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-28 10:35:15
 */
import React, { Component } from "react";
import {Button, Form, Input } from 'antd';
import { verifyCodeImgUrl } from "@/apis";
import { randomLenNum } from "@/utils/base";
import {loginAction} from '@/projects/admin/store/action'
import { connect } from "react-redux";

interface comState {
    randomStr: string,
    codeSrc: string
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };
  const mapStateToProps = (state: any) => {
    return {
      userInfo: state.userInfo
    };
  };
  const mapDispatchToProps = (dispatch: any) => ({
    requestLogin: (params: any) => {
        dispatch(loginAction(params))
    }
  });
class Login extends Component<any, comState> {
    constructor(props: any) {
        super(props);
        this.state = {
            randomStr: '',
            codeSrc:''
        }
    }
    componentDidMount() {
        this.refreshCode();
    }
    refreshCode = ()=> {
        let randomStr = randomLenNum(4, true)
        let codeSrc = `${verifyCodeImgUrl}?timestamp=${randomStr}`;
        this.setState({
            randomStr,
            codeSrc
        })
    }
    onFinish = (values: any) => {
        //TODO 登录接口请求成功之后获取token
        const params = {
            username: values.username,
            password: values.password,
            captcha: values.captcha,
            timestamp: this.state.randomStr
        };
        this.props.requestLogin(params);
        return
      };
    
    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
    render() {
        return (
            <div id="login">
                <p style={{color:'red'}}>我是登录页面</p>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: false }}
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
                        <Input type="password"/>
                    </Form.Item>
                    <Form.Item
                        label="Captcha"
                        name="captcha"
                        rules={[{ required: true, message: 'Please input your verifyCode!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <img alt="图片" src={this.state.codeSrc} onClick={this.refreshCode}/>
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
export default connect(mapStateToProps, mapDispatchToProps)(Login)
