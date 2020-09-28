import { getUserInfo } from '@/apis';
import { login } from '@/apis';
/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-14 09:29:59
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-28 11:19:48
 */

import history from '@/utils/history'

/*
 * action 类型
 */
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const SET_USER_INFO = 'SET_USER_INFO'
export const LOGIN_OUT = 'LOGIN_OUT'
export const LOGIN_POST = 'LOGIN_POST'


export  interface User {
    name: string,
    phone: string
}

/*
 * action 方法
 */

export function addUser(data: User) {
    return { type: SET_USER_INFO, data }
}


export function loginOut() {
  localStorage.removeItem('token');
  history.replace('/login');
  return { type: LOGIN_OUT,data: {}}
}



export function loginAction(params: any) {
  return (dispatch: any) => {
    login(params).then((res: any) => {
          localStorage.setItem('token', res);
          history.push('/admin')
          getUserInfo().then((userInfo: any) => {
            dispatch(addUser(userInfo));
          })
    })
  }
}

export function getUserAction(params: any) {
  return (dispatch: any) => {
          let token = localStorage.getItem('token');
          if(token) {
            getUserInfo().then((userInfo: any) => {
              dispatch(addUser(userInfo));
            })
          }else {
            history.replace('/login');
          }    
  }
}