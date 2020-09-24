/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 14:43:34
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-24 11:24:40
 */
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { connect } from "react-redux";
import './index.less'
import { renderRoutes } from 'react-router-config';

const mapStateToProps = (state: any) => {
    return {
      userInfo: state.userInfo
    };
  };
const mapDispatchToProps = (dispatch: any) => ({
});

 class Order extends Component<any,any> {
    componentDidMount() {
        console.log(this.props.match.params.id);
    }
    render() {
        debugger
        return (
            <div className="App-pc">
                财务模块
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)