<template>
  <div>
    <input type="text" :value="username" @input="inputValue">
    <button @click="getValue">获取</button>
    <input v-model="password" type="password">
    <button>登录</button>
    <!-- 单选按钮 -->
    <input type="radio" v-model="gender" value="男">
    <input type="radio" v-model="gender" value="女">
    <!-- 复选框 -->
    <input type="checkbox" v-model="xueli" value="本科">
    <input type="checkbox" v-model="xueli" value="专科">
    <input type="checkbox" v-model="xueli" value="硕士">
    <!-- 下拉框 -->
    <select name="" id="" v-model="idCard">
      <option value="sfz">身份证</option>
      <option value="jsz">驾驶证</option>
      <option value="hz">护照</option>
    </select>
    <textarea v-model="introduce" name="" id="" cols="30" rows="10"></textarea>
  </div>
</template>

<script>
export default {
  data(){
    return{
      username:"小王",
      password:"1234",
      gender:"",
      xueli:[
        
      ],
      idCard:'hz',
      introduce:""
    }
  },
  methods:{
    getValue(){
      // console.log(event.target.value);
      console.log(this.username);
    },
    inputValue(event){
      this.username = event.target.value
    }
  }
}
</script>

<style>

</style>