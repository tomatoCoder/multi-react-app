/*
 * @Description: 环境常量
 * @Author: qingyang
 * @Date: 2020-09-11 13:34:43
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-11 13:36:01
 */

export const inBrowser = typeof window !== 'undefined'
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const isIE = UA && /msie|trident/.test(UA)
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
export const isEdge = UA && UA.indexOf('edge/') > 0
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge