

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

interface User {
    id: number
    name: string
  }
export function addUser(data: User) {
    return { type: SET_USER_INFO, data }
}
export function loginOut() {
  return { type: LOGIN_OUT,data: {}}
}
  