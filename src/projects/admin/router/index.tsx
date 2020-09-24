


/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 13:36:58
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-24 14:51:26
 */
import React, { Suspense, lazy }from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import configureStore from "../store";
import { renderRoutes } from "react-router-config";
import routes from './routes'
const store = configureStore();

const loadRouter = (name: string) => {
  return lazy(() => import(/* webpackChunkName: "admin" */ `../pages/${name}/index`))
}
const Login = loadRouter('Login');

export const RouterView =
  <Suspense fallback={<div>loading...</div>}>
    <Provider store={store}>
      {
        localStorage.getItem('token') ? (
          <Router>
            <Switch>
              {renderRoutes(routes)} 
            </Switch>
            <Redirect from="/" to="/admin"/>
          </Router>
        ): ( <Router>
          <Switch>
            <Route path='/login' exact component={Login}></Route>
            <Redirect from="/" to="/login"/>
          </Switch>
        </Router>)
      }   
    </Provider>
  </Suspense>

