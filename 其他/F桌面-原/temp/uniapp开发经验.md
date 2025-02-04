#### *vue如何封装axios请求

```js
import axios from "axios"
const newaxios = axios.create({
    baseURL:"http://xawn.f3322.net:8012/",
    timeout:4000
})
//请求拦截器
newaxios.interceptors.request.use((req)=>{
    let token = localStorage.token
    if(token){
        if(req.headers){
            req.headers.Authentication = token
        }
    }
    return req
},(error)=>{
    Promise.reject(error)//页面错误抛出
})
//响应拦截器
newaxios.interceptors.response.use((resp)=>{
        return resp
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
```



#### uni-app的状态机vuex搭建

主仓库

```js
import Vue from 'vue'
import Vuex from 'vuex'
//引入子仓库
import userModule from "./modules/userModule"
//引入vuex仓库名字（辅助函数）
//挂载到vue
Vue.use(Vuex)
export default new Vuex.Store({
	//主仓库数据
	state:{
		count:10
	},
	//子仓库模块
	modules:{
		userModule,homeModule
	}
})
```



子仓库

```js
import $api from '../../apis/apis.js'
export default {
	//开启命名空间
	namespaced:true,
    //定义数据
	state:{
		member:[],
	},
	//同步方法
	mutations:{
		changeMember(state,v){
			state.member=v
		}
	},
	//异步请求
	actions:{
		async getMember(context) {
	    const res = await $api.search.memberRecommend();
			if (res.data.meta.status == 200) {
				context.commit('changeMember', res.data.message)
			}
		}
	},
}
```





#### uni-app统一请求头封装

```js
//apis.js
//所有请求公共地址
const BASEURL = "http://localhost:4001/"
export default function fetchData(url,method="GET",data={}){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASEURL+url,
			method,
			data,
			headers:{
Authorization:uni.getStorageSync("token")
			},
			success(res){
				resolve(res)
			},
			fail(error){
				reject(error)
			}
		})
	})
}
```

全局挂载

```js
//main.js
import App from './App'
// 如果不是vue3
// #ifndef VUE3
import Vue from 'vue'
import $apis from "./apis/apis"
Vue.config.productionTip = false
// 将$apis挂载到Vue的原型上面，以后任何一个页面都可以通过this使用，store可以放在app中,如14行
Vue.prototype.$api = $apis
App.mpType = 'app'
const app = new Vue({
    ...App
    store
})
app.$mount()
// #endif
```



#### uni-app自动登录































#### 【尾】