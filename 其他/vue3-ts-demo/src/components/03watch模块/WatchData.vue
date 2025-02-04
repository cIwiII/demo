<template>
    <div>
        <h3>watch模块</h3>
        <p>原始数据：{{ state.username }}</p>
        <p>{{ state.user }}</p>
        <button @click="state.username = 'xiaofeifei'">修改username</button>
        <button @click="state.user.name = 'xiaoliu'">修改user</button>
        <button @click="changeUser">修改user对象</button>
    </div>
</template>

<script lang='ts' setup>
import { reactive, ref, watch, watchEffect } from 'vue'
const state = reactive({
    username: "xiaowang",
    user: {
        id: 1, name: "王二麻子"
    }
})

const changeUser = ()=>{
    state.user = {
        id:2,name:"xiaozhang"
    }
}

// 监听watch模块
// 第一个回调函数，要监控的属性是哪些。
// 第二个回调函数，数据发生变化，要执行业务
watch(
    () => state.username,
    (val, prevVal) => {
        console.log(val);
        console.log(prevVal);
    }
)

watch(
    () => state.user,
    (val, prevVal) => {
        console.log(val);
        console.log(prevVal);
    },
    {
        deep:true,
        immediate:true
    }
)
watchEffect(()=>{
    // 里面可以执行异步请求，日志记录等等
    console.log(state.username);
    // 监控user这个对象地址发生变化，里面属性变化检测
    console.log(state.user);
    // 使用了user对象里面某个属性才能监控到
    console.log(state.user.name);
    
})
</script>

<style lang='less' scoped>
</style>