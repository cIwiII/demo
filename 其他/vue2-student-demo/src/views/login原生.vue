<template>
  <div class="login">
    <div class="log">
      <img src=".././assets/logo-250px.png" alt="">
      <div><span>用户名：</span><input type="text" placeholder="请输入用户名" v-model="user.username"></div>
      <div class="pwd"><span>密码：</span><input type="text" v-model="user.password" placeholder="请输入用户名"></div>
      <div class="xlog" v-on:click="login">登录</div>
      <div class="xlr">
        <router-link to="/reg">没有注册？去注册</router-link>
        </div>
      <div class="xreg">没有注册？去注册</div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
      return {
        user:{username:'',password:''}
      }
    },
    methods:{
      async login(){
        if(this.user.username.length<=3){
            alert('账号输入不合法');return
        }
        if(this.user.password.length<=2){
          alert('密码输入不合法');return
        }
        let login1=await this.$http.user.login(this.user)
        console.log(login1)
        if(login1.data.code==1){
            alert(login1.data.message);
            sessionStorage.setItem('token',login1.data.token);
            sessionStorage.setItem('username',this.user.username);
            this.$router.replace('/home')
        }else{
          alert('登陆失败')
        }
        
      }
    }

}
</script>

<style lang="scss" scoped>
.login{
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
