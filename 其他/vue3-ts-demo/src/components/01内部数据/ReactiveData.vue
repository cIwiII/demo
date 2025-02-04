<template>
  <div>
    <h3>Reactive</h3>
    <p>{{count}}</p>
    <button @click="count=100">修改</button>
    <!-- 只要在template输出这个对象，默认调用value -->
    <p>{{username}}</p>
    <button @click="changeUsername">修改username</button>
    <p>{{user}}</p>
    <button @click="changeUser">修改User</button>
  </div>
</template>

<script lang='ts' setup>
// 定义组件内部数据
import {ref} from "vue"

// 定义一个基本数据类型,useState
const count = ref(50)
const username = ref("xiaowang")
const user = ref({id:1,name:"xiaowang"})

// 函数直接定义script标签里面
const changeUsername = ()=>{
    console.log(username);
    // username得到的不是一个普通数据类型，而是一个对象。
    username.value = "xiaofeifei"
}
const changeUser = ()=>{
    // const user2 = {
    //     id:2,name:"xiaofeifei"
    // }
    // user.value = user2
    user.value.name="xiaofeifei"
}
</script>

<style lang='less' scoped>
</style>