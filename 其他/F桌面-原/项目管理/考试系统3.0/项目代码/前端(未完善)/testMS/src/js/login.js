// index主js文件
console.log('login的主js文件')
import '../sass/login.scss';

class RU {
    static telReg = /^1[3-9]\d{9}$/;
    static passwordReg = /^[a-zA-Z][0-9A-Za-z]{3,11}$/;
    static telRe(str) {
        return this.telReg.test(str);
    }
    static pwdRe(str) {
        return this.passwordReg.test(str);
    }
}
$(function () {
    $('.login4').on('click', function () {
        let acc = $('#acc').val(), pwd = $('#pwd').val();
        console.log(acc, pwd);
        if (!RU.telRe(acc)) {
            alert('账号格式不正确'); return
        }
        if (!RU.pwdRe(pwd)) {
            alert('密码格式不正确'); return
        }
        $.ajax({
            url: `/user/${acc}/${pwd}`,
            type: 'get',
            success: function (data) {
                alert(data.message);
                if (data.code == 200) {
                    sessionStorage.setItem('token', data.data);
                    //解密请求,临时存储
                    $.ajax({
                        url: '/index',
                        type: 'post',
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem('token')
                        },
                        success: function (data) {
                            // alert('解密成功')
                            // console.log(data.data);
                            if (data.code == 200) {
                                sessionStorage.setItem('stuId', data.data._id)
                                sessionStorage.setItem('name', data.data.name)
                                sessionStorage.setItem('phone', data.data.phone)
                                sessionStorage.setItem('gender', data.data.gender)
                                sessionStorage.setItem('headimg', data.data.avatar)
                                location.href = './index.html'
                            }
                            
                        }
                    });
                    
                }
            }
        })


    });
    $('.reg').on('click', function () {
        location.href = './reg.html'
    })

})