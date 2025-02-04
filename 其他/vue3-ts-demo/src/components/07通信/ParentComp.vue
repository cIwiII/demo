<template>
  <div>
    <h2>父组件</h2>
    <p>{{count}}</p>
    <button @click="count=20">修改count</button>
    <ChildComp 
        :count="count" 
        :username="username" 
        @changeCount="changeCount"
        @changeUsername="changeUsername"></ChildComp>
  </div>
</template>

<script lang='ts' setup>
import { reactive,ref} from 'vue'
const count = ref<number>(10)
const username = ref<string>("xiaowang")

const changeCount = (val:number)=>{
    count.value = val
}

const changeUsername = (name:string)=>{
    username.value = name
}

</script>

<style lang='less' scoped>
</style>