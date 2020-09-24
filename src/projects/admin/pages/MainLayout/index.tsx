import * as React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
const { Header, Footer, Sider, Content } = Layout;

export interface IAppProps {

}

export interface IAppState {
}

export default class App extends React.Component<any, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {

    }
  }


  public render() {
    const { routes } = this.props.route;
    return (
      <Layout>
        <Sider>
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
          <Header>Header</Header>
          <Content>  {renderRoutes(routes)} </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}
