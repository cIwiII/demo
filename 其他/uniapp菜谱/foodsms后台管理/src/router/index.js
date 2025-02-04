import Vue from 'vue'
import VueRouter from 'vue-router'
//身份认证
// import $http from '@/request/http'
import $store from '../store/index'
import login from '../views/login.vue'
import reg from '../views/reg.vue'
import home from '../views/home.vue'
import index from '../views/index.vue'
import meal from '../views/meal/meal.vue'
import addmeal from '../views/meal/addmeal.vue'
import putmeal from '../views/meal/putmeal.vue'
import menu from '../views/menu/menu.vue'
import updatameal from '../views/menu/updatameal.vue'
import swiper from '../views/swiper/swiper.vue'
import addSwiper from '../views/swiper/addSwiper.vue'
import putSwiper from '../views/swiper/putSwiper.vue'
import user from '../views/user/user.vue'
import addAdmin from '../views/user/addAdmin.vue'
import vip from '../views/vip/vip.vue'


Vue.use(VueRouter)
//非懒(惰性)加载
const vueArr = [
  { p: '/login', n: 'login', co: login },
  { p: '/reg', n: 'reg', co: reg },
  { p: '/home', n: 'home', co: home,
      ch: [
        { p: '/', n: 'index', co: index },
        { p: 'meal', n: 'meal', co: meal },
        { p: 'addmeal', n: 'addmeal', co: addmeal },
        { p: 'putmeal', n: 'putmeal', co: putmeal },
        { p: 'menu', n: 'menu', co: menu },
        { p: 'updatameal', n: 'updatameal', co: updatameal },
        { p: 'swiper', n: 'swiper', co: swiper },
        { p: 'addSwiper', n: 'addSwiper', co: addSwiper },
        { p: 'putSwiper', n: 'putSwiper', co: putSwiper },
        { p: 'user', n: 'user', co: user },
        { p: 'addAdmin', n: 'addAdmin', co: addAdmin },
        { p: 'vip', n: 'vip', co: vip },
      ]
  }
]
function render(a) {
  let a1 = [];
  a.forEach(v => {
    if (v.ch) {
      let aa = render(v.ch)
      let ab = { path: v.p, name: v.n, component: v.co, children: [...aa] }
      a1.push(ab)
    } else {
      a1.push({ path: v.p, name: v.n, component: v.co })
    }
  })
  return a1
}
console.log(render(vueArr));

const routes = [
   //重定向 
   {
    path: '/',
    redirect: '/home'
  },
  ...render(vueArr),
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
    // path: '/about',
    // name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
  
]

const router = new VueRouter({
  //路由模式，默认history(历史，h5)，hash（/#/）两个值创建时选中的是否显示历史模式，
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//守卫配置to去个path，from到哪
router.beforeEach(async (to, from, next) => {
  const paths = ['/login','/reg'];//白名单设置
  if (paths.includes(to.path)) {
    next()
  }
  else {
    if (sessionStorage.token) {
        // methods.getUserInfo()
        console.log('守卫执行验证token,获取信息')
        //使用状态机中的异步方法规定写法,返回布尔值
      const res = await $store.dispatch('userModule/getUserInfo')
      console.log('用户',res)
      //通常情况下一下代码不会执行，由拦截器拦截，
      if (res) {
        next()
      }
      else { //在管理员拉黑情况下
        alert('暂无访问权限，请登录')
        next('/login')
      }
    }
    else {
      alert('暂无访问权限，请登录')
      next('/login')
    }
  }
})


export default router
