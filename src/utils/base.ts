/*
 * @Description: 基础工具类
 * @Author: qingyang
 * @Date: 2020-09-11 10:43:00
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-11 13:29:41
 */

export const isDef =  (v: any) : Boolean => {
    return v !== undefined && v !== null
}

export const isObject = (obj: any) : Boolean => {
  return obj !== null && typeof obj === 'object'
}


/**
 * Remove an item from an array.
 */
export const remove = (arr: Array<any>, item: any)  : Array<any> | void  =>{
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}