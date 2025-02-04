//封装axios请求工具
import axios from "axios";
import {Message} from 'element-ui'

const newAxios = axios.create({
    baseURL: 'http://47.98.128.191:3000',
    timeout: 3000
})
// 请求拦截器
newAxios.interceptors.request.use((req) => {
    req.headers.Authorization = sessionStorage.getItem('token')
    return req
}, (error) => { alert('请求失败，账户异常') })

//响应拦截器
newAxios.interceptors.response.use((resp) => {
    return resp.data
}, (error) => {
    const response=error.response
    if (response) {
        // console.log(response.status)
        switch (response.status) {
            case 500:
                Message.error('服务器异常，稍后在访问！')
                break;
            case 401:
                Message.success('身份过期，请重新认证')
                sessionStorage.removeItem('token')
                location.href = '/login'
                break;
            case 404:
                alert('访问错误')
                break;
        }
    }
})

//request模块的每个js文件中引入使用
export default newAxios