<template>
    <div>
        <h3>子组件</h3>
        <p>{{count}}</p>
        <p>{{username}}</p>
        <button @click="changeCountChild">修改count</button>
        <button @click="changeUsernameChild">修改username</button>
    </div>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue'
// 使用Vue3内置的一个api来获取外部传递进来的数据
defineProps < {count: number,username:string} > ()
// 需要使用Vue3里另外一个api来获取自定义事件函数
// 约束外部传递进来的函数，changeCount，这个函数有一个参数val
interface IFun {
    (e:"changeCount",val:number):void,
    (e:"changeUsername",val:string):void
}
const emit = defineEmits<{
    (e:"changeCount",val:number):void,
    (e:"changeUsername",val:string):void
}>()

const changeCountChild = ()=>{
    emit("changeCount",100)
}
const changeUsernameChild = ()=>{
    emit("changeUsername","xiaofeifei")
}

</script>

<style lang='less' scoped>
</style>