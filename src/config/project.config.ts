/*
 * @Description: 项目配置
 * @Author: qingyang
 * @Date: 2020-09-14 15:19:37
 * @LastEditors: qingyang
 * @LastEditTime: 2020-09-14 15:20:56
 */
export const BASE_URL = process.env.VUE_APP_TYPE === '1' ? 'http://47.99.68.226:8103' : 'http://47.99.68.226:8104';
export const CDN_URL = process.env.VUE_APP_TYPE === '1' ? 'http://hi-cdn.wlease.cn/etc/static/images' : 'http://hi-cdn.wlease.cn/etc/static/images';
export const VERSION  = '0.0.2';
export const CODE_OK  = '1';
export const TIMEOUT = 10000;
export const refreshTime = 60*60*1000; // 定时刷新数据1小时