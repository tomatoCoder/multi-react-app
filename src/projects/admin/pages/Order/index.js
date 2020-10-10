/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 14:43:34
 * @LastEditors: qingyang
 * @LastEditTime: 2020-10-10 17:54:21
 */
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Table, Tooltip  } from 'antd';
import { connect } from "react-redux";
import { renderRoutes } from '@/projects/admin/router/router-config';

import './index.less'
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
    onChange = (pagination, filters, sorter, extra) => {
      debugger
      console.log('params', pagination, filters, sorter, extra);
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
                debugger
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: (record) => ({
              disabled: record.age === 32, // Column configuration not to be checked
              name: record.name,
            }),
          };
        return (
            location.pathname !== routes[0].path ?
                <div className="App-pc">
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
                </div>:
                renderRoutes(routes)   
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)