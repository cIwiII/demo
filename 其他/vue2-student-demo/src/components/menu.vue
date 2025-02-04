<template>
  <div id="html">
    <div id="header">
      <!-- logo -->
      <img src="" alt="" />

      <div></div>
      <!-- 登陆注册 -->
      <div></div>
    </div>
    <sonm :data1="nav" :getval="getval" :getval2="getval2"></sonm>
  </div>
</template>

<script>
import sonm from "./twomenu/sonmenu.vue";
export default {
  components: {
    sonm,
  },
  data() {
    return {
      nav: [
        {
          id: 1,
          title: "首页",
          status: true,
          children: [
            {
              // id: 1, tit: "专业管理", sonSta:true
            },
          ],
        },
        {
          id: 2,
          title: "课程体系",
          status: false,
          children: [
            { id: 1, tit: "专业管理", sonSta: true },
            { id: 2, tit: "阶段管理", sonSta: false },
            { id: 3, tit: "课程管理", sonSta: false },
            { id: 4, tit: "知识域管理", sonSta: false },
            { id: 5, tit: "知识点管理", sonSta: false },
          ],
        },
        {
          id: 3,
          title: "线下随堂",
          status: false,
          children: [
            { id: 1, tit: "随堂视频", sonSta: true },
            { id: 2, tit: "视频上传", sonSta: false },
            { id: 3, tit: "随堂笔记", sonSta: false },
            { id: 4, tit: "随堂作业", sonSta: false },
            { id: 5, tit: "作业批改", sonSta: false },
          ],
        },
      ],
    };
  },
  methods: {
    getval(id) {
      this.nav.forEach((v) => (v.status = false));
      this.nav.find((v) => v.id == id).status = true;
    },
    getval2(objIndex, sonId) {
      this.nav[objIndex].children.forEach((val) => (val.sonSta = false));
      this.nav[objIndex].children[sonId].sonSta = true;
    },
  },
};
</script>

<style lang="scss" scoped>
#html {
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
  #header {
    background-color: rgba(234, 185, 23, 0.7);
    height: 80px;
    display: flex;justify-content: space-between;
  }
}
</style>