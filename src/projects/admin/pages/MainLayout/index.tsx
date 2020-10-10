import * as React from 'react';
import { Layout, message, Button,Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { renderRoutes, matchRoutes } from '@/projects/admin/router/router-config';
import { connect } from "react-redux";
import { getUserAction, loginOut } from '@/projects/admin/store/action'
import logo from "@/assets/images/logo.svg";
import SiderMenu from './SiderMenu'
import { CSSTransition,TransitionGroup } from 'react-transition-group'

const styles = require('./index.module.less');

const { Header, Footer, Sider, Content } = Layout;
export interface IAppProps {

}

export interface IAppState {
  collapsed: boolean,
  show: boolean
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

class App extends React.Component<any, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      collapsed: false,
      show: false
    }
  }
  componentDidMount() {
    this.props.requestUser();
    this.setState({
      show: !this.state.show
    })
  }
  handleClick = () => {
    this.props.loginOut();
 }
 onCollapse = (collapsed: boolean) => {
  this.setState({ collapsed });
}
showWrap = () => {     
  this.setState({
    show: true
  })
}
addListener = () => {

}
  public render() {
    const { location } = this.props;
    const { routes } = this.props.route;
    const matchedRoutes = matchRoutes(routes, location.pathname);
    const extraBreadcrumbItems = matchedRoutes.map((item: any, index: number) => {
      return (
        <Breadcrumb.Item key={item.route.path}>
          {index === matchedRoutes.length - 1? item.route.breadcrumbName : <Link to={item.route.path}>{item.route.breadcrumbName}</Link>}
        </Breadcrumb.Item>
      );
    })
    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <Link to="/">Home</Link>
      </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);
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
              <TransitionGroup>
                <CSSTransition
                    in={location.pathname != null}
                    timeout={300}
                    classNames="page"
                    unmountOnExit
                    key={location.pathname}
                  >
                    <div className="page" >
                      {renderRoutes(routes)} 
                    </div>
                  </CSSTransition>
                </TransitionGroup>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
              </Content>
            </Layout>
          </Layout>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
