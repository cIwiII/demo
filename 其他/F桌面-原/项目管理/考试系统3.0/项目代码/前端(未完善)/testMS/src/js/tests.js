console.log("考试页面js");
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../sass/tests.scss';

//服务器图片路径前段
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
//url试卷类型Id获取
let testTypeId=getParam('testTypeId')

function getPromise(url,type) {
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

let testingInfor= getPromise('/tests','get');
let testedInfor=getPromise('/testeds','get');

$(function () {
    function htmlpersonRander(){
        // console.log('名字头像执行');
        $('.username').html(sessionStorage.getItem('name'));
        //头像
        $('.tout img').attr('src',webAdress+sessionStorage.getItem('headimg'))
    }
    htmlpersonRander();
    //进行中数据渲染
    async function testsRander(){   
        let reObj1=await testingInfor;    
        let reObj2=await testedInfor;  //单个学生已考试卷
        let reArr21=reObj2.data.map(val=>val.testId._id)  //试卷Id数组
        let content1='',content2='',num2=1;
        reObj1.data.forEach(val => {
            //是否已考,已考过，取反不进行渲染
            let stued=reArr21.includes(val._id)
            if(val.form==1 && !stued){  //可用试卷1，不可用0,是否可进入
                content1+=`<div>
                <div>
                    <img src="${webAdress}test-${num2}.png" alt="二次元">
                    <div>
                        <div><h5>${val.title}</h5><span class="fing">可参加</span></div>
                        <small>
                            <span>${val.date}</span>

                            <span>限时${val.durations}分钟</span>
                        </small>
                    </div>
                </div>
                <a href="./tests-basic-info.html?testTypeId=${testTypeId}&testId=${val._id}">进入</a>
                
            </div>`
            ++num2;if(num2==7){num2=1}
            }
           
        });
        $('#ing').html(content1);//正在进行填充
        
        reObj2.data.forEach(val=>{
            content2+=`<div>
            <div>
                <img src="${webAdress}test-${num2}.png" alt="二次元">
                <div>
                    <div><h5>${val.testId.title}</h5><span class="fed">已完成</span></div>
                    <small>
                        <span>${val.testId.date}</span>

                        <span>限时${val.durations}分钟</span>
                    </small>
                </div>
            </div>
            <a href="./answers.html?testId=${val.testId._id}">查看</a>
        </div>`
        ++num2;
        if(num2==7){num2=1};
        })
        $('#ed').html(content2);//已完成填充
        // //存到本地
        // var stuTestedJSON=JSON.stringify(reObj2.data)
        // localStorage.setItem('stuTestedJSONArr',stuTestedJSON)

    }
    testsRander();//渲染,并存储到本地



 
    //服务器图片路径前段
    var webAdress = 'http://127.0.0.1:3000/images/'
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
            console.log('排行榜');lists();
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

})