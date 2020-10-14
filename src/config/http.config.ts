import axios from 'axios';
import { message } from 'antd';
import { BASE_URL, CODE_OK, TIMEOUT } from './project.config';
import history from '@/utils/history'

// 创建axios实例
const $http = axios.create();

// 请求的超时时间
$http.defaults.timeout = TIMEOUT;

// post请求头设置
$http.defaults.headers.post['Content-Type'] = 'application/json';
$http.defaults.headers.put['Content-Type'] = 'application/json';

// 请求域名
$http.defaults.baseURL = BASE_URL;

console.log('process.env', process.env, BASE_URL);

$http.interceptors.request.use(async (config: any) => {
    console.log('请求拦截器', config) 
    // token 校验
    const token = localStorage.getItem('token')
    if(token) {
        config.headers['Authorization'] = `${token}`;
       
    } 
    // else if (history.currentRoute.name !== 'Login'){
    //     history.push(`/login`);
    //     return Promise.reject('401')
    // }
    return config;
}, (error: Error) => {
    console.log('请求发起失败：', error);
	return Promise.reject(error);
});

// response 拦截
$http.interceptors.response.use(response => {
    
    // code和error处理
    const statusCode = response.status;
    const msg = response.data ? response.data.message : '';
	if(statusCode === 200) {
        // 如果是文件流直接返回
        if(response.request && response.request.responseType === 'blob') {
            return response;
        }
        const code = response.data.code;
        if (code === CODE_OK) {
            return response.data.data;
        }else if (code === '200001'){
            message.error(msg);
            history.push(`/login`);
            return Promise.reject(response);
        }else {
            message.error(msg);
            return Promise.reject(response)
        }
	}else {
		message.error(msg);
		return Promise.reject(response)
	}
}, (error: any) => {
    console.log('响应异常error：', error, error.response); 
    const response = error.response;
    if(response) {
        if(response.request && response.request.responseType === 'blob') {
            return Promise.reject(error.response)
        }
        const status = response.status;
        const msg = response.data.message || response.data.msg;
        switch(status) {
            case 401:
                if(!localStorage.getItem('token')) {
                    console.log('401 已经退出')
                    return false;
                }
                break;
            default:
                message.error(msg || '系统异常，请联系管理员！');
                break;
        }

        return Promise.reject(error.response)
    }else {
        if(error.toString() === 'Error: Network Error') { 
            message.error('请检查网络连接！');
            return Promise.reject('请检查网络连接！');
        }
        if(error.toString() === 'Error: timeout of 10000ms exceeded') {
            message.error('服务器跑路了！');
            return Promise.reject('请稍后再试！');
        }
        return Promise.reject(error.toString());
    }
});

export const post = (url: string, params?: any) => {
    return $http({
        method: 'post',
        url: url,
        data: params
    })
}

// 文件流
export const getBlob = (url: string, params?: any) => {
    return $http({
        method: 'get',
        url: url,
        params: params,
        responseType: 'blob'
    })
}

export const get = (url: string, params?: any) => {
    return $http({
        method: 'get',
        url: url,
        params: params
    })
}
  
