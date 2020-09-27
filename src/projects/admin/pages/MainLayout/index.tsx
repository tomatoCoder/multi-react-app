import * as React from 'react';
import { Layout, message, Button,Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { connect } from "react-redux";
import {loginOut, addUser, User} from '@/projects/admin/store/action'
import { getUserAction } from '@/projects/admin/store/action'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;

export interface IAppProps {

}

export interface IAppState {
}

const mapStateToProps = (state: any) => {
  return {
    userInfo: state.userInfo
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  requestUser: (params: any) => {
    dispatch(getUserAction(params))
  },
  loginOut: () => {
      message.info('退出成功');
      dispatch(loginOut());
  },
  
});
class App extends React.Component<any, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {

    }
  }

  componentDidUpdate(props: any) {
    console.log(props.history);
    this.props.requestUser();
  }
  handleClick = () => {
    this.props.loginOut();
 }
 menuClick = (res:any) => {
   let { item, key, keyPath, domEvent } = res;
  this.props.history.push(`/admin/${key}`)
 }
  public render() {
    const { routes } = this.props.route;
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">首页</Menu.Item>
            <Menu.Item key="2">订单</Menu.Item>
            <Menu.Item key="3">财务</Menu.Item>
          </Menu>
          <Button type="primary" onClick={() => this.props.loginOut()}>退出登录</Button>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                onClick={this.menuClick}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                  <Menu.Item key="index">首页</Menu.Item>
                  <Menu.Item key="order">订单</Menu.Item>
                  <Menu.Item key="finance">财务</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>{renderRoutes(routes)}</Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
