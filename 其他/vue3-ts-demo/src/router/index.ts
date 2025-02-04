import {createRouter,createWebHashHistory,createWebHistory,RouteRecordRaw} from "vue-router"
import {Component} from "vue"
import Home from "../components/Home.vue"
import Login from "../components/Login.vue"
import Reg from "../components/Reg.vue"
import Product from "../components/homechild/Product.vue"
import User from "../components/homechild/User.vue"

// routes进行ts约束，
// routes路由目前默认是写死的，如果以后路由需要动态加载，后端将路由返回前端
// addRouter()  [{},{},{}]
// interface IRouter {
//     path:string,
//     name:string,
//     component:Component,
//     meta?:{},
//     beforeEnter: (to:{}, from:{}, next:object) => {}
// }
const routes:Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home'
      },
    {
        path:"/login",
        name:"Login",
        component:Login
    },
    {
        path:"/reg",
        name:"Reg",
        component:Reg
    },
    {
        path:"/home",
        name:"Home",
        component:Home,
        children:[
            {
                path:"/home",
                name:"/product",
                component:Product
            },
            {
                path:"user",
                name:"user",
                component:User
            },
            {
                path:"product",
                name:"product",
                component:Product
            }
        ]
    },
    
]

const router = createRouter({
    routes,
    // createWebHashHistory()代表路由hash模式。
    // createWebHistory() 代表history模式
    history:createWebHistory()
})
export default router

// Vue2代码
// const router = new VueRouter({
//     router,
//     mode:"hash" //"history"
// })