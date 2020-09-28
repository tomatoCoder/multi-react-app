


/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 13:36:58
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-28 09:53:53
 */
import React, { Suspense }from "react";
import { Provider } from "react-redux";
import { Router, Switch, Route, Redirect  } from "react-router-dom";
import configureStore from "../store";
import { renderRoutes } from "react-router-config";
import routes from './routes'
import history from '@/utils/history'
import loadable from '@/utils/loadable'

const loadRouter = (name: string) => {
    return loadable(() => import(/* webpackChunkName: "admin" */ `../pages/${name}/index`))
}
const MainLayout = loadRouter('MainLayout');

const store = configureStore();

export const RouterView =
    <Provider store={store}>
        <Router history={history}>
          <Switch>
            {renderRoutes(routes)} 
          </Switch>
          <Redirect exact from="/" to="/admin" />
        </Router> 
    </Provider>

