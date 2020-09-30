import * as React from 'react';
import { Layout, message, Button,Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import { renderRoutes } from '@/projects/admin/router/router-config';

import { connect } from "react-redux";
import { getUserAction, loginOut } from '@/projects/admin/store/action'
import logo from "@/assets/images/logo.svg";
import SiderMenu from './SiderMenu'
const styles = require('./index.module.less');

const { Header, Footer, Sider, Content } = Layout;
export interface IAppProps {

}

export interface IAppState {
  collapsed: boolean
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
  
})
const breadcrumbNameMap = {
  '/admin': 'subna1',
  '/admin/index': '首页',
  '/admin/order': '订单',
  '/admin/finance': '财务',
  '/admin/finance/detail': 'Detail',
}
class App extends React.Component<any, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      collapsed: false
    }
  }
  componentDidMount() {
    this.props.requestUser();
  }
  handleClick = () => {
    this.props.loginOut();
 }
 onCollapse = (collapsed: boolean) => {
  console.log(collapsed);
  this.setState({ collapsed });
}
  public render() {
    const { location } = this.props;
    const pathSnippets = location.pathname.split('/').filter((i: any) => i);
    const extraBreadcrumbItems = pathSnippets.map((_: any, index: number) => {
      const url:string = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          {index === pathSnippets - 1? (breadcrumbNameMap as any)[url] : <Link to={url}>{(breadcrumbNameMap as any)[url]}</Link>}
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <Link to="/">Home</Link>
      </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);
    const { routes } = this.props.route;
    return (
      <Layout>
        <Header className={styles.header}>
        <img src={logo} className={styles['app--logo']} alt="logo" />
        <Button className={styles.btn_logout} type="primary" onClick={() => this.props.loginOut()}>退出登录</Button>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">首页</Menu.Item>
            <Menu.Item key="2">订单</Menu.Item>
            <Menu.Item key="3">财务</Menu.Item>
          </Menu>
        </Header>
         <Layout className={styles.container}>
            <Sider className="site-layout-background" width={200} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
               <SiderMenu  {...this.props}></SiderMenu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '18px 0' }}>
                {breadcrumbItems}
              </Breadcrumb>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 360,
                }}
              >
                {renderRoutes(routes)}
              </Content>
              <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
          </Layout>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
