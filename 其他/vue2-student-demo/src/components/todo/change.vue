<template>
  <div>
    <button @click="put('all')">全部</button>
    <button @click="put('done')">已完成</button>
    <button @click="put('undone')">未完成</button>
  </div>
</template>

<script>
export default {

  methods:{
    put(v){
        this.$emit('statu',v)
    }
  }


};
</script>

<style>
</style>