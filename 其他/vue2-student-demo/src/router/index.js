import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/home.vue";
import login from "../views/login.vue";
// import reg from '../views/reg.vue'
import index from "../views/index.vue";
import clams from "../views/classes/clams.vue";
import addClas from "../views/classes/addClas.vue";
import clasPut from "../views/classes/clasPut.vue";
import tecms from "../views/teacher/tecms.vue";
import addTe from "../views/teacher/addTe.vue";
import putTe from "../views/teacher/putTe.vue";
import stums from "../views/student/stums.vue";
import add from "../views/student/add.vue";
import stuPut from "../views/student/stuPut.vue";
import journal from "../views/journal/journal.vue";
import staff from "../views/staff/staff.vue";
//身份认证
// import $http from '@/request/http'
import $store from "../store/index";
//加载路由插件
Vue.use(VueRouter);
//非懒(惰性)加载
const vueArr = [
  { p: "/login", n: "login", co: login },
  // , { p: '/reg', n: 'reg', co: reg },
  {
    p: "/home",
    n: "home",
    co: home,
    ch: [
      { p: "/", n: "index", co: index },
      { p: "index", n: "index", co: index },
      { p: "stums", n: "stums", co: stums },
      { p: "add", n: "add", co: add },
      { p: "stuPut", n: "stuPut", co: stuPut },
      { p: "clams", n: "clams", co: clams },
      { p: "addClas", n: "addClas", co: addClas },
      { p: "clasPut", n: "clasPut", co: clasPut },
      { p: "tecms", n: "tecms", co: tecms },
      { p: "addTe", n: "addTe", co: addTe },
      { p: "putTe", n: "putTe", co: putTe },
      { p: "journal", n: "journal", co: journal },
      { p: "staff", n: "staff", co: staff }
    ]
  }
];
function render(a) {
  let a1 = [];
  a.forEach(v => {
    if (v.ch) {
      let aa = render(v.ch);
      let ab = { path: v.p, name: v.n, component: v.co, children: [...aa] };
      a1.push(ab);
    } else {
      a1.push({ path: v.p, name: v.n, component: v.co });
    }
  });
  return a1;
}
// console.log(render(vueArr));
//配置路由映射关系
const routes = [
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: home,
  // beforeEnter:async (to,from,next)=>{
  //   if(localStorage.token){
  //     // 验证token身份过期
  //     const res = await $http.user.getUserInfo()
  //     console.log(res);
  //     if(res.code){
  //       const {auth,username} = res.data
  //       localStorage.setItem("userInfo",JSON.stringify({auth,username}))
  //       next()
  //     }else{
  //       next("/login")
  //     }
  //   }else{
  //     next("/login")
  //   }
  // },
  //   children: [
  //     {
  //       path: '/',
  //       name: 'index',
  //       component: index,
  //     },
  //     {
  //       path: 'index',
  //       name: 'index',
  //       component: index,
  //     },
  //     {
  //       path: 'stums',
  //       name: 'stums',
  //       component: stums,
  //     }
  //   ]
  // },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: login
  // },
  ...render(vueArr),

  //重定向
  {
    path: "/",
    redirect: "/home"
  }
  // {
  //   path: '/reg',
  //   //路由的名字
  //   name: 'reg',
  //   component: () => import('../views/reg.vue')
  // }
];

//创建一个VueRouter实例
const router = new VueRouter({
  //路由模式，默认history(历史，h5)，hash（/#/）两个值创建时选中的是否显示历史模式，
  mode: "history",
  base: process.env.BASE_URL,
  //上面的地址对象routers
  routes
});

//守卫配置to去个path，from到哪
router.beforeEach(async (to, from, next) => {
  const paths = ["/login", "/reg"]; //白名单设置
  if (paths.includes(to.path)) {
    next();
  } else {
    if (sessionStorage.token) {
      // methods.getUserInfo()
      // console.log('守卫执行')
      // const res = await $http.user.getUserInfo()
      const res = await $store.dispatch("userInfoModul/getUserInfo");
      // console.log('用户',res)
      //通常情况下一下代码不会执行，由拦截器拦截，
      if (res == 1) {
        next();
      } else {
        //在管理员拉黑情况下
        alert("暂无访问权限，请登录");
        next("/login");
      }
    } else {
      alert("暂无访问权限，请登录");
      next("/login");
    }
  }
});

export default router;
