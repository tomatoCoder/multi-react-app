


/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 13:36:58
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-25 16:54:46
 */
import React, { Suspense }from "react";
import { Provider } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";
import configureStore from "../store";
import { renderRoutes } from "react-router-config";
import routes from './routes'
import history from '@/utils/history'
const store = configureStore();

export const RouterView =
  <Suspense fallback={<div>loading...</div>}>
    <Provider store={store}>
        <Router history={history}>
          <Switch>
            {renderRoutes(routes)} 
          </Switch>
        </Router> 
    </Provider>
  </Suspense>

