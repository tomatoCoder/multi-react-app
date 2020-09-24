


/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 13:36:58
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-24 13:09:03
 */
import React, { Suspense }from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import configureStore from "../store";
import { renderRoutes } from "react-router-config";
import routes from './routes'
const store = configureStore();

export const RouterView =
  <Suspense fallback={<div>loading...</div>}>
    <Provider store={store}>
        <Router>
          <Switch>
            {renderRoutes(routes)}
          </Switch>
        </Router>   
    </Provider>
  </Suspense>

