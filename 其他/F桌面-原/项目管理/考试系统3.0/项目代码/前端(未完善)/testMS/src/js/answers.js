// 考试解析主js文件
console.log('answers的主js文件')
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../sass/answers.scss';


//鉴权
if (sessionStorage.getItem('token')) {
    $.ajax({
        url: '/user',
        type: 'get',
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        },
        success: function (data) {
            // alert('鉴权验证成功接收返回值')
            if (data.code != 200) {
                alert(data.message);
                location.href = '../html/login.html';
            }
        }
    })
} else {
    alert('未登录')
    location.href = '../html/login.html';
}

function getParam(dataName) {
    var search = location.search;
    search = search.substring(1);
    // console.log(search);
    var paramArray = search.split('&');
    // console.log(paramArray);
    var value;
    paramArray.forEach(val => {
        var re = val.split('=');
        // console.log(re[0], re[1]);
        if (re[0] == dataName) {
            value = re[1];
        }
    });
    return value;
}
function getPromise(url, type) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url,
            type,
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function (data) {
                // console.log('resolve');
                resolve(data);
            },
            error: function () {
                // console.log('reject');
                reject('异步失败');
            }
        });
    });
}


//服务器获取
var testId = getParam('testId')
var testTypeId = getParam('testTypeId')
let ajaxobj = getPromise(`/testeds/${testId}`, 'post');
let ajaxobj2 = getPromise('/collections', 'get')
$(function () {
    //解析渲染
    async function aTestedRander() {
        let testedsObj = await ajaxobj;
        let collections = await ajaxobj2;  //获取所有，判断是否被收藏
        let coIdArr = collections.data.map(val => val.exerciseId._id)//所有收藏题目id

        let dataArr = testedsObj.data[0].testId.exerciseId //试卷题目数组
        let stuAnArr = testedsObj.data[0].answers  //学生试卷答案
        let testAnArr = testedsObj.data[0].testId.exerciseId.map(val => val.answer)

        let opAZ = ['A', 'B', 'C', 'D', 'E', 'F']
        let content1 = '', content2 = '', content3 = '', content4 = '';
        dataArr.forEach(function (val, index) {
            let ind = index + 1, sa = stuAnArr[index], te = testAnArr[index]
            //当前题学生答案      ↑  学生本题答案和  本题正确答案
            let aa = '未作答', aa1 = '';
            console.log(sa, stuAnArr)
            for (let s = 0; s < sa.length; s++) {
                aa1 += opAZ[sa[s]]
            } if (aa1.length != 0) { aa = aa1 }  //默认未作答，作答aa=aa1
            //当前题正确答案
            let ab = ''
            for (let i = 0; i < te.length; i++) {
                ab += opAZ[te[i]]
            }
            let simg;
            if (aa == ab) { simg = `<div class="imgs"><div class="ok"></div>答对了！！！</div>` }
            else { simg = `<div class="imgs"><div></div>答错了！！！</div>` }
            //收藏夹里包含现在这道题，说明被收藏（对应选项加背景）lin6
            let sc = `<div data-v="${val._id}">收藏</div>`
            let lefsc = `<div id="titx${ind}"></div>`
            console.log(coIdArr.includes(val._id), val._id, coIdArr);
            if (coIdArr.includes(val._id)) {
                sc = `<div data-v="${val._id}" class="shous">收藏</div>`
                lefsc = `<div id="titx${ind}" class="testsc"></div>`
            }

            //单选
            if (val.type == '0') {
                let optionStr = ''
                for (let s = 0; s < val.options.length; s++) {  //选项
                    optionStr += ` <li><input type="radio" disabled>${opAZ[s]}.${val.options[s]}</li>`
                }
                content1 += `
                <div>
                    <h4><span><label for="">${ind}</label>.${val.topics}</span>${sc}</h4>
                    <ul>
                        ${optionStr}
                    </ul>
                    <div>${simg}
                        <p>考生答案：<span>${aa}</span></p>
                        <p>正确答案：<span>${ab}</span></p>
                        <p>答案解析：<span>${val.analysis}</span></p>
                    </div>
                </div>`


                if (aa == ab) {  //正确答题卡 


                    content3 += `<div>
                                    <div id="tits${ind}" class="bule">${ind}</div> ${lefsc} 
                                </div>`
                } else {  // 错误
                    content3 +=
                        `<div><div id="tits${ind}" class="red">${ind}</div> ${lefsc}</div>`
                }
            } //多选
            else {
                let optionStr = ''
                for (let s = 0; s < val.options.length; s++) {
                    optionStr += ` <li><input type="checkbox" disabled>${opAZ[s]}.${val.options[s]}</li>`
                }
                content2 += `
                <div>
                    <h4><span><label for="">${ind}</label>.${val.topics}</span>${sc}</h4>
                    <ul>${optionStr}</ul>
                    <div>${simg}
                        <p>考生答案：<span>${aa}</span></p>
                        <p>正确答案：<span>${ab}</span></p>
                        <p>答案解析：<span>${val.analysis}</span></p>
                    </div>
                </div>`


                if (aa == ab) {   //正确答题卡
                    content4 += `<div>
                                    <div id="tits${ind}" class="bule">${ind}</div> ${lefsc}
                                </div>`
                } else {   //错误
                    content4 += `<div>
                                    <div id="tits${ind}" class="red">${ind}</div> ${lefsc} 
                                </div>`
                }
            }

        })
        $('.radi1').html(content1);  //单选
        $('.chec1').html(content2);  //多选
        $('#red1').html(content3);  //单选答题卡
        $('#che1').html(content4);  //多选答题卡

        //考试成绩，用时s  if (h < 10) { h = '0' + h }; 
        let time = parseInt(testedsObj.data[0].durations)
        let h = parseInt(time / 3600),
            m = parseInt(parseInt(time % 3600) / 60),
            s = parseInt(time % 60);
        if (h < 10) { h = '0' + h };
        if (time / 3600 == 0) { m = '00' } else if (m < 10) { m = '0' + m };
        if (time / 60 == 0) { s = '00' } else if (s < 10) { s = '0' + s };
        $('.collright #score').html(testedsObj.data[0].score)
        $('.collright .testTime').html(`<span>${h}</span>:
                                    <span>${m}</span>:
                                    <span>${s}</span>`);
    }
    aTestedRander()

    $('.collcontent').on('click', async function (event) {
        let target = event.target;
        if (target.innerText == '收藏') {
            let tit = $(target).prev().find('label').text();
            $(target).toggleClass('shous');
            $('#titx' + tit).toggleClass('testsc');
            //题目Id
            let exerId = $(target).attr('data-v')
            if ($(target).hasClass('shous')) { //收藏
                let coll = await getPromise(`/collections/${exerId}`, 'post');
                alert(coll.message)
            } else {  //取消收藏
                let coll = await getPromise(`/collections/${exerId}`, 'delete');
                alert(coll.message)
            }
        }
    })
    $('.collright2').on('click', function () {
        location.href = `./tests.html?testTypeId=${testTypeId}`
    })



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