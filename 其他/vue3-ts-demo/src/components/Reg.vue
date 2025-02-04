<template>
  <div>
    <h3>用户页面</h3>
    <p>{{store.state}}</p>
    <span>子仓库</span>
    <p>{{store.state.productModel.username}}</p>
    <p>{{store.state.count}}</p>
    <button @click="increment">-</button>
    <button @click="decrement">+</button>
    <button @click="asincrement">异步+</button>
    <button @click="changeSubStore">修改子仓库数据</button>
    <button @click="aschangeSubStore">异步修改子仓库数据</button>
  </div>
</template>

<script lang='ts' setup>
import { reactive,ref} from 'vue'
import {useStore} from "vuex"
// 调用useStorehook获取仓库对象
const store = useStore()

const increment = ()=>{
    //  调用仓库的mutations方法 commit
    store.commit("increment",10)
}
const decrement = ()=>{
    store.commit("decrement",5)
}
const asincrement = ()=>{
    store.dispatch("asyncIncrement",3)
}

const changeSubStore = ()=>{
  store.commit("productModel/changeUsername","华仔")
}

const aschangeSubStore = ()=>{
  store.dispatch("productModel/asyncChangeUsername","雇佣者")
}
</script>

<style lang='less' scoped>
</style>