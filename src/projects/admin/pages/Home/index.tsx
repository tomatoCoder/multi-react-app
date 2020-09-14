/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 14:43:34
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-14 16:22:11
 */
import React, { Component } from "react";
import logo from "@/assets/images/logo.svg";
import "@/assets/styles/index.less";
import "./index.less";
import { isDef } from "@/utils/base";
import { Link } from 'react-router-dom';
import { message, Button } from 'antd';
import { VERSION } from "@/config/project.config";
import { connect } from "react-redux";
import {addUser} from '@/projects/admin/store/action'
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
        debugger
        let u = 1;
        console.log(isDef(u))
        
    }
    handleClick() {
       
       this.setState({
           name: 'paidaxing',
           
       });
       this.props.setUserInfo();
    }
    render() {
        return (
            <div className="App-pc">
                <header className="App-header">
                    <p  className="test">{this.props.userInfo.name? this.props.userInfo.name : '未登录'}</p>
                    <img src={logo} className="App-logo" alt="logo" />
                    <Link to="/admin/order" style={{color:'black'}}>
                    <div>点击跳转到order</div>
                    </Link>
                    <Button type="primary" onClick={() => this.handleClick()}>登录</Button>
                    <p>版本号{VERSION}</p>
                </header>
                <p></p>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
