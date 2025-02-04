// index主js文件
console.log('exercises的主js文件')
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../sass/exercises.scss';

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
    var paramArray = search.split('&');
    var value;
    paramArray.forEach(val => {
        var re = val.split('=');
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
                resolve(data);
            },
            error: function () {
                reject('异步失败');
            }
        });
    });
}
let testTypeId = getParam('testTypeId')
let testId = getParam('testId')
let ajtest = getPromise(`/tests/${testId}`, 'post');
let ajaxobj2 = getPromise('/collections', 'get')
let AZ = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
//试卷对象，题目数组
let testObj, tit;
//定时器,计时
var interId, duras = 0;


// $('body').on('click', function (event) {
//     console.log(event.target);



// })

$(function () {
    //学生答案、正确答案
    let anArr = JSON.parse(sessionStorage.getItem('anArr')), testAnArr = [];
    async function ajatit() {
        let data = await ajtest;
        let collections = await ajaxobj2;  //获取所有，判断是否被收藏
        let coIdArr = collections.data.map(val => val.exerciseId._id)//所有收藏题目id
        //试卷对象，题目
        testObj = data.data[0];
        tit = testObj.exerciseId;
        let content1 = '', content2 = '', content4 = '', content5 = '';
        tit.forEach((val, index) => {
            let content3 = '';
            let s = index + 1 //题号
            //收藏夹里包含现在这道题，说明被收藏（对应选项加背景）lin6
            let sc = `<div data-v="${val._id}">收藏</div>`
            let lefsc = `<div id="titx${s}"></div>`
            if (coIdArr.includes(val._id)) {
                sc = `<div data-v="${val._id}" class="shous">收藏</div>`
                lefsc = `<div id="titx${s}" class="testsc"></div>`
            }


            if (val.type == 0) {
                val.options.forEach((vals, ss) => {
                    if (anArr[index].length == 0) {
                        content3 += `<li><input type="radio" name="name${s}" value="${s}*${ss}" id="${AZ[ss]}${s}" class="aaa input">
                        <label for="${AZ[ss]}${s}">${AZ[ss]}.${vals}</label></li>`
                    } else {
                        if (anArr[index][0] = ss) {
                            content3 += `<li><input type="radio" name="name${s}" value="${s}*${ss}" id="${AZ[ss]}${s}" class="aaa input" checked="checked">
                                <label for="${AZ[ss]}${s}">${AZ[ss]}.${vals}</label></li>`
                        } else {
                            content3 += `<li><input type="radio" name="name${s}" value="${s}*${ss}" id="${AZ[ss]}${s}" class="aaa input">
                                <label for="${AZ[ss]}${s}">${AZ[ss]}.${vals}</label></li>`
                        }

                    }
                })
                content1 += `<div>
                                <h4>
                                    <span><label>${s}</label>.${val.topics}</span>
                                    ${sc}
                                </h4>
                                <ul>${content3}</ul>
                            </div>`
                if (anArr[index].length == 0) {
                    content4 += `<div>
                                <div id="tits${s}">${s}</div>
                                ${lefsc}
                            </div>`
                } else {
                    if (anArr[index].length!=0) {
                        content4 += `<div>
                                <div id="tits${s}" class="bule">${s}</div>
                                ${lefsc}
                            </div>`
                    }else{
                        content4 += `<div>
                                <div id="tits${s}">${s}</div>
                                ${lefsc}
                            </div>`
                    }}
                
            } else {
                val.options.forEach((vals, ss) => {  //ss，index选项编号
                    content3 += `<li><input type="checkbox" value="${s}*${ss}" id="${AZ[ss]}${s}" class="input">
                      <label for="${AZ[ss]}${s}">${AZ[ss]}.${vals}</label></li>`
                })
                content2 += `<div>
                                <h4><span><label>${s}</label>.${val.topics}</span>
                                    ${sc}
                                </h4>
                                <ul>${content3}</ul>
                            </div>`
                content5 += `<div>
                                <div id="tits${s}">${s}</div>
                                ${lefsc}
                            </div>`
            }

        });
        $('.radioque .radi1').html(content1);
        $('.checkboxque .chec1').html(content2);
        $('#red1').html(content4);
        $('#che1').html(content5);


        let times = JSON.parse(sessionStorage.getItem("time"))
        let h = parseInt(times / 3600)
        let m = parseInt(parseInt(times % 3600) / 60)
        let s = parseInt(times % 60);

        if (h < 10) { h = '0' + h };
        if (times / 3600 == 0) { m = '00' } else if (m < 10) { m = '0' + m };
        if (times / 60 == 0) { s = '00' } else if (s < 10) { s = '0' + s };
        $('.collrip .h').text(h)
        $('.collrip .m').text(m)
        $('.collrip .s').text(s)
        function startTime() {
            //创建周期性的定时器
            interId = setInterval(function () {
                --times
                let h = parseInt(times / 3600)
                let m = parseInt(parseInt(times % 3600) / 60)
                let s = parseInt(times % 60);
                //操作后存储
                sessionStorage.setItem("time", times)
                if (h < 10) { h = '0' + h };
                if (times / 3600 == 0) { m = '00' } else if (m < 10) { m = '0' + m };
                if (times / 60 == 0) { s = '00' } else if (s < 10) { s = '0' + s };
                $('.collrip .h').text(h)
                $('.collrip .m').text(m)
                $('.collrip .s').text(s)
                if (times == 0) { clearInterval(interId); }



                /* //获取秒值
                var oldSeconds = $('.collrip .s').text();
                //获取分值
                var oldMinutes = $('.collrip .m').text();
                //时
                var oldHours = $('.collrip .h').text();
                if (oldSeconds > 0) {
                    --oldSeconds;
                    duras++
                    $('.collrip .s').text(oldSeconds);
                } else {
                    if (oldMinutes > 0) {
                        --oldMinutes
                        $('.collrip .m').text(oldMinutes)
                        //重置秒值为59
                        $('.collrip .s').text(59)
                        oldSeconds = 59;
                    }
                    else {
                        if (oldHours > 0) {
                            --oldHours
                            $('.collrip .h').text(oldHours)
                            //重置秒值为59
                            $('.collrip .m').text(59)
                            $('.collrip .s').text(59)
                            oldMinutes = 59;
                            oldSeconds = 59;
                        }
                        else {
                            clearInterval(interId);
                        }
                    }
                } */
            }, 1000);
        }
        startTime();

        //考生答案二维数组(转字符串) 生成对应答案框
        
        // for (let index = 0; index < testObj.exerciseId.length; index++) {
        //     anArr.push([]);
        //     console.log('12', anArr);
        // }
        //为空的题有多少
        let r = 0
        anArr.forEach(val => {
            if (val.length != 0) {
                r++
            }
        })
        //浏览进度
        $('.proce').html(`<p>当前进度</p>
      <p><span>${r}</span>/<span>${anArr.length}</span></p>
      <p> <progress max="${anArr.length}" value="${r}"></progress></p>`)
    }
    ajatit()

    //答题卡渲染,答案存储，参数题号n,选项s
    $('.collcontent').on('click', async function (event) {
        let target = event.target
        if ($(target).hasClass('input')) {
            let n = $(target).val().split('*')[0]
            let s = $(target).val().split('*')[1]
            let a = $(target).hasClass('aaa')
            // console.log('input', n, s, a);
            //已做
            $(`#tits${n}`).addClass('bule')
            n--
            s = Number(s)
            if (anArr[n].length == 0) {//不存在元素创建添加
                anArr[n].push(s)
            } else {
                if (a) {
                    //单选，替换不传参数
                    anArr[n][0] = s;
                } else if (!$(target).prop('checked')) {
                    //删除
                    let arr = anArr[n].filter(val => val != s)
                    anArr[n] = arr
                } else if (!a) {
                    //多选，a=1
                    anArr[n].push(s)
                }
            }
            //操作后存储
            let anArrJSON = JSON.stringify(anArr)
            sessionStorage.setItem("anArr", anArrJSON)

            //针对多选取消已做
            if (anArr[n].length == 0) {
                n++
                $(`#tits${n}`).removeClass('bule')
            }
            console.log(anArr);
            //为空的题有多少
            let r = 0
            anArr.forEach(val => {
                if (val.length != 0) {
                    r++
                }
            })
            //浏览进度
            $('.proce').html(`<p>当前进度</p>
                <p><span>${r}</span>/<span>${anArr.length}</span></p>
                <p> 
                    <progress max="${anArr.length}" value="${r}"></progress>
                </p>`)


        }
        //添加收藏,相关信息
        if (target.innerText == '收藏') {
            let tit = $(target).prev().find('label').text();
            $(target).toggleClass('shous');
            $('#titx' + tit).toggleClass('testsc');
            //题目Id
            let exerId = $(target).attr('data-v')
            // alert(exerId)
            if ($(target).hasClass('shous')) { //收藏

                let coll = await getPromise(`/collections/${exerId}`, 'post');
                alert(coll.message)
            } else {  //取消收藏
                let coll = await getPromise(`/collections/${exerId}`, 'delete');
                alert(coll.message)
            }
        }

    })
    //试卷提交
    $('.collright2').on('click', function () {
        let r = 0
        anArr.forEach(val => {
            if (val.length != 0) {
                ++r
            }
        })
        console.log(r, anArr.length)
        if (r != anArr.length) { $('#yeorno').html('有题目未完成，确认现在交卷吗？') }
    })
    $('#testOk2').on('click', async function (event) {
        // console.log('提交触发', event.target);
        //提交试卷，定时器停止
        clearInterval(interId);
        //学生答案排序
        anArr.forEach(val => {
            val.sort((a, b) => a - b)
        })
        console.log('你的答题卡', anArr)
        //正确答案数组
        console.log(testObj.exerciseId);
        testAnArr = testObj.exerciseId.map(function (val) {
            return val.answer
        })


        //考试分数
        let scoss = 0;
        //正确率  正确个数
        let num1 = 0;
        //错题Id三维数组(id和学生错误答案)[[id,[答案]],[id,[答案]]]
        let errorArr = []
        //正确率和分数,错题Id集合

        for (let index = 0; index < testAnArr.length; ++index) {
            console.log(anArr[index], testAnArr[index]);
            let yeno = testAnArr[index].every(function (val, ins) {
                if (anArr[index].length != 0) {
                    return val == anArr[index][ins]
                } else {
                    return false
                }

            })
            if (yeno) {
                //分数
                console.log('正确执行');
                scoss += testObj.exerciseId[index].score;
                num1++
            } else { //错题id添加
                console.log('错误执行');
                let iderror = [testObj.exerciseId[index]._id, anArr[index]]
                errorArr.push(iderror)

            }
        }
        //正确率转为百分比
        let ass = `${parseInt(num1 / testAnArr.length * 100)}%`

        //错题添加请求
        let errorArrJSON = JSON.stringify(errorArr)
        let req2 = getPromise(`/errors/${errorArrJSON}`, 'post');
        // console.log('分数，正确率')
        let res2 = await req2;
        alert('错题添加', res2.message);

        let ajaxdata = { teId: testId, type: testTypeId, stuAnArr: anArr, scoss, ass, duras }
        ajaxdata = JSON.stringify(ajaxdata)
        $.ajax({
            url: `/testeds`,
            type: 'post',
            contentType: 'application/json',
            data: ajaxdata,
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function (data) {
                alert(data.message)
                location.href = `./tests-end.html?testId=${testId}&scoss=${scoss}&ass=${ass}&duras=${duras}&testTypeId=${testTypeId}`

            }

        });


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
            console.log('排行榜'); lists();
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