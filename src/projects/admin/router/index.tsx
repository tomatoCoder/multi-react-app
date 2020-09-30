


/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 13:36:58
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-30 16:47:19
 */
import React from "react";
import { Provider } from "react-redux";
import { Router, Switch } from "react-router-dom";
import configureStore from "../store";
// import { renderRoutes } from "react-router-config";
import { renderRoutes } from '@/projects/admin/router/router-config';
import routes from './routes'
import history from '@/utils/history'
const store = configureStore();

export const RouterView =
    <Provider store={store}>
        <Router history={history}>
          <Switch>
            {renderRoutes(routes)} 
          </Switch>
          {/* <Redirect exact from="/" to="/admin" /> */}
        </Router> 
    </Provider>

