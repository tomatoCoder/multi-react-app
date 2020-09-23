/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-14 09:29:59
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-23 14:39:47
 */
import { combineReducers } from "redux";
import {INCREMENT, DECREMENT, SET_USER_INFO, LOGIN_OUT} from './action'

function counter(state = 0, action: any) {
    switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
    }
}
function userInfo(state = {}, action: any) {
    switch (action.type) {
    case SET_USER_INFO:
      return action.data;
    case LOGIN_OUT:
      return state
    default:
      return state;
    }
}

export default combineReducers({
    counter,
    userInfo
});
