/*
 * @Description: 登录页
 * @Author: qingyang
 * @Date: 2020-09-10 14:43:34
 * @LastEditors: qingyang
 * @LastEditTime: 2020-10-14 17:04:56
 */
import React, { Component } from "react";
import {Button, Form, Input } from 'antd';
import { verifyCodeImgUrl } from "@/apis";
import { randomLenNum } from "@/utils/base";
import {loginAction} from '@/projects/admin/store/action'
import { connect } from "react-redux";
const styles = require('./index.module.less');

interface comState {
    randomStr: string,
    codeSrc: string
}

const layout = {
    labelCol: { span: 6 },
    // wrapperCol: { span: 16 },
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
            <div className={styles.login_wrap}>
                <div className={styles.bg_wrap}>131</div>
                <div className={styles.form_wrap}>
                    <div className={styles.form}>
                    <h1>xxx管理系统</h1>
                    <Form
                        {...layout}
                        name="basic"
                        labelAlign="left"
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
                            rules={[{ required: true, message: 'Please input your password!'},
                                 {
                                pattern:/^\d{8}$/,
                                message: '只能输入8位数字'
                            }]}
                        >
                            <Input type="password"/>
                        </Form.Item>
                        <Form.Item label="Captcha">
                            <Form.Item
                                name="captcha"
                                noStyle
                                rules={[{ required: true, message: 'Please input your verifyCode!' }]}
                            >
                            <Input className={styles.input_code} />
                            </Form.Item>
                            <img alt="图片" src={this.state.codeSrc} onClick={this.refreshCode}/>
                        </Form.Item>
                            <Button type="primary" htmlType="submit" className={styles.btn_login}>
                                    Submit
                            </Button>
                    </Form>
                    </div>
                </div>
                
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
