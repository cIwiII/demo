<template>
  <div class="a1">
    <div class="but">
        <div class="jsc"></div>
        <!-- 通过点击事件改变status的值, 通过对吧status值来获取状态 -->
      <div class="aa" :class="{acb:status=='comp1'}"><button :class="{act:status=='comp1'}" @click=" yanzheng('comp1')">1</button><p>基本信息</p></div>
      <div class="aa" :class="{acb:status=='comp2'}"><button :class="{act:status=='comp2'}" @click=" yanzheng('comp2')">2</button><p>邮箱激活</p></div>
      <div class="aa" :class="{acb:status=='comp3'}"><button :class="{act:status=='comp3'}" @click=" log('comp3')">3</button><p>完善开发者资料</p></div>     
    </div>
    <keep-alive>
        <component :is="status" @mag='mag' @yan='yanzheng' @ems='telt'></component>
        <!-- 传送自定义函数           mag 主要是第一个页面接受注册值的函数，yan是第一 第二页面的跳转函数   ems是第二第三页面之间的接收参数并且验证函数 -->
    </keep-alive>
    
  </div>
</template>

<script>
import comp1 from './weicomp1.vue'
import comp2 from './weicomp2.vue'
import comp3 from './weicomp3.vue'
export default {
    components:{
           comp1,
           comp2,
           comp3,
    },
    data(){
        return{
            status:'comp1',
            tel:/^[A-Za-z0-9-_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            ems:'',
            pwd:'',
            rpwd:'',
            logems:''
        }
    },
    methods:{
        yanzheng(val ){
        //第一个页面和第二函数跳转
        //通过存储的值来对比，注册了值就会被保留，点击就自动验证跳转
            if(this.tel.test(this.ems)){
                if(this.pwd==this.rpwd){
                     this.status=val//跳转页面的值Val
                }else{
                     alert('密码错误')
                }
               
               
            }else{
                alert('请填写正确邮箱格式')
            }      

        },
        mag(val,ems,pwd,rpwd){
            //接收用户的值从子页面把值传过来并且用函数存储下来
            this.ems=ems //邮箱
            this.pwd=pwd  //密码
            this.rpwd=rpwd  //确认密码
           this.yanzheng(val)//存储了跳转到跳转函数 吧要跳转的页面值传过去
        },
        telt(val,cop){
            this.logems=val      //存储用户登录登录邮箱val
               this.log(cop) //cop是跳转页面的值 comp3 然后到2.3页面的跳转函数
        },
        //log是2.3页面的跳转函数
        log(cop){
            //接收跳转参数， 直接验证存储了的注册邮箱值和用户登录邮箱验证值
            // 判断正确就直接赋值然后跳转
             if(this.logems==this.ems){
                this.status=cop
            }else{
                alert('邮箱错误')
            }
        }
    }
}
</script>

<style lang='scss'>
.a1{
    width: 700px;
    // height: 600px;
    margin: 0 auto;
    margin-top: 40px;
    border: 1px solid #dedede;
    .act{
    background-color: rgb(74,175,51);
    color: #fff;
}
    .acb{
        color: rgb(74,175,51);
    }
}
.but{
    position: relative;
    .jsc{
        width: 600px;
            position: absolute;
            background-color: rgb(164, 164, 164);
                top: 50%;
    left: 50%;
        height: 6px;
       margin-left: -300px;
       margin-top: -10px;
       z-index: 1;
    }
    padding: 5px;
    text-align: center;
    // width: 700px;
    // margin: 0 auto;
    justify-content: space-between;
    background-color: rgb(86, 86, 86);
    display: flex;
    .aa{
        z-index: 2     
    }
    button{
        width: 60px;
        height: 60px;
        font-size: 20px;
        border-radius: 30px;
        border: 0;
        background-color: rgb(164, 164, 164);    
          
    }

}

</style>