/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 15:11:20
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-11 15:57:12
 */
import { createStore, applyMiddleware } from "redux";
// import {browserHistory} from 'react-router' import {routerMiddleware} from
// 'react-router-redux'
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducer";

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState: any) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunkMiddleware, loggerMiddleware)
    );
}
