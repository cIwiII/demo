<template>
  <div>
    <div class="bubt">
        <h3>感谢注册，确认邮件已发送至你的注册邮箱 :
             haibao1024@gmail.com</h3>
             <p>请进入邮箱查看邮件，并激活微信开放平台帐号。</p>
             <!-- 点击登录 -->
             <button @click="bct">登录邮箱</button>
             <p>没有收到邮件？</p>
             <ol>  <!-- 接受自定义函数值传送数值通过comoponent标签的值跳转页面 -->
                <li>请检查邮箱地址是否正确，你可以返回 <a href="#" @click="$emit('yan','comp1')">重新填写</a></li>
                <li>检查你的邮件垃圾箱</li>
                <li>若仍未收到确认，请尝试 <a href="#" @click="$emit('yan','comp1')">重新发送</a></li>
                <!-- 接受自定义函数值传送数值通过comoponent标签的值跳转页面 -->
             </ol>
    </div>
  </div>
</template>

<script>
export default {
      methods:{
        //自己设置的验证登录邮箱 简单点 获取用户输入的值 对比之前注册邮箱存储的值
         bct(){
          let re=prompt('请输入邮箱登录');
           this.$emit('ems',re,'comp3')
           //         ems是自定义函数，re是用户输出的值传过去对比，comp3是跳转页面的component
         }
      }
}
</script>

<style lang='scss'>
.bubt{

    padding: 40px 0;
    margin: 0 auto;
    width: 60%;
    p{
        color: #dedede;
        font-size: 14px;
    }
    button{
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