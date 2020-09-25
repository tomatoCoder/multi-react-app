import * as React from 'react';
import { Layout, message, Button } from 'antd';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { connect } from "react-redux";
import {loginOut, addUser, User} from '@/projects/admin/store/action'

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
  setUserInfo: (user: User | null) => {
    if(user) {
        dispatch(addUser(user));
    }else {
       dispatch(loginOut());
    }
      
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

  componentDidMount() {
    // TODO:网络请求获取用户信息
    let user = {
      id:1,
      name: '派大星',
    }
    this.props.setUserInfo(user); 
  }
  handleClick = () => {
    this.props.loginOut();
 }
  public render() {
    const { routes } = this.props.route;
    return (
      <Layout>
        <Sider>
          <li>
            <Link to="/admin/index">
              首页
            </Link>
          </li>
          <li>
            <Link to="/admin/order">
              订单模块
            </Link>
          </li>
          <li>
            <Link to="/admin/finance">
              财务模块
            </Link>
          </li>
        </Sider>
        <Layout>
          <Header>Header 
            <Button type="primary" onClick={() => this.props.loginOut()}>退出登录</Button>
          </Header>
          <Content>  {renderRoutes(routes)} </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
