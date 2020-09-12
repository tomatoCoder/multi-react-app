import { createStore, applyMiddleware } from "redux";
// import {browserHistory} from 'react-router' import {routerMiddleware} from
// 'react-router-redux'
// import thunkMiddleware from "redux-thunk";
// import { createLogger } from "redux-logger";
// import rootReducer from "../reducer";

// const loggerMiddleware = createLogger();

// export default function configureStore(preloadedState) {
//     return createStore(
//         rootReducer,
//         preloadedState,
//         applyMiddleware(thunkMiddleware, loggerMiddleware)
//     );
// }


export default function() {
    debugger
    // 计算规则
    function counter(state = 0, action) {
        switch (action.type) {
            case 'INCREMENT':
                return state + 1
            case 'INCREMENT':
                return state - 1 
            default:
                return state  
        }
    }
    // 根据计算规则生成store
    let store = createStore(counter);

    // 定义数据 变化之后的派发规则
    store.subscribe(() => {
        console.log('fn1 -> ', store.getState())
    })


    // 触发数据变化
    store.dispatch({type: 'INCREMENT'})
}

