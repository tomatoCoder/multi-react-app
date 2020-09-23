


/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 13:36:58
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-23 17:56:19
 */
import React, { Suspense, lazy }from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import configureStore from "../store";
import { renderRoutes } from "react-router-config";
import routes from './routes'
const store = configureStore();

const loadRouter = (name: string) => {
    return lazy(() => import(/* webpackChunkName: "admin" */ `../pages/${name}/index`))
}

const Login = loadRouter('Login');
const Home = loadRouter('Home');
const Order = loadRouter('Order');
const OrderDetail = loadRouter('OrderDetail');
const Notfound = loadRouter('Notfound');
const MainLayout = loadRouter('MainLayout');


export const RouterView =
  <Suspense fallback={<div>loading...</div>}>
    <Provider store={store}>
        <Router>
            {renderRoutes(routes)}
        </Router>   
    </Provider>
  </Suspense>

