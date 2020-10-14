/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-10-14 10:25:01
 * @LastEditors: qingyang
 * @LastEditTime: 2020-10-14 13:40:25
 */
import * as React from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    DatePicker,
    Row, Col,
    Select,  } from 'antd';

const styles = require('./index.module.less');
const { Option } = Select;
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }
  onFormLayoutChange = (e) => {
      debugger
  }
  handleChange = (e) => {
      debugger
  }
   onFinish = values => {
       debugger
    console.log('Received values of form: ', values);
  };
 render() {
    return (
      <div className={styles.serach_wrap}>
        <Form
            labelCol={{ span: 5 }}
            // wrapperCol={{
            //     span: 14,
            //   }}
            layout="horizontal"                     
            onValuesChange={this.onFormLayoutChange}
            ref="forms"
            onFinish={this.onFinish}
        >
            <Row>
                <Col xs={12} sm={12} md={12} lg={8} xl={6}>
                    <Form.Item label="订单编号" name="orderNo">
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={8} xl={6}>
                    <Form.Item label="商品编号" name="goodNo">
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={8} xl={6}>
                    <Form.Item label="订单类型" name="orderType">
                        <Select defaultValue="lucy"                    >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>
                                Disabled
                            </Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={8} xl={6}>
                    <Form.Item label="时间" name="time">
                        <DatePicker style={{width:'100%'}}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">
                    Search
                </Button>
                <Button
                    style={{ margin: '0 8px' }}
                    onClick={() => {
                        let data = this.refs.forms;
                        data.resetFields();
                    //   form.resetFields();
                    }}
                >
                    Clear
                </Button>
                </Col>
            </Row>
        </Form>
      </div>
    );
  }
}
