/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-10 15:11:20
 * @LastEditors: qingyang
 * @LastEditTime: 2020-10-09 16:58:24
 */
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducer";

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState?: any) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunkMiddleware, loggerMiddleware)
    );
}
