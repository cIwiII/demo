<template>
  <div id="home">
    <div class="header">header</div>
    <div class="main">
      <div class="nav">

      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue'


</script>

<style lang='less' scoped>
#home {
  margin: 0 auto;

  .header {
    height: 6rem;
    background-color: aquamarine;
  }

  .main {
    display: flex;

    .nav {
      width: 15%;
      background-color: rgb(128, 122, 122);
    }

    .content {
      width: 80%;
      margin: 2rem 0 0 2rem;
      padding: 1rem;
    }
  }
}
</style>