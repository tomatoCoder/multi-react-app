/*
 * @Description: 基础工具类
 * @Author: qingyang
 * @Date: 2020-09-11 10:43:00
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-25 15:21:33
 */


export const isDef =  (v: any) : Boolean => {
   
    return v !== undefined && v !== null;
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
//价格整数取整，有小数点取2位
export const toDecimal = (number:any) =>{
  let num = Number(number);
  if(isNaN(num)){
    return number
  }
  return num.toString().indexOf(".") !== -1?num.toFixed(2) :  num;
}


 /**
 * 生成随机len位数字
 */
export const randomLenNum = (len: number, isDate: boolean): string => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len || 4)
  if (isDate) random = random + Date.now()
  return random
}