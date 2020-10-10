import * as React from 'react';
import { Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

export interface IAppProps {
}

export interface IAppState {
    rootSubmenuKeys: string[]
    openKeys: string[],
    selectedKeys: string
}

export default class SliderMenu extends React.Component<any, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
        rootSubmenuKeys: [],
        openKeys:[],
        selectedKeys: ''
      }
  }
  menuClick = (res:any) => {
    let { item, key, keyPath, domEvent } = res;
    this.setState({
       selectedKeys: key
     })
     this.props.history.push(key)
  }
  onOpenChange = (openKeys: any) => {
    this.setState({ openKeys });
     
  }
  componentDidMount() {
    this.initSliderMenu();  
  }
  initSliderMenu = () => {
    let pathname = this.props.history.location.pathname;
    let rank = pathname.split('/');
      switch (rank.length) {
        case 2:  //一级目录
            this.setState({
              selectedKeys: pathname
            })
            break;
        case 3: //二级目录，要展开一个subMenu
            this.setState({
                selectedKeys: pathname,
                openKeys: [rank.slice(0, 2).join('/')]
            })
            break;
        case 4: //三级目录，要展开两个subMenu
            this.setState({
                selectedKeys: pathname,
                openKeys: [rank.slice(0, 2).join('/'), rank.slice(0, 3).join('/')]
            })
            break; 
      }
  }
  renderMenu = (menuList: Array<any>) => {
    return menuList.map(item => {
      if (!item.children) {
          return (
              <Menu.Item key={item.path}  icon={item.icon ?  <item.icon /> : null}>
                 {item.name}
              </Menu.Item>
          )
      } else {
        
          this.state.rootSubmenuKeys.push(item.path);
          console.log(this.state.rootSubmenuKeys);
          const path = this.props.location.pathname
          // 查找一个与当前请求路径匹配的子Item
          const cItem = item.children.find((cItem: any) => path.indexOf(cItem.key) === 0)
          // 如果存在, 说明当前item的子列表需要打开
          if (cItem) {
            this.setState({
              openKeys: [cItem.path],
            });
          }
          return (
              <SubMenu
                  key={item.path}
                  icon={item.icon? <item.icon /> : null}
                  title={item.name}
              >
                  {this.renderMenu(item.children)}
              </SubMenu>
          )
      }
  })
}
  public render() {
    let menuJson = [
      
      {
        path: '/admin/index',
        name: '首页',
        icon: LaptopOutlined
      },{
        path :'/admin/subna1',
        name: 'subna1',
        icon: UserOutlined,
        children: [
        {
          path: '/admin/subna1/order',
          name: '订单',
        },
        {
          path: '/admin/subna1/finance',
          name: '财务',
          children: [{
            path: '/admin/subna1/finance/detail',
            name: '详情'
          }]
        }]
      },
      {
        path :'/subnav2',
        name: 'subnav2',
        icon: NotificationOutlined
      }  
    ]
    return (
        <Menu
          mode="inline"
          openKeys={this.state.openKeys}
          selectedKeys={[this.state.selectedKeys]}
          onOpenChange={this.onOpenChange}
          style={{ height: '100%' }}
          onClick={this.menuClick}
        >
        {
          this.renderMenu(menuJson)
        }
      </Menu>
    );
  }
}
