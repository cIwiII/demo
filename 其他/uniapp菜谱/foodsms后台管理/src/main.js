import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/element.js'
// import http from './request/http'
// import './directives/index'
import 'element-ui/lib/theme-chalk/display.css';
Vue.config.productionTip = true
//挂载到vue对象
// Vue.prototype.$http=http
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
