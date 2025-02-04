import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import http from "./request";
import ComponentA from './components/AllComponent.vue'
// import Components from './components/BatchRegister';
import CSUI from './components/AutoRequire';

Vue.config.productionTip = true;

Vue.prototype.$http = http;

// 全局注册组件方式一，入口单个依次加入
Vue.component('AllComponent',ComponentA)
// 全局注册组件方式二, 手动加入
// Vue.use(Components)
// 全局注册组件方式三, 引入全局自动注册组件
Vue.use(CSUI)

const data = { num: 1 };
// vue2创建实例和注入数据
const app = new Vue({
  // el:'#app',
  router,
  store,
  data,
  render: h => h(App)
}).$mount("#app");







app.$data.num === data.num;
app.num === data.num;
// console.log("1213214", app.num, data.num);

// $watch 是一个实例方法
app.$watch('num', function (newValue, oldValue) {
  // 这个回调将在 `app.num` 改变后调用
})