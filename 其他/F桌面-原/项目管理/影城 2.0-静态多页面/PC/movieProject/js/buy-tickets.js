

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




//影院添加
$.ajax({
    url: 'https://www.fastmock.site/mock/bb4157f45a0b5ffdcb3f6d984517a6c0/woniuMovie/getAllOperas',
    type: 'get',
    success: function (data) {
        var cinemaArr = data.operas
        var cinemaId = getParam('cinema');

        var cinemaObj = cinemaArr.filter(val => cinemaId == val.id)[0];
        // console.log(cinemaObj)
        $('.movie2_banner .movies').html(
            `
            <img src="${cinemaObj.img_src}">
           <div class="mbody">
               <div class="mtitle">
                   <p>${cinemaObj.name}</p>
                   <span>地址：${cinemaObj.address}</span>
                   <br>
                   <span>电话：${cinemaObj.phone}</span>
               </div>
               <div class="movie-servese">
                   <div>影院服务</div>
                   <div class="hr"></div>
               </div>
               <table>
                   <tr>
                       <td>改签</td>
                       <td>未取票用户放映前3小时可改签</td>
                   </tr>
                   <tr>
                       <td>3D眼镜</td>
                       <td>免押金</td>
                   </tr>
                   <tr>
                       <td>儿童优惠</td>
                       <td>一名成人仅可携带一名不足1.3米儿童无座免费观影（巨幕厅、情侣厅除外），...</td>
                   </tr>
                   <tr>
                       <td>WIFI</td>
                       <td>影院有免费WIFI</td>
                   </tr>
                   <tr>
                       <td>可停车</td>
                       <td>商场内可停车。（检票口可领取两小时免费停车券）</td>
                   </tr>
               </table>
           </div>
            `
        );
        $('.movsst').html(cinemaObj.name);


        var myMap = new BMapGL.Map('map');   //创建地图实例对象

        //创建地址解析对象
        var geo = new BMapGL.Geocoder();
        //根据文本地址获取Point对象
        geo.getPoint(cinemaObj.address, function (point) {
            //创建标注对象
            var marker = new BMapGL.Marker(point);
            //将标注点添加到地图上
            myMap.addOverlay(marker);
            //设置地图中心点
            myMap.centerAndZoom(point, 15);
            //消息框
            var win = new BMapGL.InfoWindow(cinemaObj.address, { width: 20, height: 40, title: '影院地址：' });
            myMap.openInfoWindow(win, point);
        }, '成都市');


        // var centerPoint = new BMapGL.Point(104.069944, 30.579012);
        // myMap.centerAndZoom(centerPoint, 15);   //设置地图中心点和地图级别
        myMap.enableScrollWheelZoom();  //鼠标滚轮调整级别

        var zoomCtrl = new BMapGL.ZoomControl({
            anchor: BMAP_ANCHOR_BOTTOM_LEFT,
            offset: new BMapGL.Size(20, 20)
        });  // 添加缩放控件
        myMap.addControl(zoomCtrl);

        //每页搜索功能
        $.ajax({
            url: 'https://www.fastmock.site/mock/bb4157f45a0b5ffdcb3f6d984517a6c0/woniuMovie/getAllMovies',
            type: 'get',
            success: function (data) {
                var movieTitleArr = data.movies.map(function (val) {
                    return { id: val.id, title: val.title }
                });
                var content = '';
                console.log(movieTitleArr)
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

                var msArr=cinemaObj.movies; 
                // var msArr=[];
                // for(var s=0;s<mArr.length;s++){
                //     mArr[s].id
                // }
                var mArr = data.movies.filter(val => msArr.includes(val.id));
                var moimgstr='';
                for(var val of mArr){
                    moimgstr+=`<img src=${val.imgSrc} alt="">`
                }
                $('.totations').html(moimgstr)





            }
        })
    }
})

//注销函数
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


    //影院id接收
    var cinemaId = getParam('cinema');
    //获取所有购票时间对象
    var $strongArr = $('.jqdate tbody tr td:nth-child(1) strong');
    //购票对象添加事件，点击，跳转传入影院id
    var $spArr = $(".yesOrNo");
    $spArr.on('click', function (event) {
        var time = $(event.target).parent().parent().find('td:first-child strong').html()
        location.assign(`./chooise.html?cinema=${cinemaId}&time=${time}`);
    })
    for (var index = 0; index < $strongArr.length; index++) {
        //获取时间并切割为时分
        var str = $strongArr[index].innerHTML
        var timeArr = str.split(':')
        //获取需要改变属性的对象
        var yesno = $spArr[index]
        //时间判定
        var date = new Date();
        var time = date.getTime();//当前时间
        var dateWill = new Date();
        var houNew = dateWill.setHours(timeArr[0]);
        var minuNew = dateWill.setMinutes(timeArr[1]);
        var re = dateWill.setSeconds(0);
        //提前半小时购票
        if (re - time < 30 * 60 * 1000) {
            $(yesno).css('background-color', '#9a9a9a');
            $(yesno).off('click');
            $(yesno).text('停止售票');
        }
        // console.log(re - time);
    };
}





