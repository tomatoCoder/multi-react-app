/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 14:43:34
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-25 13:56:51
 */
import React, { Component } from "react";
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
    componentDidMount() {
        console.log(this.props.match.params.id);
    }
    render() {
        return (
            <div className="App-pc">
                财务模块
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)