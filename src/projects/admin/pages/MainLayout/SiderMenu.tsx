import * as React from 'react';
import { Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

export interface IAppProps {
}

export interface IAppState {
    openKeys: string,
    selectedKeys: string
}

export default class SliderMenu extends React.Component<any, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
        openKeys:'',
        selectedKeys: 'r'
      }
  }
  menuClick = (res:any) => {
    let { item, key, keyPath, domEvent } = res;
    this.setState({
       selectedKeys: key
     })
     let path = keyPath.reverse().join('');
     this.props.history.push(path)
  }
  onOpenChange = () => {
 
  }
  componentDidMount() {
      let pathname = this.props.history.location.pathname;
      let rank = pathname.split('/');
      switch (rank.length) {
        case 2:  //一级目录
            this.setState({
              selectedKeys: pathname
            })
            break;
        case 3: //二级目录，要展开一个subMenu
        console.log(`/${rank[2]}`)
        debugger
            this.setState({
                selectedKeys: `/${rank[2]}`,
                openKeys: rank.slice(0, 2).join('/')
            })
            break;
        case 4: //三级目录，要展开两个subMenu
            this.setState({
                selectedKeys: rank[3],
                // openKeys: [rank.slice(0, 2).join('/'), rank.slice(0, 3).join('/')]
            })
            break; 
      }
  }
  public render() {
    let menuJson = [{
        path :'/admin',
        name: 'subna1',
        children: [{
          path: '/index',
          name: '首页',
        },
        {
          path: '/order',
          name: '订单',
        },
        {
          path: '/finance',
          name: '财务',
        }]
      },
      {
        path :'/subnav2',
        name: 'subnav2',
        children: [{
          path: '/1',
          name: '子菜单1',
        },
        {
          path: '/2',
          name: '子菜单2',
        },
        {
          path: '/3',
          name: '子菜单3',
        }]
      }  
    ]
    return (
        <Menu
          mode="inline"
          openKeys={[this.state.openKeys]}
          selectedKeys={[this.state.selectedKeys]}
          // onOpenChange={this.onOpenChange}
          style={{ height: '100%' }}
          onClick={this.menuClick}
        >
        {
          menuJson.map((item) => {
             return <SubMenu key={item.path} icon={<UserOutlined />} title={item.name}>
                        {item.children ?
                        item.children.map((child) => {
                          return  <Menu.Item key={child.path}>{child.name}</Menu.Item>
                        }) : null
                             
                      }
                    </SubMenu> 
          })
        }
      </Menu>
    );
  }
}
