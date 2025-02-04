<template>
    <div>
        <h3>Reactive</h3>
        <p>{{state.count}}</p>
        <p>{{state.user}}</p>
        <button @click="++state.count">+</button>
        <button @click="--state.count">-</button>
        <button @click="changeCount">修改</button>
    </div>
</template>

<script lang='ts' setup>
import { reactive } from 'vue';

/**
 * reactive定义组件内部数据
 * 类似于React 类组件 State
 */
const state = reactive({
    count:10,
    user:{
        id:1,name:"xiaowang"
    },
    stus:[1,2,3]
})

const changeCount = ()=>{
    state.count = 100
}

</script>

<style lang='less' scoped>
</style>