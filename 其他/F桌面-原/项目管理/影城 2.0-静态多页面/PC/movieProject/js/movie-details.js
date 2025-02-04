

//----参数处理--------------
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
$(function () {
    var loginAcc = sessionStorage.getItem('loginAcc');
    if (loginAcc == null) {
        //未登录
        document.querySelector('.LandingAndRegistration').innerHTML = `
              <a href="" class="a1 " data-toggle="modal" data-target="#exampleModal1">登录</a>
          <a href="" class="a1" data-toggle="modal" data-target="#exampleModal1">注册</a>`
    } else {
        //已登录
        document.querySelector('.LandingAndRegistration').innerHTML = `欢迎${loginAcc}!<a href="javaScript:loginOut()">注销</a>`;
    }
})
function loginOut() {
    sessionStorage.removeItem('loginAcc');
    location.reload();
}

$.ajax({
    url: 'https://www.fastmock.site/mock/bb4157f45a0b5ffdcb3f6d984517a6c0/woniuMovie/getAllMovies',
    type: 'get',
    success: function (data) {

        
        //搜索框预选项
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

        //详情页banner电影信息
        var moviesAllArr = data.movies
        var moveId = getParam('moveId')//电影id
        // console.log(moveId)
        //在所有电影中（id）筛选出电影院含有电影id
        //--move==val.id只有一个数组对象。0取出为对象
        var movieObj = moviesAllArr.filter(val => moveId == val.id)[0];

        //取出最新播出时间
        // var arr1 = movieObj.release.split(' ');
        // var laststr = arr1[arr1.length - 2]
        //    console.log(laststr)

        //取出展示电影的剧情类型
        var movetypeArr = movieObj.movieType
        //获取所有影片类型
        $.ajax({
            url: 'https://www.fastmock.site/mock/bb4157f45a0b5ffdcb3f6d984517a6c0/woniuMovie/getAllTypes',
            type: 'get',
            success: function (data) {
                var typeArr = data.types;//类型数组
                //筛选含有展示电影的类型id
                var aMovieArr = typeArr.filter(val => movetypeArr.includes(val.id));
                //reduce链接为字符串 moviesStr 输出
                var moviesStr = aMovieArr.reduce((total, val) => total + val.name, '');
                // console.log(moviesStr);
                $('.titleJquery').html(`
                <div class="card-title" >
                     <p>${movieObj.title}</p>
                     <span>Upcoming Summer</span>
                 </div >
                 <p><small class="card-text">${moviesStr}</small></p>
                 <p><small class="card-text">${movieObj.region}/${movieObj.duration}</small></p>
                 <p><small class="card-text">${movieObj.release}</small></p>
                 <div class="vide-detail">
                 <div>
                     <div class="grade">
                         <div>想看</div>
                         <div>评分</div>
                     </div>
    
                     <div><a href="">特惠购票</a></div>
    
                 </div>
                 <div>
                     <small>蜗牛口碑</small>
                     <div class="stars">
                         <div class="big">${movieObj.score}</div>
                         <div class="">
                             <p><small>
                                 <i class="fa fa-star"></i>
                                 <i class="fa fa-star"></i>
                                 <i class="fa fa-star"></i>
                                 <i class="fa fa-star"></i>
                                 <i class="fa fa-star"></i>
                             </small>
                                 
                             </p>
                             <p><small>13.3万人评分</small></p>
                         </div>
                     </div>
                     <small>票房统计</small>
                     <p><span class="big">2.38 </span> <span>亿</span></p>
                 </div>
             </div>
                 `);
                var iEle = document.querySelectorAll('.vide-detail .stars i');
                // console.log(iEle)
                //5星=8.5分-9.5分,4星=7.5分-8.4分,3星=6.5分-7.4分,
                //2星=5.5分-6.4分,1星=5.5分以下
                var num = Number(movieObj.score);
                if (num < 6.5) {
                    num = 0
                }
                else {
                    num = Math.ceil(num - 6.4);
                };
                for (var index = 0; index <= num; index++) {
                    $(iEle[index]).addClass('fa-orange');
                }
            }//data回调函数
        })//内层ajax

        // console.log(movieObj)
        $('.details1_1').attr('src', movieObj.imgSrc)

        $('#desc').html(movieObj.desc);//剧情
        $('.titls').html(movieObj.title);//路径
        $('.director').html(movieObj.director);//导演

        //获取所有填写评论的元素
        var eleArr = document.querySelectorAll('.comments')
        
        // console.log(eleArr)
        //将评论数据遍历写入
        for (var index = 0; index < eleArr.length; index++) {
            // console.log(index);
            // console.log(eleArr[index],movieObj.comments[index]);
            $(eleArr[index]).text(movieObj.comments[index])
        }
    }
})



