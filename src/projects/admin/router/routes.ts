/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-23 17:35:58
 * @LastEditors: qingyang
 * @LastEditTime: 2020-10-09 17:59:28
 */
import loadable from '@/utils/loadable'
const loadRouter = (name: string) => {
    return loadable(() => import(/* webpackChunkName: "admin" */ `../pages/${name}/index`))
}

const Login = loadRouter('Login');
const Home = loadRouter('Home');
const Order = loadRouter('Order');
const OrderDetail = loadRouter('OrderDetail');
const Notfound = loadRouter('Notfound');
const Finance = loadRouter('Finance');
const MainLayout = loadRouter('MainLayout');
const Subna1 = loadRouter('Subna1');
const routes = [
    { path: '/login', component: Login },
    //嵌套路由
    { path: '/admin/', component: MainLayout,
      routes: [
        { path: "/admin/index", component: Home ,exact: true, breadcrumbName: '首页'},
        { path: "/admin/subna1", component: Subna1, breadcrumbName: 'subna1',routes: [
          { path: "/admin/subna1/order", component: Order, exact: true, breadcrumbName: '订单页'},
        ]},
        { path: "/admin/subna1/finance/detail", component: Finance,exact: true, breadcrumbName: '详情页'},
        { path: "/admin/subna1/order/order-detail/:id", component: OrderDetail, exact: true},
        { path: "/admin", redirect: "/admin/index", exact: true},
      ]
    },
    { path: '/', redirect: "/admin", exact: true},
    { path: '*', component: Notfound },
  ]
   
  export default routes