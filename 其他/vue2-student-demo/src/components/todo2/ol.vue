<template>
  <div>
    <h2>
      正在进行 <span id="todocount">{{ proing }}</span>
    </h2>
    <ol id="todolist" class="demo-box">
      <li
        :class="{ done: item.status }"
        v-for="item in fliterList"
        :key="item.id"
        @click="$emit('puts', item.id)"
      >
        <span>{{ item.name }}</span>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  props: ["proing", "fliterList"],
};
</script>

<style>
</style>