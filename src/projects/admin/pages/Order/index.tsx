/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 14:43:34
 * @LastEditors: qingyang
 * @LastEditTime: 2020-10-09 15:36:25
 */
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import './index.less'
const mapStateToProps = (state: any) => {
    return {
      userInfo: state.userInfo
    };
  };
const mapDispatchToProps = (dispatch: any) => ({
});


 class Order extends Component<any,any> {
    constructor(props: any) {
        super(props);
        this.state = {
            focused: true  
        }
      }
    addListener = () => {

    }
    showWrap = () => {   
        this.setState({
            focused: !this.state.focused
        })
    }
    render() {
        return (
            <div className="App-pc">
                <div className="wrap">123</div>
                <p>name:{this.props.userInfo.name}</p>
                我是订单页面
                <Link to="/admin/subna1/order/order-detail/123">
                    <div>点击跳转到orderDetail</div>
                </Link>
                <Link to="/admin" style={{color:'black'}}>
                    <div>回到首页</div>
                </Link>
                <Button onClick={this.props.setUserInfo}>获取用户信息</Button>
            </div>
            
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)