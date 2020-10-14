/*
 * @Description: api
 * @Author: qingyang
 * @Date: 2020-09-14 15:16:29
 * @LastEditors: qingyang
 * @LastEditTime: 2020-10-14 17:10:50
 */
import { post, get } from '@/config/http.config'
import { BASE_URL } from '@/config/project.config';


//登录
export const login = (params: any) => post(`/admin/login/toLogin`, params);

//退出登录
export const logout = () => get(`/admin/logout`);

//获取用户信息
export const getUserInfo = () => get(`/admin/login/user`);
export const verifyCodeImgUrl = BASE_URL + '/admin/login/captcha';