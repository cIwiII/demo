<template>
  <div>
    <header1 @add="add"></header1>
    <section>
      <ol1 @puts="puts" :proing="proing" :fliterList="fliterList"></ol1>
      <change @statu="statu"></change>
    </section>
  </div>
</template>

<script>
import change from "./todo2/change.vue";
import header1 from "./todo2/header.vue";
import ol1 from "./todo2/ol.vue";
export default {
  data() {
    return {
      happy: [
        { id: 1, name: "吃饭", status: true },
        { id: 2, name: "睡觉", status: false },
        { id: 3, name: "打豆豆", status: true },
      ],
      statuStr: "all",
      proing: 0,
    };
  },
  computed: {
    fliterList() {
      switch(this.statuStr){
        case 'all':return this.happy;
        case 'done':return this.happy.filter(v=>v.status)
        case 'undone':return this.happy.filter(v=>!v.status)
      }
    },
  },
  watch: {
    happy: {
      handler() {
        this.proing = this.happy.filter((v) => !v.status).length;
      },
      deep: true,
      immediate: true,
    },
  },
  components: {
    change,
    header1,
    ol1,
  },
};
</script>

<style>
ul,
ol {
  list-style: none;
}

header {
  height: 50px;
  background: #333;
  background: rgba(47, 47, 47, 0.98);
}

section {
  width: 1200px;
  margin: 0 auto;
}

label {
  float: left;
  width: 100px;
  line-height: 50px;
  color: #ddd;
  font-size: 24px;
  cursor: pointer;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

header input {
  float: right;
  width: 20%;
  height: 24px;
  margin-top: 12px;
  text-indent: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 0 rgb(255 255 255 / 24%), 0 1px 6px rgb(0 0 0 / 45%) inset;
  border: none;
}

ol li {
  cursor: move;
}

li {
  height: 32px;
  line-height: 32px;
  background: #fff;
  position: relative;
  margin-bottom: 10px;
  padding: 0 45px;
  border-radius: 3px;
  border-left: 5px solid #629a9c;
  box-shadow: 0 1px 2px rgb(0 0 0 / 7%);
}

/* 点击页面内容,完成的状态 done */
.done {
  text-decoration: line-through;
  color: #629a9c;
}
</style>