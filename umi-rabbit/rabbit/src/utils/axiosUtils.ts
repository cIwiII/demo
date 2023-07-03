import axios from "axios"
import {message} from "antd"

const newaxios = axios.create({
    baseURL:"http://xawn.f3322.net:8012/",
    timeout:4000
})

// // 请求拦截器
newaxios.interceptors.request.use((req)=>{
    // 给请求头设置token
    let token = localStorage.token
    if(token){
        if(req.headers){
            req.headers.Authentication = token
        }
    }
    return req
},(error)=>{
    Promise.reject(error)// 直接页面抛出一个错误
})

newaxios.interceptors.response.use((resp)=>{
    console.log('响应拦截器元数据',resp);
    if(resp.data){
        return resp.data
    }else{
        return resp
    }
},(error)=>{
    const response = error.response
    if(response){
        switch(response.status){
            case 500:
                message.error("参数错误或无操作权限！")
                break;
            case 401:
                message.error("身份过期，请重新登录")
                localStorage.removeItem("token")
                localStorage.removeItem("userInfo")
                window.location.href="/login"
                break;
            case 403:
                message.error('访问错误')
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

export default newaxios