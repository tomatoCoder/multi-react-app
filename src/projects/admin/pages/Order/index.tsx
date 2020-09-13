/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 14:43:34
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-11 16:04:12
 */
import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class Order extends Component {
    componentDidMount() {
    }
    render() {
        return (
            <div className="App-pc">
                我是订单页面
                <Link to="/admin/order/order-detail" style={{color:'black'}}>
                    <div>点击跳转到orderDetail</div>
                </Link>
                <Link to="/admin" style={{color:'black'}}>
                    <div>回到首页</div>
                </Link>
            </div>
        );
    }
}
