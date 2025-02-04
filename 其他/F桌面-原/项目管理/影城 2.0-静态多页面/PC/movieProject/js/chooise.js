
//获取用户输入的搜索内容
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
//头部搜索，获取电影数据
$.ajax({
    url: 'https://www.fastmock.site/mock/bb4157f45a0b5ffdcb3f6d984517a6c0/woniuMovie/getAllMovies',
    type: 'get',
    success: function (data) {
        var movieArr = data.movies
        var movieTitleArr = movieArr.map(function (val) {
            return { id: val.id, title: val.title }
        });
        var content = '';
        // console.log(movieTitleArr)
        for (var index in movieTitleArr) {
            content += `<option data-v="${movieTitleArr[index].id}">${movieTitleArr[index].title}</option>`
        }
        // console.log(content)
        $('#searchList').html(content);
        $('.btsearch').on('click', function () {
            //获取搜索框中的值
            var datav = $('.search').val();
            var opArr = document.querySelectorAll('#searchList option');
            // console.log(opArr)
            var id
            for (var index = 0; index < opArr.length; index++) {
                if (opArr[index].innerHTML == datav) {
                    id = opArr[index].getAttribute('data-v');
                }
            }
            // console.log(id);
            location.assign(`./movie-details.html?moveId=${id}`)
        })
        //--获取电影信息-------
        $.ajax({
            url: 'https://www.fastmock.site/mock/bb4157f45a0b5ffdcb3f6d984517a6c0/woniuMovie/getAllOperas',
            type: 'get',
            success: function (data) {
                var cinemaArr = data.operas
                var cinemaId = getParam('cinema');
                var cinemaObj = cinemaArr.filter(val => cinemaId == val.id)[0];
                // console.log(cinemaObj);//影院对象
                var aMovObj = movieArr[parseInt(Math.random() * movieArr.length)]

                $('.summer').attr('src', aMovObj.imgSrc);
                $('.time').html(`
                <div class="time-1">
                    <h5>${aMovObj.title}</h5>
                </div>
                <div class="time-2">
                    语言：${aMovObj.language}
                </div>
                <div class="time-2">
                    时长：${aMovObj.duration}
                </div>
                <div class="time-2">
                    地区：${aMovObj.region}
                </div>`);
                $('.detailed-2').html(`
                <div class="box-2">影院：${cinemaObj.name}</div>
                <div class="box-2">影厅：${parseInt(Math.random() * 10 + 5)}楼-${parseInt(Math.random() * 20 + 5)}厅</div>
                <div class="box-2">版本：${parseInt(Math.random() * 3 + 1)}.${parseInt(Math.random() * 20 + 5)}.0</div>
                <div class="box-2">场次：${parseInt(Math.random() * 20 + 5)}</div>
                <div class="box-2">票价：${aMovObj.price}元/人</div>`);

              

                //-----选座和总价----
                var content = '';
                var n = 0;//座位数
                var s;//总价
                $('.def').on('click', function (event) {
            
                    if ($(event.target).hasClass('b-white') && n < 5) {
                        $(event.target).addClass('b-green');//添加b-green类
                        $(event.target).removeClass('b-white');//删除b-white类
                        content += `
                   <b> ${$(event.target).attr('row')}行，${$(event.target).attr('col')}列</b><br>
                   `
                        // console.log(content);
                        ++n;
                    }
                    else if ($(event.target).hasClass('b-green')) {
                        $(event.target).addClass('b-white');
                        $(event.target).removeClass('b-green');
                        var dele = `<b> ${$(event.target).attr('row')}行，${$(event.target).attr('col')}列</b><br>`;
                        content = content.replace(dele, '')
                        --n;
                    }
                    else if ($(event.target).hasClass('b-red')) {
                        alert('改位置已被选取，请选择其他位置')
                    }
                    else if (n == 5) {
                        alert('最多选取5个座位')
                    }
                    s=aMovObj.price*n;
                    $('.money').html(`总价：￥${s}`)
                    $('.Seating').html(content)
                });
                $('#yes').on('click',function(){
                    location.assign(`./pay.html?moveId=${aMovObj.id}&price=${s}&cinema=${cinemaObj.name}&time=${getParam('time')}`)
                })

            }
        })
    }
})



//---注销贺登陆----
$(function () {
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

    function loginOut() {
        sessionStorage.removeItem('loginAcc');
        location.reload();
    }
   
})

