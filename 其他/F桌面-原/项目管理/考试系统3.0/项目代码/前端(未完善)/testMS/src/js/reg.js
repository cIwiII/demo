// index主js文件
console.log('exercises的主js文件')
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
import '../sass/reg.scss';
// import {tel,pwd} from './other/gg'
class RU{
    static telReg=/^1[3-9]\d{9}$/;
    static passwordReg=/^[a-zA-Z][0-9A-Za-z]{3,11}$/;
    static telRe(str){
        return this.telReg.test(str);
    }
    static pwdRe(str){
        return this.passwordReg.test(str);
    }
}

$(function(){
    //输入验证


    //注册请求
    $('.login4').on('click',function(){
        let acc=$('#acc').val(),pwd=$('#pwd').val(),gpwd=$('#gpwd').val();
        console.log(acc,pwd,gpwd);
        if(!RU.telRe(acc)){
            alert('手机号格式不正确')
        }else if(!RU.pwdRe(pwd)){
            alert('密码格式不正确')
        }else if(pwd!=gpwd){
            alert('两次密码不一致')
        }else{
            $.ajax({
                url:`/user/${acc}/${pwd}`,
                type:'post',
                success:function(data){
                    alert(data.message);
                    if(data.code==200){
                        location.href='./login.html'
                    }
                }
            })
        }
        
    });
    //去登陆
    $('.reg').on('click',function(){
        location.href='./login.html'
    })
    
})