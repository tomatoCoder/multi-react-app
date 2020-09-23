/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-23 17:35:58
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-23 17:47:04
 */
import React, { Suspense, lazy }from "react";
const loadRouter = (name: string) => {
    return lazy(() => import(/* webpackChunkName: "admin" */ `../pages/${name}/index`))
}

const Login = loadRouter('Login');
const Home = loadRouter('Home');
const Order = loadRouter('Order');
const OrderDetail = loadRouter('OrderDetail');
const Notfound = loadRouter('Notfound');
const MainLayout = loadRouter('MainLayout');
const routes = [
    { path: '/404', component: Notfound },
    { path: '/login', component: Login },
    //嵌套路由
    { path: '/admin', component: MainLayout,
      routes: [
        { path: "/admin/index", component: Home },
        { path: "/admin/order", component: Order },
        { path: "/admin/order-detail", component: OrderDetail },
      ]
    },
  ]
   
  export default routes