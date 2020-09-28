/*
 * @Description: 主入口
 * @Author: qingyang
 * @Date: 2020-09-10 13:36:58
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-22 16:14:10
 */
import ReactDOM from 'react-dom';
import * as serviceWorker from '@/serviceWorker';
import  '@/config/ui.cofig'
import '@/assets/styles/index.less';
import { RouterView } from './router/index'
import _ from 'lodash'
import React from "react";

ReactDOM.render(RouterView, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
(React as any)._ = _;
