<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import demo from './components/demo.vue'
// import demo from './components/table.vue'
// import demo from './components/nav.vue'
// import demo from './components/img.vue'
// import demo from './components/buycar.vue'
// import demo from './components/buycar2.vue'
// import demo from './components/01-指令/Shopping.vue'//教师代码
// import demo from './components/01-指令/Directive.vue'//教师代码
// import demo from './components/HIV.vue'
// import demo from './components/news.vue'
// import demo from './components/FormCom2.vue'
// import demo from './components/menu.vue'
// import demo from './components/TodoList2.vue'
// import demo from './components/TodoList3.vue'  //侦听器
// import demo from "./components/TodoList4.vue"; //（适合）计算属性
// import demo from "./components/carNumber.vue";
// import demo from "./components/carNumber2.vue";
// import demo from "./components/staff.vue";
// import demo from "./components/组件页面切换/shows.vue";
// import demo from "./components/微信分步表单/vxs.vue";
// import demo from "./components/lice微信分页/weicomp.vue";
import demo from "./components/过滤器/telfilter.vue";

export default {
  name: 'app',
  components: {
    demo,
  },
};
</script>
<style lang="scss" scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin: 0 auto;
}
</style>
