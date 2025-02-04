
//注册输入账号是否合法
var accRe = false;
//存储密码是否合法
var pwdRe = false;
var pwdRegRe1 = false;
var pwdRegRe2 = false;
//存储验证码是否正确
var codeRe = false;
//手机号正则
var telReg = /^1[3-9]\d{9}$/;
//密码正则
var pwdReg = /^[0-9a-zA-Z]{6,20}$/;
//存储真实的验证码值
var realCode1 = '';
var realCode2 = '';

//存储验证码尺寸宽度
var picWidth = 100;
//存储验证码尺寸高度
var picHeight = 60;
//存储字符个数
var codeCount = 4;
//字体最小尺寸
var minFontSize = 15;
//字体最大尺寸
var maxFontSize = 30;
//存储干扰线条数
var lineCount = 3;
function loginOut() {
    sessionStorage.removeItem('loginAcc');
    location.reload();
}

window.onload = function () {

    var loginAcc = sessionStorage.getItem('loginAcc');
    if (loginAcc == null) {
        //未登录
        document.querySelector('.LandingAndRegistration').innerHTML = `
        <a href="" class="a1 " data-toggle="modal" data-target="#exampleModal1">登录</a>
    <a href="" class="a1" data-toggle="modal" data-target="#exampleModal1">注册</a>
                                                        `
    } else {
        //已登录
        document.querySelector('.LandingAndRegistration').innerHTML = `欢迎${loginAcc}!<a href="javaScript:loginOut()">注销</a>`;
    }

    //登录页验证账号合法
    document.querySelector('.logAcc').onchange = function (event) {

        //获取用户输入内容
        var acc = event.target.value;
        //验证是否符合正则
        accRe = telReg.test(acc);
        if (accRe) {
            //合法
            var msgSpan = event.target.nextElementSibling;
            msgSpan.innerText = '';
        } else {
            //不合法
            var msgSpan = event.target.nextElementSibling;
            msgSpan.innerText = '请输入11位手机号！';
            msgSpan.style.color = 'red';

        }
    }
    //登录页密码合法
    document.querySelector('.logPwd').onchange = function (event) {

        //获取用户输入内容
        var pwd = event.target.value;
        //验证是否符合正则
        pwdRe = pwdReg.test(pwd);
        if (pwdRe) {
            //合法
            var msgSpan = event.target.nextElementSibling;
            msgSpan.innerText = '';
        } else {
            //不合法
            var msgSpan = event.target.nextElementSibling;
            msgSpan.innerText = '请输入6~20位数字、字母！';
            msgSpan.style.color = 'red';
        }
    }


    realCode1 = createCode(codeCount);//登录
    realCode2 = createCode(codeCount);//注册

    //登录获取目标验证码画布
    var canLan = document.querySelector('.canvasLanding');
    //设置验证码画布宽高
    canLan.width = picWidth;
    canLan.height = picHeight;

    //获取画笔
    var contextLan = canLan.getContext('2d');
    drawPicture(contextLan, realCode1);//传入画笔和绘制的字符
    //画布添加点击事件
    canLan.onclick = function () {
        realCode1 = createCode(codeCount);
        //清空画布
        contextLan.clearRect(0, 0, picWidth, picHeight);
        //绘制验证码
        drawPicture(contextLan, realCode1);//传入画笔和绘制的字符
    }
    //验证码合法
    document.querySelector('.landing').onchange = function (event) {
        //获取用户输入内容
        var code = event.target.value;
        //存储验证码结果
        codeRe = realCode1.toLowerCase() == code.toLowerCase();
        //判断用户输入的验证码值是否正确
        if (codeRe) {
            //正确
            var msgSpan = event.target.nextElementSibling;
            msgSpan.innerText = '';
        } else {
            //不正确
            var msgSpan = event.target.nextElementSibling;
            msgSpan.innerText = '请输入正确的验证码值！';
            msgSpan.style.color = 'red';
        }
    }
    document.querySelector('.landings').onclick = function () {  //登录
        var accEle = document.querySelector('.logAcc');
        var acc = accEle.value;

        var pwdEle = document.querySelector('.logPwd');
        var pwd = pwdEle.value;

        var usersArrayJSON = localStorage.getItem('users');

        //将JSON转为JS
        var usersArray = JSON.parse(usersArrayJSON);
        //    console.log(acc,pwd,usersArray);
        //判断账号密码是否存在注册数组中
        var loginState = usersArray.some(function (user) {
            return user.account == acc && user.password == pwd;
        });
        if (loginState && codeRe) {
            document.querySelector('.landings').setAttribute('data-dismiss', 'modal')
            alert('登录成功!');
            //存储登录账号
            sessionStorage.setItem('loginAcc', acc);
            // location.href = './Home-page.html';

            //获取登录账号
            var loginAcc = sessionStorage.getItem('loginAcc');
            if (loginAcc == null) {
                //未登录
                document.querySelector('.LandingAndRegistration').innerHTML = `
                <a href="" class="a1 " data-toggle="modal" data-target="#exampleModal1">登录</a>
            <a href="" class="a1" data-toggle="modal" data-target="#exampleModal1">注册</a>
                                                                `
            } else {
                //已登录
                document.querySelector('.LandingAndRegistration').innerHTML = `欢迎${loginAcc}!<a href="javaScript:loginOut()">注销</a>`;
            }
        }
        else if (!loginState) {
            alert('账号或密码有误!');
        }
        else {
            alert('验证码有误')
        }
    }

    //---------注册------------------------------
    //注册页验证账号合法
    document.querySelector('.logacc').onchange = function (event) {

        //获取用户输入内容
        var acc = event.target.value;
        //验证是否符合正则
        accRe = telReg.test(acc);
        if (accRe) {
            //合法
            var msgSpan = event.target.nextElementSibling;
            msgSpan.innerText = '';
        } else {
            //不合法
            // document.querySelector('.landings').removeAttribute('data-dismiss')
            var msgSpan = event.target.nextElementSibling;
            msgSpan.innerText = '请输入11位手机号！';
            msgSpan.style.color = 'red';

        }
    }
    //注册密码合法
    document.querySelector('.logpwd1').onchange = function (event) {

        //获取用户输入内容
        var pwd1 = event.target.value;
        //验证是否符合正则
        pwdRegRe1 = pwdReg.test(pwd1);
        if (pwdRegRe1) {
            //合法
            var msgSpan = event.target.nextElementSibling;
            msgSpan.innerText = '';
        } else {
            //不合法
            var msgSpan = event.target.nextElementSibling;
            msgSpan.innerText = '请输入6~20位数字、字母！';
            msgSpan.style.color = 'red';
        }
    }

    document.querySelector('.logpwd2').onchange = function (event) {

        //获取用户输入内容
        var pwd2 = event.target.value;
        //验证是否符合正则
        pwdRegRe2 = pwdReg.test(pwd2);
        if (pwdRegRe2) {
            //合法
            var msgSpan = event.target.nextElementSibling;
            msgSpan.innerText = '';
        } else {
            //不合法
            var msgSpan = event.target.nextElementSibling;
            msgSpan.innerText = '请输入6~20位数字、字母！';
            msgSpan.style.color = 'red';
        }
        if (document.querySelector('.logpwd1').value != document.querySelector('.logpwd2').value) {
            var msgSpan = event.target.nextElementSibling;
            msgSpan.innerText = '密码输入不一致！';
            msgSpan.style.color = 'red';
        }
    }

    //注册获取目标验证码画布
    var canReg = document.querySelector('.canvasRegis');
    //设置验证码画布宽高
    canReg.width = picWidth;
    canReg.height = picHeight;

    //获取画笔
    var contextReg = canReg.getContext('2d');
    drawPicture(contextReg, realCode2);//传入画笔和绘制的字符
    //画布添加点击事件
    canReg.onclick = function () {
        realCode2 = createCode(codeCount);
        //清空画布
        contextReg.clearRect(0, 0, picWidth, picHeight);
        //绘制验证码
        drawPicture(contextReg, realCode2);//传入画笔和绘制的字符
    }
    //验证码合法
    document.querySelector('.regsta').onchange = function (event) {
        //获取用户输入内容
        var code = event.target.value;
        //存储验证码结果
        codeRe = realCode2.toLowerCase() == code.toLowerCase();
        //判断用户输入的验证码值是否正确
        if (codeRe) {
      
            var msgSpan = event.target.nextElementSibling;
            msgSpan.innerText = '';
        } else {
         
            // document.querySelector('.landings').removeAttribute('data-dismiss')
            var msgSpan = event.target.nextElementSibling;
            msgSpan.innerText = '请输入正确的验证码值！';
            msgSpan.style.color = 'red';
        }
    }
}


//-------------以下是函数-------------------------------
function Registration() {   //账号注册
    var accEle = document.querySelector('.logacc');//获取账号
    var acc = accEle.value;
    var pwdEle = document.querySelector('.logpwd1');//获取密码
    var pwd1 = pwdEle.value;
    var pwd2 = document.querySelector('.logpwd2').value;//获取第二次密码
    //    alert('1'+pwd1);
    //    alert('2'+pwd2);
    var usersJSON = localStorage.getItem('users');   //获取已有的注册数据
    var usersArray = null;  //存储注册数据
    if (usersJSON == null) {  //判断是否存在注册数据
        usersArray = [];
    }
    else {   //存在注册数据
        usersArray = JSON.parse(usersJSON);
    }
    //判断当前账号是否已经被注册 usersJSON.indexOf('"account":"17760990684"')
    // var existAccount=usersArray.some(val=>val.account==acc);
    var existAccount = usersArray.some(function (val) {
        return val.account == acc;
    });
    if (existAccount) {
        alert('账号已存在!请直接登录!');
    } else {
        if (!accRe) {
            alert('账号输入格式不正确');
        }
        else if (!(document.querySelector('.logpwd1').value == document.querySelector('.logpwd2').value) && pwdRegRe1 && pwdRegRe2) {
            alert('两次密码输入不一致或格式不正确')
        }
        else if (!codeRe) {
            alert('验证码不正确')
        }
        else {
            //将注册账号存储到数组中
            usersArray.push({
                account: acc,
                password: pwd1
            });
            //将数组转为JSON
            var usersArrayJSON = JSON.stringify(usersArray);
            //存储数据
            localStorage.setItem('users', usersArrayJSON);
            //提示
            alert('注册成功!');
            // location.href = './Home-page.html';
        }

    }
}




//绘制验证吗和干扰先、线
function drawPicture(context, realCode) {   
    //绘制验证码
    for (var i = 0; i < realCode.length; i++) {
        //随机字体颜色
        //[0,255]
        var redValue = Math.ceil(Math.random() * 255);
        var greenValue = Math.ceil(Math.random() * 255);
        var blueValue = Math.ceil(Math.random() * 255);
        context.fillStyle = `rgb(${redValue},${greenValue},${blueValue})`;
        //设置文字大小 [16,40]
        var codeSize = Math.ceil(Math.random() * (maxFontSize - minFontSize)) + minFontSize;
        context.font = `${codeSize}px 微软雅黑`;
        //随机横坐标

        //picWidth / codeCount-codeSize==((picWidth / codeCount) * (i + 1) - codeSize) - picWidth / codeCount * i
        var codeX = Math.ceil(Math.random() * (picWidth / codeCount - codeSize)) + picWidth / codeCount * i;
        //随机纵坐标[codeSize,picHeight]
        var codeY = Math.ceil(Math.random() * (picHeight - codeSize)) + codeSize;
        //绘制字体
        context.fillText(realCode.charAt(i), codeX, codeY);
    }
    //绘制干扰线
    for (var lc = 1; lc < lineCount + 1; lc++) {
        context.beginPath();
        //设置随机线条颜色
        redValue = Math.ceil(Math.random() * 255);
        greenValue = Math.ceil(Math.random() * 255);
        blueValue = Math.ceil(Math.random() * 255);
        context.strokeStyle = `rgb(${redValue},${greenValue},${blueValue})`;
        //起点[0,picWidth]
        var lineBeginX = Math.ceil(Math.random() * picWidth);
        // [0,picHeight]
        var lineBeginY = Math.ceil(Math.random() * picHeight);
        context.moveTo(lineBeginX, lineBeginY);
        //终点
        var lineEndX = Math.ceil(Math.random() * picWidth);
        // [0,picHeight]
        var lineEndY = Math.ceil(Math.random() * picHeight);
        context.lineTo(lineEndX, lineEndY);
        //绘制线条
        context.stroke();
        context.closePath();
    }
}

function createCode(num) {   //验证码
    var str = 'abcdefghijklmiopqrstuvwxyzABCDFEGHIJKLMNOPQRSTUVWXYZ0123456789';
    var re = '';
    for (var count = 1; count < num + 1; count++) {
        //[0,len)
        var index = Math.floor(Math.random() * str.length);
        // console.log(str.charAt(index));
        re += str.charAt(index);
    }
    // console.log(re);
    return re;
}

var sMovieTwoArr;//所有影院对象-------存在小概率加载问题，
//过慢导致后面需要的sMovieTwoArr值为undefined，
//影院添加
$.ajax({
    url: 'https://www.fastmock.site/mock/bb4157f45a0b5ffdcb3f6d984517a6c0/woniuMovie/getAllOperas',
    type: 'get',
    success: function (data) {
        sMovieTwoArr = data.operas
        // console.log(data.operas);
        var optionStr = data.operas.reduce((total, val, index) => total + `<option value="${index}">${val.name}</option>`, ' <option value="">选择影院</option>');
        document.querySelector('#cinema').innerHTML = optionStr;

    }
})

// var moviesAllArr;//所有电影对象的所有信息//取值行447
//电影目录项添加
$.ajax({
    url: 'https://www.fastmock.site/mock/bb4157f45a0b5ffdcb3f6d984517a6c0/woniuMovie/getAllMovies',
    type: 'get',
    success: function (data) {
        var content1 = '';
        var content2 = '';

        var hotOrSoon = 7;
        // moviesAllArr=data.movies;//跳转页面需要信息537
        var moviesArr = data.movies.map(function (val) {

            return { id: val.id, name: val.title }
        })
        // console.log(moviesArr);

        //首页-影院与电影之间的二级联动----------------
        document.querySelector('#cinema').onchange = function () {
            var cinemaIndex = document.querySelector('#cinema').value;

            //创建选中的电影的对象
            var cinemaObj = sMovieTwoArr[cinemaIndex];
            //获取影院对应的电影数组
            var movIdList = cinemaObj.movies;
            //在所有电影中（id）筛选出电影院含有电影id
            var movieArr = moviesArr.filter(val => movIdList.includes(val.id));
            console.log(movieArr)
            //遍历数组，将数组生成movies-option
            var moviesStr = movieArr.reduce((total, val) => total + `<option>${val.name}</option>`, '<option value="">选择电影</option>');
            //将option填充到select中
            document.querySelector('#moviess').innerHTML = moviesStr;
        }


//将前hotOrSoon指定数量的电影加到正在上映，后面的加到即将上映-------------
        data.movies.forEach(function (val, index) {
            if (index < hotOrSoon) {
                content1 += `
                    <div id="move${val.id}">
                        <a href="./movie-details.html?moveId=${val.id}">
                            <div class="im">
                                    <img src="${val.imgSrc}" alt="">
                                    <div class="dw">立即购票</div>
                            </div>
                            <div class="score">
                                <div class="name">${val.title}</div>
                                <div><span>9.5</span></div>
                            </div>
                        </a> 
                    </div>`
            }

            if (index > hotOrSoon) {
                content2 += `
                    <div>
                        <div class="tz">
                            <div class="im">
                                <img src="${val.imgSrc}" alt="">
                                <div class="dw">
                                    <div>预告片</div>
                                    <div class="ys">预售</div>
                                </div>
                            </div>
                            <div class="score">
                                <div>${val.title}</div>
                                <div><span>9.5</span></div>
                            </div>
                        </div>
                        <div class="time">8月6日上映</div>
                    </div>`
            }
        })
        $('.hotPicture').html(content1);
        $('.soon').html(content2);


        //搜索功能-------------------------
        var movieTitleArr = data.movies.map(function (val) {
            return { id: val.id, title: val.title }
        });
        var content = '';
        // console.log(movieTitleArr)
        for (var index in movieTitleArr) {
            
            content += `<option data-v="${movieTitleArr[index].id}">${movieTitleArr[index].title}</option>`
        }
        // console.log(content)
        $('#searchList').html(content);
        $('.btsearch').on('click',function(){
            //获取搜索框中的值
            var datav=$('.search').val();
            var opArr=document.querySelectorAll('#searchList option');
            console.log(opArr)
            var id
            for(var index=0;index<opArr.length;index++){
                if(opArr[index].innerHTML==datav){       
                    id=opArr[index].getAttribute('data-v');  
                }
            }
                    // console.log(id);
            location.assign(`./movie-details.html?moveId=${id}`)
        })

    }
})