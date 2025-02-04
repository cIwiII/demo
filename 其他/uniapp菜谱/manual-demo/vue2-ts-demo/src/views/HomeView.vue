<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
// import Vue from 'vue'// 文档说明
// import Component from 'vue-class-component'
import { Component, Vue } from "vue-property-decorator";// 脚手架创建，也是从上述文件中转发的
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

// @Component 修饰符注明了此类为一个 Vue 组件
@Component({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {}
</script>
