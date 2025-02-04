<template>
    <div class="fenye">
      <div class="pages">
          <button>首页</button>
          <a href="#" 
              @click.prevent="fenye(item)" 
              v-for="item in pages" 
              :key="item">{{item}}</a>
          <button>尾页</button>
      </div>
      <div class="message">
          <span>一共{{pages}}页/当前{{currentPage}}页</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
      props:["pages"],
      data(){
          return {
              currentPage:1
          }
      },
      computed:{
          newPages(){
              // 判断当前你点击的页码。比如4
              return [3,4,5]
          }
      },
      methods:{
          fenye(val){
              this.currentPage = val
              this.$emit("fenye",val,10)
          }
      }
  }
  </script>
  
  <style lang="scss" scoped>
  .fenye{
      display: flex;
      margin-top:20px;
      align-items: center;
      .pages{
          display: flex;
          a{
              display: block;
              width: 30px;
              height: 30px;
              border: 1px solid gainsboro;
              text-align: center;
              line-height: 30px;
          }
      }
  }
  </style>