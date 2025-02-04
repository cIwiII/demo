<template>
  <div class="reg">
    <div class="log">
      <img src=".././assets/logo-250px.png" alt="">
      <div><span>用户名：</span>
      <input type="text" placeholder="请输入用户名" v-model="user.username"></div>
      <div class="pwd"><span>密码：</span>
      <input type="text" placeholder="请输入密码" v-model="user.password"></div>
      <div class="pwd"><span>密码：</span>
      <input type="text" placeholder="确认密码" v-model="gpwd"></div>
      <div class="xlog" @click="reg">注册</div>
      <div class="xlr">
        <router-link to="/login">
          已有账号，去登录
        </router-link>
      </div>
      <div class="xreg">已有账号，去登录</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      user:{
        username:'',password:"",
      },gpwd:'',
    }
  },
  methods:{
    async reg(){
      if(this.user.username.length<=3){
            alert('账号输入不合法');return
        }
        if(this.user.password.length<=2){
          alert('密码输入不合法');return
        }
        if(this.user.password!=this.gpwd){
          alert('两次密码不一致');return
        }
      let res=await this.$http.user.reg(this.user)
      console.log(res)
      if(res.data.code==1){
        alert('注册成功');
        this.$router.replace('/login')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.reg{
  background-image: url('./../assets/login-bg.jpg');
  background-position: 40% 70%;
  background-size:1200px;
  width: 1200px;
  margin: 0 auto;
  height: 500px;
  .log{
    position: relative;right:-70%;top: 10%;
     width: 270px;
     img{
      width: 200px;
      margin-bottom: 20px;
     }
    input{
      height: 25px;
    }
    .pwd{
      padding-left: 16px;
      margin: 15px 0;
    }
    .xlr{
      margin-left: 52px;
      a{
        text-decoration: none;
        color: rgba(14, 133, 237, 0.753);
      }
    }
    .xlog,.xreg{
      width: 120px;
      padding: 10px 0;
      margin: 0 auto;
      background-color: rgba(14, 133, 237, 0.753);
      color: #fff;
      font-size: 14px;
      margin-left: 100px;
     
    }
  }
}
</style>
