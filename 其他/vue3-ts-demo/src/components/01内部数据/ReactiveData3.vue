<template>
    <div>
        <h3>ReactiveData3</h3>
        <p>{{ state }}</p>
        <button @click="fecthData">请求</button>
    </div>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue'
import {IUser,IState} from "../../types/ReactiveIterface"
/**
 * 针对reactive进行数据约束，以后后端返回的数据如果结构不对
 */

// Vue3 proxy
let state = reactive<IState>({
    users: [{ id: 1, name: "xiaowang", address: "武侯区" }],
    array:[1,2,3]
})

// count的类型就是number
let count = ref<number>(10)
let myuser = ref<IUser>({id:1,name:"xiaowang",address:"武侯区"})

// 覆盖state的值，页面检测不到
const fecthData = () => {
    state.users = [
        { id: 2, name: "xiaowang", address: "高新区" }
    ]
}
</script>

<style lang='less' scoped>
</style>