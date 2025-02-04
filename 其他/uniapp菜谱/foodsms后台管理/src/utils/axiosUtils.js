//封装axios请求工具
import axios from "axios";
import {Message} from 'element-ui'

const newAxios = axios.create({
    //属性自动拼接路由
    baseURL: 'http://127.0.0.1:4001/',
    //超过指定时间主动断开请求
    timeout: 3000
})
// //拦截器，请求，响应
newAxios.interceptors.request.use((req) => {
    // console.log('请求返回:',req);
    //请求对象req
    //统一增加请求头Authorization或者token
    req.headers.Authorization = sessionStorage.getItem('token')
    //需要有返回值
    return req
}, (error) => { alert('请求失败，账户异常') })

//响应
newAxios.interceptors.response.use((resp) => {
    // console.log('响应返回:',resp)
    //结果返回页面（指定返回需要的内容，进行筛选）
    return resp
}, (error) => {
    //响应失败
    const response=error.response
    if (response) {
        // console.log(response.status)
        switch (response.status) {
            case 500:
                Message.error('网络异常')
                break;
            case 401://身份过期，404路劲不对
                //移除token回到登录
                Message.success('返回登录')
                sessionStorage.removeItem('token')
                location.href = '/login'
                break;
            case 404:
                alert('访问错误')
                break;
        }
    }
})

//暴露,//request模块的每个js文件中引入使用
export default newAxios