/*
 * @Description: 登录页
 * @Author: qingyang
 * @Date: 2020-09-10 14:43:34
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-23 15:27:03
 */
import React, { Component } from "react";
import { message, Button, Form, Input, Select } from 'antd';
import { connect } from "react-redux";
import {addUser} from '@/projects/admin/store/action'

interface comState {
    name: string,
    psw: string
}

const mapStateToProps = (state: any) => {
    return {
      userInfo: state.userInfo
    };
  };
const mapDispatchToProps = (dispatch: any) => ({
    setUserInfo: (name: string) => {
        message.info('登录成功');
        dispatch(addUser({id: 1, name}));
    },
});
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
    loginClick = (value:String, e:any) => {
        e.preventDefault();
        this.props.form.validateFields((errors: any, values: any) => {
            debugger
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
        });
        return
        
    }
    onFinish = (values: any) => {
        this.props.history.push('/admin');
        this.props.setUserInfo(values.username);
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
