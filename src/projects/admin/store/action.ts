/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-09-14 09:29:59
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-24 15:51:50
 */


/*
 * action 类型
 */
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const SET_USER_INFO = 'SET_USER_INFO'
export const LOGIN_OUT = 'SET_USER_INFO'

/*
 * action 创建函数
 */

export  interface User {
    id: number
    name: string,
    token: string
}
export function addUser(data: User) {
    data.token && localStorage.setItem('token',data.token);
    return { type: SET_USER_INFO, data }
}
export function loginOut() {
  localStorage.removeItem('token');
  window.location.reload();
  return { type: LOGIN_OUT,data: {}}
}
  