


/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 13:36:58
 * @LastEditors: qingyang
 * @LastEditTime: 2020-10-10 17:51:55
 */
import React from "react";
import { Provider } from "react-redux";
import { Router, Switch } from "react-router-dom";
import configureStore from "../store";
import { renderRoutes } from '@/projects/admin/router/router-config';
import routes from './routes'
import history from '@/utils/history'
import { ConfigProvider } from 'antd'; // 引入ConfigProvider全局化配置
import zhCN from 'antd/es/locale/zh_CN';  // 引入中文包
const store = configureStore();

export const RouterView =
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <Router history={history}>
              <Switch>
                {renderRoutes(routes)} 
              </Switch>
            </Router> 
        </Provider>
    </ConfigProvider>
