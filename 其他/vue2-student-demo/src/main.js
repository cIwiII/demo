import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import http from './request/http'
// import './directives/index'
import "./directives" //全局自定义指令，v-使用 
import "./filters"  //过滤器加载  |使用
import 'element-ui/lib/theme-chalk/display.css';
/* 全局引入，也可局部引入
import 'element-ui/lib/theme-chalk/display.css';
包含的类名及其含义为： class="hidden-sm-and-up"
hidden-xs-only - 当视口在 xs 尺寸时隐藏
hidden-sm-only - 当视口在 sm 尺寸时隐藏
hidden-sm-and-down - 当视口在 sm 及以下尺寸时隐藏
hidden-sm-and-up - 当视口在 sm 及以上尺寸时隐藏
hidden-md-only - 当视口在 md 尺寸时隐藏
hidden-md-and-down - 当视口在 md 及以下尺寸时隐藏
hidden-md-and-up - 当视口在 md 及以上尺寸时隐藏
hidden-lg-only - 当视口在 lg 尺寸时隐藏
hidden-lg-and-down - 当视口在 lg 及以下尺寸时隐藏
hidden-lg-and-up - 当视口在 lg 及以上尺寸时隐藏
hidden-xl-only - 当视口在 xl 尺寸时隐藏
*/
Vue.config.productionTip = true  //压缩模式
//挂载到vue对象
Vue.prototype.$http=http
//store载入到vue对象中
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
