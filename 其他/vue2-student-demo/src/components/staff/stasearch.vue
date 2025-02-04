<template>
  <div class="search">
    <h3>搜索员工</h3>
    <select v-model="search1" @change="search">
      <option value="编号">编号</option>
      <option value="名字"  selected>名字</option>
      <option value="部门">部门</option>
      <option value="性别">性别</option>
      <option value="年龄">年龄</option>
     
    </select>
    <input type="text" placeholder="请输入内容" v-model="search2" @keyup.enter="search">
  </div>
</template>

<script>
export default {
  props:[],
  data(){
    return {
      //用model时不用 selected，指定默认选项
      search1:'名字',
      search2:'',
      
    }
  },
  methods:{
    search(){
      this.$emit('putfilt',this.search1,this.search2);
      this.search2='';
    }
  }
  
}
</script>

<style lang="scss" scoped>
.search{
  padding-left: 30px;
}
</style>