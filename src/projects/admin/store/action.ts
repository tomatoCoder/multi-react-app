import { getUserInfo } from './../../../config/api';
import { login } from '@/config/api';
/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-14 09:29:59
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-25 16:52:15
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
  history.replace('/login')
  return { type: LOGIN_OUT,data: {}}
}



export function loginAction(dispatch: any, params: any) {
  return new Promise((resolve, reject) => {
    login(params).then((res: any) => {
      localStorage.setItem('token', res);
      history.push('/admin')
      resolve(res);
      getUserInfo().then((userInfo: any) => {
        dispatch(addUser(userInfo));
      })
    }).catch((err: any) => {
      reject(err);
    })
  })
  
}