


/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 13:36:58
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-15 10:31:53
 */
import React, { Suspense, lazy }from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import configureStore from "../store";
const store = configureStore();

const loadRouter = (name: string) => {
    return lazy(() => import(/* webpackChunkName: "admin" */ `../pages/${name}/index`))
}

const Login = loadRouter('Login');
const Home = loadRouter('Home');
const Order = loadRouter('Order');
const OrderDetail = loadRouter('OrderDetail');

export const RouterView =
  <Suspense fallback={<div>loading...</div>}>
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
  </Suspense>
