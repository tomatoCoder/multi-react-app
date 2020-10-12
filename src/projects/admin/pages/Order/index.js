/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 14:43:34
 * @LastEditors: qingyang
 * @LastEditTime: 2020-10-12 17:17:40
 */
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Table, Tooltip, Button  } from 'antd';
import { connect } from "react-redux";
import { renderRoutes } from '@/projects/admin/router/router-config';
import Texty from 'rc-texty';
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one';
import BezierPlugin from 'rc-tween-one/lib/plugin/BezierPlugin';
import PathPlugin from 'rc-tween-one/lib/plugin/PathPlugin';
import 'rc-texty/assets/index.css'

import './index.less'
TweenOne.plugins.push(PathPlugin);

const mapStateToProps = (state) => {
    return {
      userInfo: state.userInfo
    };
  };
const mapDispatchToProps = (dispatch) => ({
});


 class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: true,
            show: false,
            items: [
              <li key="0" className="li_item"></li>,
              <li key="1" className="li_item"></li>,
              <li key="2" className="li_item"></li>
            ], 
            path: `M3.5,175V19c0,0,1-8.75,8.25-11.5S26.5,8,26.5,8l54,53.25
      c0,0,7,8.25,14.5,0.75s51.5-52.25,51.5-52.25s9.75-7,18-2s7.75,11.5,7.75,11.5
      v104c0,0-0.5,15.75-15.25,15.75s-15.75-15-15.75-15V68.5c0,0-0.125-9.125-6-3.25
      s-36.25,36-36.25,36s-11.625,11.875-24-0.5S40.25,65.5,40.25,65.5
      s-5.75-5.25-5.75,2s0,107.25,0,107.25s-0.75,13.5-14.5,13.5S3.5,175,3.5,175z`
        }
      }
    addListener = () => {

    }
    showWrap = () => {   
        this.setState({
            focused: !this.state.focused
        })
    }
    onChange = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    }
    onClick = () => {
      this.setState({
        show: !this.state.show
      });
    }
    enter = (e) => {
      debugger
      switch (e.index) {
        case 0:
          return {
            rotate: 90,
            opacity: 0,
            y: -60,
          };
        case 10:
        case 1:
          return {
            y: -60,
            x: -10,
            opacity: 0,
          };
        case 9:
        case 2:
          return {
            y: -60,
            x: 20,
            opacity: 0,
          };
        case 3:
          return {
            y: 60,
            opacity: 0,
          };
        case 8:
        case 4:
          return {
            x: 30,
            opacity: 0,
          };
        case 5:
          return {
            enter: [
              {
                scale: 2,
                opacity: 0,
                type: 'set',
              },
              { scale: 1.2, opacity: 1, duration: 300 },
              { scale: 0.9, duration: 200 },
              { scale: 1.05, duration: 150 },
              { scale: 1, duration: 100 },
            ],
            leave: {
              opacity: 0, scale: 0,
            },
          };
        case 6:
          return {
            scale: 0.8,
            x: 30,
            y: -10,
            opacity: 0,
          };
        case 7:
          return {
            scale: 0.8,
            x: 30,
            y: 10,
            opacity: 0,
          };
        default:
          return {
            opacity: 0,
          };
      }
    }
    onRemove = () => {
      let items = this.state.items;
      items.splice(items.length - 1, 1);
      this.setState({
        show: true,
        items,
      });
    }
    render() {
        const { routes } = this.props.route;
        const { location } = this.props;
        const columns = [
          {
            title: 'Name',
            dataIndex: 'name',
            width: 60,
            fixed: 'left',
            ellipsis: {
              showTitle: false,
            },
            render: text => (
              <Tooltip placement="topLeft" title={text}>
                {text}
              </Tooltip>
            ),
          },
          {
            title: 'Chinese Score',
            dataIndex: 'chinese',
            width:300,
            sorter: {
              compare: (a, b) => a.chinese - b.chinese,
              multiple: 1,
            },
          },
          {
            title: 'Chinese Score',
            dataIndex: 'chinese',
            width:300,
            sorter: {
              compare: (a, b) => a.chinese - b.chinese,
              multiple: 1,
            },
          },
          {
            title: 'Chinese Score',
            dataIndex: 'chinese',
            width:300,
            sorter: {
              compare: (a, b) => a.chinese - b.chinese,
              multiple: 1,
            },
          },
          {
            title: 'Chinese Score',
            dataIndex: 'chinese',
            width:300,
            sorter: {
              compare: (a, b) => a.chinese - b.chinese,
              multiple: 1,
            },
          },
          {
            title: 'Chinese Score',
            dataIndex: 'chinese',
            width:300,
            sorter: {
              compare: (a, b) => a.chinese - b.chinese,
              multiple: 1,
            },
          },
          {
            title: 'Chinese Score',
            dataIndex: 'chinese',
            width:300,
            sorter: {
              compare: (a, b) => a.chinese - b.chinese,
              multiple: 1,
            },
          },
          {
            title: 'Math Score',
            dataIndex: 'math',
            width:300,
            sorter: {
              compare: (a, b) => a.math - b.math,
              multiple: 3,
            },
            render: (value, row, index) => {
              const obj = {
                children: value,
                props: {},
              };
              if (index === 2) {
                obj.props.rowSpan = 2;
              }
              // These two are merged into above cell
              if (index === 3) {
                obj.props.rowSpan = 0;
              }
              if (index === 4) {
                obj.props.colSpan = 0;
              }
              return obj;
            },
          },
          {
            title: 'English Score',
            dataIndex: 'english',
            width:300,
            sorter: {
              compare: (a, b) => a.english - b.english,
              multiple: 1,
            },
          },
        ];
        
        const data = [
          {
            key: '1',
            name: 'John Brown',
            chinese: 98,
            math: 60,
            english: 70,
          },
          {
            key: '2',
            name: 'Jim Green',
            chinese: 98,
            math: 66,
            english: 89,
          },
          {
            key: '3',
            name: 'Joe Black',
            chinese: 98,
            math: 90,
            english: 70,
          },
          {
            key: '4',
            name: 'Jim Red',
            chinese: 88,
            math: 99,
            english: 89,
          },
          {
            key: '1',
            name: 'John Brown',
            chinese: 98,
            math: 60,
            english: 70,
          },
          {
            key: '2',
            name: 'Jim Green',
            chinese: 98,
            math: 66,
            english: 89,
          },
          {
            key: '3',
            name: 'Joe Black',
            chinese: 98,
            math: 90,
            english: 70,
          },
          {
            key: '4',
            name: 'Jim Red',
            chinese: 88,
            math: 99,
            english: 89,
          },
          {
            key: '1',
            name: 'John Brown',
            chinese: 98,
            math: 60,
            english: 70,
          },
          {
            key: '2',
            name: 'Jim Green',
            chinese: 98,
            math: 66,
            english: 89,
          },
          {
            key: '3',
            name: 'Joe Black',
            chinese: 98,
            math: 90,
            english: 70,
          },
          {
            key: '4',
            name: 'Jim Red',
            chinese: 88,
            math: 99,
            english: 89,
          },
          {
            key: '1',
            name: 'John Brown',
            chinese: 98,
            math: 60,
            english: 70,
          },
          {
            key: '2',
            name: 'Jim Green',
            chinese: 98,
            math: 66,
            english: 89,
          },
          {
            key: '3',
            name: 'Joe Black',
            chinese: 98,
            math: 90,
            english: 70,
          },
          {
            key: '4',
            name: 'Jim Red',
            chinese: 88,
            math: 99,
            english: 89,
          },
          {
            key: '1',
            name: 'John Brown',
            chinese: 98,
            math: 60,
            english: 70,
          },
          {
            key: '2',
            name: 'Jim Green',
            chinese: 98,
            math: 66,
            english: 89,
          },
          {
            key: '3',
            name: 'Joe Black',
            chinese: 98,
            math: 90,
            english: 70,
          },
          {
            key: '4',
            name: 'Jim Red',
            chinese: 88,
            math: 99,
            english: 89,
          },
        ];
          const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: (record) => ({
              disabled: record.age === 32, // Column configuration not to be checked
              name: record.name,
            }),
          };
        return (
            location.pathname !== routes[0].path ?
                <div className="order">
                  <Table 
                      columns={columns} 
                      dataSource={data} 
                      onChange={this.onChange} 
                      size="middle"
                      bordered
                      scroll={{ y: 400, x:1500 }}
                      pagination={{ position: ['none','none'], total: 500, defaultPageSize: 20, defaultCurrent: 2,
                      defaultPageSize:5, showQuickJumper:true, itemRender:(current, type, originalElement)=> {
                        if (type === 'prev') {
                          return <a>Previous</a>;
                        }
                        if (type === 'next') {
                          return <a>Next</a>;
                        }
                        return originalElement;
                      }}}
                      expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.english}</p>,
                        rowExpandable: record => record.name !== 'Not Expandable',
                      }}
                      title={() => <div>
                        我是表头
                      </div>}
                      />
                    <Link to="/admin/subna1/order/order-detail">
                        <div>点击跳转到orderDetail</div>
                    </Link>
                    <Button onClick={this.onClick}>改变文字动画</Button>
                    <Button onClick={this.onRemove }>remove</Button>
                    <Texty type="flash">{this.state.show && 'Ant Motion'}</Texty>
                    <TweenOne
                        animation={{ 
                          path: `M3.5,175V19c0,0,1-8.75,8.25-11.5S26.5,8,26.5,8l54,53.25
                          c0,0,7,8.25,14.5,0.75s51.5-52.25,51.5-52.25s9.75-7,18-2s7.75,11.5,7.75,11.5
                          v104c0,0-0.5,15.75-15.25,15.75s-15.75-15-15.75-15V68.5c0,0-0.125-9.125-6-3.25
                          s-36.25,36-36.25,36s-11.625,11.875-24-0.5S40.25,65.5,40.25,65.5
                          s-5.75-5.25-5.75,2s0,107.25,0,107.25s-0.75,13.5-14.5,13.5S3.5,175,3.5,175z`,
                          // x: 200, 
                          // scale: 0.5, 
                          // rotate: 360,
                          duration: 5000,
                                                }}
                        // repeat={-1}
                        className="code-box-shape"
                    />
               
                    <QueueAnim className="demo-content" 
                      key="demo"
                      type={[ 'left','top']}
                      ease={['easeOutQuart', 'easeInOutQuart']}
                      animConfig={[
                        { opacity: [0.5, 0.5], translateY: [0, 200] }
                      ]}
                      >
          {this.state.show ? 
            this.state.items : null}
        </QueueAnim>
                </div>:
                renderRoutes(routes)   
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)