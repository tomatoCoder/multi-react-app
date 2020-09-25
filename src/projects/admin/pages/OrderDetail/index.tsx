/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 14:43:34
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-25 13:49:15
 */
import React, { Component } from "react";

export default class OrderDetail extends Component<any,any> {
    componentDidMount() {
        console.log(this.props.match.params.id); 
    }

    render() {
        return (
            <div className="App-pc">
                我是订单页面详情
            </div>
        );
    }
}
