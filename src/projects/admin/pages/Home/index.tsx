/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 14:43:34
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-24 16:20:20
 */
import React, { Component } from "react";
import logo from "@/assets/images/logo.svg";
// import "./index.module.less";

import { isDef } from "@/utils/base";
import { Link } from 'react-router-dom';
import { VERSION } from "@/config/project.config";
import { connect } from "react-redux";
const styles = require('./index.module.less');

interface comState {
    name: string
}
interface comProps {
    userInfo: {
        name: string
    },
    loginOut: Function
}
const mapStateToProps = (state: any) => {
    return {
      userInfo: state.userInfo
    };
  };
const mapDispatchToProps = (dispatch: any) => ({
});
class App extends Component<any, comState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: '123'   
        }
    }
    componentDidMount() {
        console.log(this.props);
        let u = 1;
        console.log(isDef(u));
        var array = [1];
        var other = (React as any)._.concat(array, 2, [3], [[4]]);
        console.log(other);
    }
    handleClick = (test: string) => {
       this.setState({
           name: 'paidaxing',
           
       });
       this.props.history.push('/login');
       this.props.loginOut();
    }
    render() {
        let test = 'wrap--test'
        return (
            <div className={styles.app}>
                <header className="App-header">
                    <div className={`${styles[test]} ${styles.line2}`}>1231312312321安静的干哈多久啊是都很难哈京东干啥 3123123</div>
                    <div className="wrap--test"></div>
                    <p  className="test">{this.props.userInfo.name? this.props.userInfo.name : '未登录'}</p>
                    <img src={logo} className={styles['app--logo']} alt="logo" />
                    <Link to="/admin/order/123" style={{color:'black'}}>
                    <div>点击跳转到order</div>
                    </Link>
                    <p>版本号{VERSION}</p>
                </header>
                <p></p>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
