// index主js文件
console.log('exercises的主js文件')
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../sass/collections.scss';


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
let ajaxobj=getPromise('/collections','get')
//所有已考试卷
let ajaxobj2=getPromise('/testeds','get')
$(function () {
    //解析渲染
    async function aTestedRander() {
        let collectobj = await ajaxobj,tesdesobj=await ajaxobj2;
        let collectArr=collectobj.data.map(val=>val.exerciseId)//题目对象数组[{1题目信息},{}]
        
        let collIdArr=collectArr.map(val=>val._id)
        let tesdesArr=tesdesobj.data //所有已考试卷
        let allexIdArr=[]; //所有以考试卷题的id数组
        let stuAnArr=[];
        let s=0 //记录次数，同时作索引删除数组元素
        tesdesArr.forEach((aEdVal,index)=>{  //aEdVal,一份已考试试卷
            aEdVal.testId.exerciseId.forEach((exval,i)=>{
                allexIdArr.push(exval._id)
            })
        })
        tesdesArr.forEach((aEdVal,index)=>{  //aEdVal,一份已考试试卷
            aEdVal.testId.exerciseId.forEach((exval,i)=>{
                //是否重复考过
                if(allexIdArr.indexOf(exval._id)==allexIdArr.lastIndexOf(exval._id)){
                    if(collIdArr.includes(exval._id)){ //题被收藏
                        stuAnArr.push(aEdVal.answers[i])   //被收藏单道题的对应答案添加
                       
                    }
                    ++s
                }else{  //重复考，删除以前考试，取最新
                    allexIdArr.splice(s,1)
                }
            })
        })
        stuAnArr.push([])
        console.log(stuAnArr)
        let opAZ = ['A', 'B', 'C', 'D', 'E', 'F']
        let content1 = '', content2 = '', content3 = '', content4 = '';
        collectArr.forEach(function (val, index) {
            

            let ind =index+1 //题号相关
            
            //学生答案
            let aa='未作答',aa1='';

            for(let p=0;p<stuAnArr[index].length;p++){
                aa1+=opAZ[stuAnArr[index][p]]
            }if(aa1.length!=0){aa=aa1}

            //正确答案
            let ab=''
            for(let i=0;i<val.answer.length;i++){
                ab+=opAZ[val.answer[i]]
            }
            let simg;
            if(aa==ab){simg=`<div class="imgs"><div class="ok"></div>答对了！！！</div>`}
            else{simg=`<div class="imgs"><div></div>答错了！！！</div>`}
            //公共部分
            let tq=`<div class="delcoll${ind}">
            <h4><span><label for="">${ind}</label>.${val.topics}</span>
            <div data-v="${val._id}" class="bgimg"></div></h4>`,
            th=`<div>
                    ${simg}
                    <p>考生答案：<span>${aa}</span></p>
                    <p>正确答案：<span>${ab}</span></p>
                    <p>答案解析：<span>${val.analysis}</span></p>

                </div>
            </div>`

            let optionStr = ''
            //单选
            if (val.type == '0') {
                for (let s = 0; s < val.options.length; s++) {  //选项
                    optionStr += ` <li><input type="radio" name="" id="" disabled>${opAZ[s]}.${val.options[s]}</li>`
                }
                content1 +=`${tq}<ul>${optionStr}</ul>${th}`
                console.log(aa==ab,aa,ab);
                if (aa==ab) {  //正确答题卡 
                    content3 +=  
            `<div id="tits${ind}" class="bule">${ind}</div>`
                } else {  // 错误
                    content3 += 
            `<div id="tits${ind}" class="red">${ind}</div>`
                }
            } //多选
            else {
                for (let s = 0; s < val.options.length; s++) {
                    optionStr += ` <li><input type="checkbox" name="" id="" disabled>${opAZ[s]}.${val.options[s]}</li>`
                }
                content2 +=`${tq}<ul>${optionStr}</ul>${th}`
                if (aa==ab) {   //正确答题卡
                    content4 += 
            `<div id="tits${ind}" class="bule">${ind}</div>`
                } else {   //错误
                    content4 += 
            `<div id="tits${ind}" class="red">${ind}</div>`
                }
            }

        })
        $('.radi1').html(content1);  //单选
        $('.chec1').html(content2);  //多选
        $('#red1').html(content3);  //单选答题卡
        $('#che1').html(content4);  //多选答题卡
    }
    aTestedRander()

    //删除收藏
    $('.collcontent').on('click', async function (event) {
        let  target=event.target;
        if ($(target).hasClass('bgimg')) {
            let exerId=$(target).attr('data-v');
            let deletes = await getPromise(`/collections/${exerId}`, 'delete');
            alert(deletes.message)
            let tit = $(target).prev().find('label').text();
            $(target).toggleClass('shous');
            $('#tits' + tit).remove();
            $(`.delcoll`+tit).remove();
            location.href='./collections.html'
        }
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