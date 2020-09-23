import * as React from 'react';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export interface IAppProps {
}

export interface IAppState {
}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
    }
  }


  public render() {
    return (
        <Layout>
            <Sider>Sider</Sider>
            <Layout>
                <Header>Header</Header>
                <Content> {this.props.children}子路由</Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    );
  }
}
