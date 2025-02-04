// index主js文件
console.log('exercises的主js文件')
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../sass/errors.scss';

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

//默认显示题号
var exerNum = 1;
//错题总数
var exErMax = 0;
//所有错题
var exerS = null;
//一道题的对象
var exerObj;
//一道题对象渲染,参数exercise对象

$('body').on('click', function (event) {
    console.log(event.target);
})

$(function () {


    function errorRander(errorobj, n) {
        let AZ = ['A', 'B', 'C', 'D', 'E'];
        let obj = errorobj.exerciseId
        exerObj = obj //选项需要

        //选项遍历

        let lis = ''
        let an = ''

        console.log(obj, obj.answer)
        console.log(obj.answer.length)
        for (let p = 0; p < obj.answer.length; p++) {
            an += AZ[obj.answer[p]]
        }
        let ans = ` <hr>
        <div id="nons">
            <p>正确答案：<span>${an}</span></p>
            <p>答案解析：<span>${obj.analysis}</span></p>
        </div>`

        if (obj.type == 0) {
            $('.checkboxque').css('display', 'none');
            $('.radioque').css('display', 'block');
            for (let s = 0; s < obj.options.length; s++) {
                lis += `<li><input type="radio" name="ccc" value="${s}" class="input" id="a${n}${s}"><label for="a${n}${s}">${AZ[s]}.${obj.options[s]}</label></li>`
            }
            let content = `<div><h4><label for="">${n}</label><span>.${obj.topics}</span></h4><ul>${lis}</ul>${ans}`
            $('.chec1 div').remove()
            $('.radi1').html(content)
            //删除与查看
            $('.cconfoot').html(`<div class="cck">查看解析</div>
        <div class="ccde" id="accac" data-d="${obj._id}" data-ds="d${n}">删除本题</div>`)
        } else if (obj.type == 1) {
            $('.radioque').css('display', 'none');
            $('.checkboxque').css('display', 'block');
            for (let s = 0; s < obj.options.length; s++) {
                lis += `<li><input type="checkbox" value="${s}" class="input"  id="a${n}${s}"><label for="a${n}${s}">${AZ[s]}.${obj.options[s]}</label></li>`
            }
            let content = `<div><h4><label for="">${n}</label><span>.${obj.topics}</span></h4><ul>${lis}</ul>${ans}`
            $('.radi1 div').remove()
            $('.chec1').html(content)
            //删除与查看
            $('.cconfoot').html(`<div class="cck">查看解析</div>
        <div class="ccde" id=accac data-d="${obj._id}" data-ds="f${n}">删除本题</div>`)
        }


        //浏览进度
        $('.collright .colri1').html(`<p>当前进度</p>
        <p><span id="pre">${n}</span>/<span id="total">${exErMax}</span></p>
        <p> <progress max="${exErMax}" value="${n}"></progress></p>`)



    }
    //选项渲染,---(参数:学生所有错题数组)
    function exerMenuRander(s) {
        console.log('答题卡渲染ok');
        let content1 = '', content2 = '';
        let nm=1,nn=1
        s.forEach((val, index) => {
            let n = index + 1
            if (val.exerciseId.type == 0) {
                content1 += `<div id=deled${nn}>${nn}</div>`
                nn++
            } else if (val.exerciseId.type == 1) {
                content2 += `<div id=delef${nm}>${nm}</div>`
                nm++
            }
        })
        $('#red1').html(content1)
        $('#che1').html(content2)

    }
    function chx() {
        $.ajax({
            url: '/errors',
            type: 'get',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function (data) {
                // alert(data.message)
                exerS = data.data //数组
                // console.log( exerS );
                exErMax = data.data.length;//进度使用
                exerMenuRander(data.data)
                // console.log(data.data[0].exerciseId);
                errorRander(data.data[0], exerNum)
                //删除本题
                $('#accac').on('click', delet)
                $('.cck').on('click', cck)
                //答题显示解析
                $('.collcontent').on('click', anck)


            }
        })
    }
    chx()

    function delet(event) {
        console.log('执行');
        let exId = $(event.target).attr('data-d')
        let tih = $(event.target).attr('data-ds')

        $.ajax({
            url: `/errors/${exId}`,
            type: 'delete',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function (data) {
                alert(data.message)
                if (data.code == 200) {
                    $(`#dele${tih}`).remove();

                    $.ajax({
                        url: '/errors',
                        type: 'get',
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem('token')
                        },
                        success: function (data) {
                            // alert(data.message)
                            exerS = data.data //数组
                            exErMax = data.data.length;//进度使用
                            exerMenuRander(data.data)
                            console.log(data.data[0].exerciseId);
                            exerNum = 1
                            errorRander(data.data[0], exerNum)
                            //答题显示解析
                            $('.collcontent').on('click', anck)
                        }
                    })

                }

            }
        })
    }

    //查看解析

    function cck() {
        $('#nons').css('display', 'block')
    }



    //上一题
    $('#last').on('click', function () {
        if (exerNum == 1) {
            alert('已经是第一道题了')
            return
        } else {
            exerNum--
            let c = exerNum - 1
            errorRander(exerS[c], exerNum)
            //删除本题
            $('#accac').on('click', delet)
            $('.cck').on('click', cck)
            //答题显示解析
            $('.collcontent').on('click', anck)
        }
    })
    //下一题
    $('#next').on('click', function () {
        let s = exerS.length
        if (exerNum == s) {
            alert('你很棒，后面已经没有了错题了')
            return
        } else {
            exerNum++
            let s = exerNum - 1
            errorRander(exerS[s], exerNum)
            //删除本题
            $('#accac').on('click', delet)
            $('.cck').on('click', cck)
            //答题显示解析
            $('.collcontent').on('click', anck)
        }
    })

    //答题显示解析
    $('.collcontent').on('click', anck)
    function anck(event) {
        let target = event.target
        if ($(target).hasClass('input')) {
            // if ($(target).attr('name')) {
            cck();
            // } else {

            // }
        }
        //用户选中的个数
        // let n=this.filter(val=>$(val).prop('checked')==true).length

        //答案的个数
        // let s=exerObj.answer.length
        // if(n==s){
        //     $('#nons').css('display','block')
        // }
        //题号渲染
    }

    //服务器图片路径前段
    var webAdress = 'http://192.168.11.17:3000/images/'
    //导航公共19-159
    function htmlpersonRander() {
        console.log('名字头像执行');
        $('.username').html(sessionStorage.getItem('name'));
        //头像
        $('.tout img').attr('src', webAdress + sessionStorage.getItem('headimg'))
    }
    htmlpersonRander();


    //模态框中资料渲染
    function personDataRander() {
        $('.username').html(sessionStorage.getItem('name'));
        //头像
        $('#modalimg').attr('src', webAdress + sessionStorage.getItem('headimg'))
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
    function lists() {
        $.ajax({
            url: '/testeds',
            type: 'get',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function (data) {
                // alert(data.message)
                if (data.code == 200) {
                    let s = data.data
                    s.sort((a, b) => {
                        return b.score - a.score
                    })
                    let content = '';
                    s.forEach((val, index) => {
                        let s = index + 1
                        content += `<tr>
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
    function getImgURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) {// 兼容basic
            url = window.createObjectURL(file)
        } else if (window.URL != undefined) {//兼容mozilla(firefox)
            url = window.URL.createObjectURL(file)
        } else if (window.webkitURL != undefined) {  //兼容谷歌 or webtik
            url = window.webkitURL.createObjectURL(file)
        }
        return url;
    }
    $('#updataimg').on('change', function () {
        let objUrl = getImgURL(this.files[0]);
        let size = this.files[0].size;
        if (size >= 1024000 * 10) {//图片超过10m
            alert('图片超过10M,换个小点的图片吧'); return
        }
        $('#modalimg').attr('src', objUrl)
    })
    //确认修改
    $('#updataok').on('click', function () {
        let id = sessionStorage.getItem('stuId'), headimg,
            name = $('#uppersondata22').val(), gender;
        if ($('#boy').has('checked')) {
            gender = '男'
        } else {
            gender = '女'
        }
        //获取文件--对象 
        let file = $('#updataimg').get(0).files[0];
        let form = null
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
})