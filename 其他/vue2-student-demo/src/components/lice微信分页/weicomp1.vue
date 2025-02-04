<template>
  <div class="ac">
    <div class="asd">
        <label for="">邮箱</label>          
                                         <!-- 绑定v-modle -->
        <div class="asd-1"><input type="text" v-model="ems">
        <p>作为登录帐号，请填写未被微信开放平台注册、未被微信公众平台注册、未被微信私人帐号绑定的邮箱</p>
      </div>
      </div>
        <div class="asd">
        <label for="">密码</label>                 <!-- 绑定v-modle -->
        <div class="asd-1"><input type="password" v-model="pwd">
        <p>字母、数字或者英文符号，最短6位，区分大小写</p>
      </div>
      </div>
       <div class="asd">
        <label for="">再次输入密码</label>
        <div class="asd-1"><input type="password" v-model="rpwd"> 
      </div>                                       <!-- 绑定v-modle -->
      </div>
       <div class="asd">
        <label for="">验证码</label>           <!-- 验证码没弄 麻烦 -->
        <div class="asd-1"><input type="text" class="code">
         <span>验证码画布</span><a href="">换一张</a>
      </div>
      </div>
      <hr>  <!-- 接受自定义函数值传送数值通过comoponent标签的值跳转页面 -->
      <button class="buu" @click="$emit('mag','comp2',ems,pwd,rpwd)">下一步</button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            //用v-modle绑定input的值，通过上面的自定义函数传送到父元素
            ems:'',
            pwd:'',
            rpwd:''
        }
    }
     
}
</script>

<style lang='scss'>
.ac{
    padding: 40px;
    .asd{
        .code{
            width: 60px;
        }
        margin-top: 10px;
        label{
            width: 100px; 
        }
        width: 500px;
        display: flex;
        .asd-1{
            input{
                height: 30px;
                // width: 200px;
            }
            p{
                font-size: 14px;
                color: #dedede;
            }
 
            width: 200px;
            margin-left: 20px;
        }
    }
    hr{
        margin-top: 10px;
    }
    .buu{
        margin-top: 20px;
        margin-left: 40px;
        width: 120px;
        height: 40px;
        color: #fff;
        border: 0;
        border-radius: 8px ;
        background-color: rgb(74,175,51)
    }
}
</style>