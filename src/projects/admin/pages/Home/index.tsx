/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 14:43:34
 * @LastEditors: qingyang
 * @LastEditTime: 2020-10-12 15:28:29
 */
import React, { Component } from "react";
import logo from "@/assets/images/logo.svg";
// import "./index.module.less";

import { Link } from 'react-router-dom';
import { VERSION } from "@/config/project.config";
import { connect } from "react-redux";
import {  Button } from 'antd';
import { CSSTransition } from 'react-transition-group'
import Texty from 'rc-texty';

const styles = require('./index.module.less');

interface comState {
    name: string,
    focused: boolean,
    show: boolean
}
interface comProps {
    userInfo: {
        name: string,
    },
    loginOut: Function
}
const mapStateToProps = (state: any) => {
    return {
      userInfo: state.userInfo
    };
  };
class App extends Component<any, comState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: '123',
            focused: false,
            show: false  
        }
    }
    componentDidMount() {
        var array = [1];
        var other = (React as any)._.concat(array, 2, [3], [[4]]);
        console.log(other);
    }
    addListener = () => {

    }
    showWrap = () => {
       
        this.setState({
            focused: !this.state.focused
        })
    }
    onClick = () => {
        this.setState({
          show: !this.state.show
        });
      }
    render() {
        let test = 'wrap--test'
        return (
            <div className={styles.app}>
                <header className="App-header">
                    <CSSTransition in={this.state.focused} timout={500} classNames="star" addEndListener={this.addListener}
　　　　　　　　　　unmountOnExit
　　　　　　　　　　appear={true}>
                        <div className={`${styles[test]} ${styles.line2}`}>1231312312321安静的干哈多久啊是都很难哈京东干啥 3123123</div>
                    </CSSTransition>
                    <div className="wrap--test"></div>
                    <p  className="test">{this.props.userInfo.name? this.props.userInfo.name : '未登录'}</p>
                    <p  className="test">{this.props.userInfo.phone? this.props.userInfo.phone : '未登录'}</p>
                    <img src={logo} className={styles['app--logo']} alt="logo" />
                    <Link to="/admin/order/123" style={{color:'black'}}>
                    <div>点击跳转到order</div>
                    </Link>
                    <Button onClick={this.showWrap}>展示动画</Button>
                    <p>版本号{VERSION}</p>
                </header>
                <p></p>
            </div>
        );
    }
}

export default connect(mapStateToProps)(App)
