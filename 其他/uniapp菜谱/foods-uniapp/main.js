import App from './App'

// 条件编译：uniapp可以支持多端运行，有可能某一端无法运行这段代码。针对不同的端、不同版本，提供不同的代码
//ifndef,不是vue3,多个n
// #ifndef VUE3
import Vue from 'vue'
import $apis from "./apis/apis"
import store from "./store/index.js"
import uView from "@/uni_modules/uview-ui"

Vue.use(uView);
Vue.config.productionTip =false
//全局挂载apis,页面使用
//   const res = await this.$api.user.getUserInfo()
Vue.prototype.$api = $apis

App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

//ifdef,vue3执行，少个n------------------
// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif