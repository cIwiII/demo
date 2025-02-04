
// console.log('index的js文件')
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../sass/index.scss';

//服务器图片路径前段（服务区地址）
var webAdress='http://192.168.11.17:3000/images/'
//鉴权
if (sessionStorage.getItem('token')) {
    $.ajax({
        url:'/user',
        type:'get',
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        },
        success:function(data){
            // alert('鉴权验证成功接收返回值')
            if(data.code!=200){
                alert(data.message);
                location.href = '../html/login.html';
            }
        }
    })
} else {
    alert('未登录')
    location.href = '../html/login.html';
}

$(function () {

    //导航公共19-159
    function htmlpersonRander() {
        // console.log('名字头像执行');
        $('.username').html(sessionStorage.getItem('name'));
        //头像
        $('.tout img').attr('src', webAdress+sessionStorage.getItem('headimg'))
    }
    htmlpersonRander();

 

    //模态框中资料渲染
    function personDataRander() {
        $('.username').html(sessionStorage.getItem('name'));
        //头像
        $('#modalimg').attr('src', webAdress+sessionStorage.getItem('headimg'))
        $('.modalusername').html(sessionStorage.getItem('name'));
        $('#uppersondata22').val(sessionStorage.getItem('name'));
        $('#uppersondata21').val(sessionStorage.getItem('phone'));
        if (sessionStorage.getItem('gender') == '男') {
            $('#boy').prop('checked', true);
        } else {
            $('#girl').prop('checked', true);
        }
        $('#uppersondata24').html(`<option value="">信息中心</option>
                                <option value="">信息中心</option>
                                <option value="">信息中心</option>
                                <option value="">信息中心</option>
                                <option value="">信息中心</option>`
        );
    }
    //点击页面头像
    $('#modalul').on('click', function (event) {
        let ul = event.target.innerText
        // console.log(ul);
        if (ul == '修改资料') {
            personDataRander();
        } else if (ul == '排行榜') {
            console.log('排行榜');
            lists();
        } else if (ul == '退出登录') {
            $('#quit2').css('display', 'block')
        }
    })
    //退出登录
    $('#quit2').on('click', function (event) {
        if (event.target.innerHTML == '取消') {
            this.style.display = "none"
        } else if (event.target.innerHTML == '确认') {
            this.style.display = "none";
            sessionStorage.clear();
            location.href = '../html/login.html';
        }
    })
    //排行榜展示
    function lists(){
        $.ajax({
            url: '/testeds',
            type: 'get',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function (data) {
                // alert(data.message)
                if (data.code == 200) {
                    let s=data.data
                    s.sort((a,b)=>{
                        return b.score - a.score
                    })
                    let content='';
                    s.forEach((val,index)=>{
                        let s=index+1
                        content+=`<tr>
                                    <td>${s}</td>
                                    <td>${val.testId.title}</td>
                                    <td>${val.score}</td>
                                </tr>`
                    })
                    $('#leaderboard tbody').html(content);
                }
            }
        });
    }



    //头像上传
    $('#modalimg').on('click', function () {
        $('#updataimg').click();
    });
    //立即显示(浏览器不同)
    function getImgURL(file){
        var url=null;
        if(window.createObjectURL!=undefined){// 兼容basic
            url=window.createObjectURL(file)
        }else if(window.URL!=undefined){//兼容mozilla(firefox)
            url=window.URL.createObjectURL(file)
        }else if(window.webkitURL!=undefined){  //兼容谷歌 or webtik
            url=window.webkitURL.createObjectURL(file)
        }
        return url;
    }
    $('#updataimg').on('change',function(){
        let objUrl=getImgURL(this.files[0]);
        let size=this.files[0].size;
        if(size>=1024000*10){//图片超过10m
            alert('图片超过10M,换个小点的图片吧');return
        }
        $('#modalimg').attr('src',objUrl)
    })
    //确认修改
    $('#updataok').on('click', function () {
        
        let  headimg,name = $('#uppersondata22').val(), gender;
        if ($('#boy').has('checked')) {
            gender = '男'
        } else {
            gender = '女'
        }
        
        //获取文件--对象 
        let file = $('#updataimg').get(0).files[0];
        // if (!file) {  //选择不修改头像
        //     alert('请选择文件');
        //     return
        // }
        let form=null
        // alert(!file)//true
        if (file) {  //修改头像
            headimg = file.name
            form = new FormData(); form.append('imgna', file);
            let imgReg = /\.(png|jpg|jpeg|gif)$/;
            if (!imgReg.test(file.name)) {
                alert('文件格式不正确，请重新选择');
                return
            }
        }

        alert('触发')
        //图片上传前端服务器
        $.ajax({
            url: `/user/${name}/${gender}`,
            type: 'put',
            data: form,
            //阻止jquery数据自动格式化处理（以非JSON传输）
            contentType: false,
            processData: false,
            cache: false,
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function (data) {
                alert(data.message);
                // alert(data.code == 200)
                if (data.code == 200) {
                    sessionStorage.setItem('name', data.data.name)
                    sessionStorage.setItem('gender', data.data.gender)
                    sessionStorage.setItem('headimg', data.data.avatar)
                    htmlpersonRander()
                }
            }
        })
    })
    //以上为header头部区


    //考试类型渲染
    function typesRander(dataArr){
        //若数据库类型图片路径。src改为对应路径
        let content='';
        dataArr.forEach(function(val,index){
            content+=`<a href="./tests.html?testTypeId=${val._id}">
            <img src="../image/tes${++index}.png" alt="tes${++index}.png文件缺失">
            <div>${val.type}</div> </a> `
        });
        $('.body12').html(content)
    }
    //考试类型获取
    $.ajax({
        url:'/types',
        type:'get',
        success:function(data){
            // alert(data.message);
            typesRander(data.data)
        }
    })











})
