<template>
  <div>
    <h3>
        生命周期函数
        <p>{{username}}</p>
        <p :class="{as:flag}">这是测试文本</p>
        <button @click="flag=false">修改状态</button>
        <input type="text" v-model="username">
    </h3>
  </div>
</template>

<script lang='ts' setup>
import { reactive,ref,onMounted} from 'vue'

const username = ref("xiaowang")
const flag = ref(true)

onMounted(()=>{
    console.log("页面挂载完成后执行");
})
</script>

<style lang='less' scoped>
.as{
    color:red
}
</style>