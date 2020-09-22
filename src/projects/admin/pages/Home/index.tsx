/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 14:43:34
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-22 15:52:39
 */
import React, { Component } from "react";
import logo from "@/assets/images/logo.svg";
// import "./index.module.less";

import { isDef } from "@/utils/base";
import { Link } from 'react-router-dom';
import { message, Button } from 'antd';
import { VERSION } from "@/config/project.config";
import { connect } from "react-redux";
import {addUser} from '@/projects/admin/store/action'
const styles = require('./index.module.less');
// import './index.less'
interface comState {
    name: string
}
interface comProps {
    userInfo: {
        name: string
    },
    setUserInfo: Function
}
const mapStateToProps = (state: any) => {
    return {
      userInfo: state.userInfo
    };
  };
const mapDispatchToProps = (dispatch: any) => ({
    setUserInfo: () => {
        message.info('登录成功');
        dispatch(addUser({id: 1, name: '派大星1'}));
    },
});
class App extends Component<comProps, comState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: '123'   
        }
    }
    componentDidMount() {
        console.log(this.props);
        let u = 1;
        console.log(isDef(u))
        
    }
    handleClick = (test: string) => {
       this.setState({
           name: 'paidaxing',
           
       });
       this.props.setUserInfo();
    }
    render() {
        let test = 'wrap--test'
        return (
            <div className={styles.app}>
                <header className="App-header">
                    <div className={`${styles[test]} ${styles.line2}`}>1231312312321安静的干哈多久啊是都很难哈京东干啥 3123123</div>
                    <div className="wrap--test"></div>
                    <p  className="test">{this.props.userInfo.name? this.props.userInfo.name : '未登录'}</p>
                    <img src={logo} className="app--logo" alt="logo" />
                    <Link to="/admin/order" style={{color:'black'}}>
                    <div>点击跳转到order</div>
                    </Link>
                    <Button type="primary" onClick={this.handleClick.bind(this, '123')}>登录</Button>
                    <p>版本号{VERSION}</p>
                </header>
                <p></p>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
