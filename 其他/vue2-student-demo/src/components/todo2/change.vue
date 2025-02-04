<template>
  <div>
    <button @click="$emit('statu','all')">全部</button>
    <button @click="$emit('statu','done')">已完成</button>
    <button @click="$emit('statu','undone')">未完成</button>
  </div>
</template>

<script>
export default {
};
</script>

<style>
</style>