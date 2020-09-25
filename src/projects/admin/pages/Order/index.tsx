/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 14:43:34
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-25 13:57:09
 */
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { connect } from "react-redux";
import './index.less'
const mapStateToProps = (state: any) => {
    return {
      userInfo: state.userInfo
    };
  };
const mapDispatchToProps = (dispatch: any) => ({
});

 class Order extends Component<any,any> {
    render() {
        return (
            <div className="App-pc">
                <div className="wrap">123</div>
                <p>name:{this.props.userInfo.name}</p>
                我是订单页面
                <Link to="/admin/order/order-detail/123">
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