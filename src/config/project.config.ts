/*
 * @Description: 项目配置
 * @Author: qingyang
 * @Date: 2020-09-14 15:19:37
 * @LastEditors: qingyang
 * @LastEditTime: 2020-10-09 18:05:58
 */
export const BASE_URL = process.env.NODE_ENV === 'production' ? '' : '';
export const VERSION  = '0.0.2';
export const CODE_OK  = '1';
export const TIMEOUT = 10000;
export const refreshTime = 60*60*1000; // 定时刷新数据1小时