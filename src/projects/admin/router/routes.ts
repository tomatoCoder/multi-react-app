/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-23 17:35:58
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-28 09:40:51
 */
import { lazy }from "react";
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
const routes = [
    { path: '/login', component: Login },
    //嵌套路由
    { path: '/admin', component: MainLayout,
      routes: [
        { path: "/admin", component: Home ,exact: true},
        { path: "/admin/index", component: Home ,exact: true},
        { path: "/admin/order", component: Order, exact: true},
        { path: "/admin/finance", component: Finance,exact: true},
        { path: "/admin/order/order-detail/:id", component: OrderDetail, exact: true}
      ]
    },
    { path: '/', component: MainLayout },
    { path: '*', component: Notfound },
  ]
   
  export default routes