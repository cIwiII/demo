import axios from "axios"
import {message} from "antd"

const request = axios.create({
    baseURL:"http://127.0.0.1:8002",
    timeout:4000
})

// 请求拦截器
request.interceptors.request.use((req)=>{
    // 给请求头设置token
    let token = localStorage.token
    if(token){
        req.headers.token = token
    }
    return req
},(error)=>{
    // 直接页面抛出一个错误
    Promise.reject(error)
})

request.interceptors.response.use((resp)=>{
    return resp.data
},(error)=>{
    const response = error.response
    if(response){
        switch(response.status){
            case 500:
                message.error("后端服务器异常！")
                break;
            case 401:
                message.error("身份过期，请重新登录")
                localStorage.removeItem("token")
                localStorage.removeItem("userInfo")
                window.location.href="/login"
                break;
            case 404:
                message.error("请求路径失败")
                break;
            default:
                message.error("您的网络开小差了！！！")
        }
    }
    return Promise.reject("自定义错误")
})

export default request