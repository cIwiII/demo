


if (sessionStorage.getItem('token')) {
    console.log('登陆状态')
} else {
    location.href = '../html/login.html';
}

$(function () {

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
            console.log('排行榜');
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
    //以上为header头部区
})
