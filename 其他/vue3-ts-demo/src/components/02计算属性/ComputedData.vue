<template>
  <div>
    <h3>
        computed
    </h3>
    <p>{{fullName}}</p>
    <p>{{upperCaseName}}</p>
    <p>{{newValue}}</p>
    <button @click="newValue='zhang'">修改newValue</button>
    <button @click="state.firstName='老'">修改姓</button>
  </div>
</template>

<script lang='ts' setup>
import { reactive,ref,computed} from 'vue'
const state = reactive({
    firstName:"小",
    lastName:"wang"
})

const fullName = computed(()=>{
    return state.firstName + state.lastName
})

const upperCaseName = computed(()=>{
    return state.lastName.toUpperCase()
})

const newValue = computed({
    get(){
        console.log(123);
        return state.lastName
    },
    set(val){
        console.log(val);
    }
})

</script>

<style lang='less' scoped>
</style>