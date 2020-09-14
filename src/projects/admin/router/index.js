


/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 13:36:58
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-14 18:04:31
 */
import React, { Suspense, lazy }from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import configureStore from "../store";
import Home from  '../pages/Home/index';
import Order from  '../pages/Order/index';
import OrderDetail from  '../pages/OrderDetail/index';
import Login from  '../pages/Login/index';
import  '@/config/ui.cofig'

const store = configureStore();

// const loadRouter = (name: string) => {
//     return lazy(() => import(/* webpackChunkName: "about" */ `../views/${name}/index.vue`))
//   }

  
// const A = lazyLoad(() => import("../components/a"))
// const B = lazyLoad(() => import("../components/b"))
// const C = lazyLoad(() => import("../components/c"))
// const D = lazyLoad(() => import("../components/d"))

export const RouterView =
    <Provider store={store}>
    <Router>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path='/admin' component={Home}/>
        <Route exact path='/admin/order' component={Order}/>
        <Route path='/admin/order/order-detail' component={OrderDetail}/>
        <Route exact path='/login' component={Login}/>
        <Redirect to='/'></Redirect>
    </Switch>
    </Router>
    </Provider>

