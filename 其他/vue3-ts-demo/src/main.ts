import { createApp } from 'vue'
// 默认给整个项目设置了公共的css样式
// import './style.css'
// 引入根组件，将App组件挂载到实例上面
import App from './App.vue'
import router from "./routes"
import store from "./store"
// import 'ant-design-vue/dist/antd.css';

// 你最好将代码拆分以下。app这个Vue实例挂载其他插件
// 无需自己在创建Vue实例，createApp封装了
const app = createApp(App)
// 挂载router，启动项目加载router，页面中获取router进行参数获取跳转
app.use(router)
app.use(store)
app.mount('#app')

/**
 * Vue2
 * new Vue({
 *  router,
 *  store
 * }).$mount("#app")
 */