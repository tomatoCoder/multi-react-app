import * as React from 'react';
import { Layout, message, Button,Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { connect } from "react-redux";
import { getUserAction, loginOut } from '@/projects/admin/store/action'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import logo from "@/assets/images/logo.svg";
import SiderMenu from './SiderMenu'
const styles = require('./index.module.less');

const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;

export interface IAppProps {

}

export interface IAppState {
  openKeys: string,
  selectedKeys: string
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
      openKeys:'admin',
      selectedKeys: 'order'
    }
  }

  componentDidUpdate(props: any) {
    console.log(props.history);    
  }
  componentDidMount() {
    this.props.requestUser();
  }
  handleClick = () => {
    this.props.loginOut();
 }
 menuClick = (res:any) => {
   let { item, key, keyPath, domEvent } = res;
   debugger
   this.setState({
      selectedKeys: key
    })
  // this.props.history.push(`/admin/${key}`)
 }
 onOpenChange = () => {

 }
  public render() {
    const { routes } = this.props.route;
    return (
      <Layout>
        <Header className="header">
        <img src={logo} className={styles['app--logo']} alt="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">首页</Menu.Item>
            <Menu.Item key="2">订单</Menu.Item>
            <Menu.Item key="3">财务</Menu.Item>
          </Menu>
          <Button className={styles.btn_logout} type="primary" onClick={() => this.props.loginOut()}>退出登录</Button>
        </Header>
       
         <Layout className="site-layout-background">
            <Sider className="site-layout-background" width={200}>
               <SiderMenu  {...this.props}></SiderMenu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
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
