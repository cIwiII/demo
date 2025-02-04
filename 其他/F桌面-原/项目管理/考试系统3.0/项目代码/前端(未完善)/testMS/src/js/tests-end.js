// index主js文件
console.log('exercises的主js文件')
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../sass/tests-end.scss';


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
let testId = getParam('testId')
let scoss = getParam('scoss')
let ass = getParam('ass')
let duras = getParam('duras')
let testTypeId=getParam('testTypeId')

$(function(){
     //考试成绩，用时s  if (h < 10) { h = '0' + h }; 
     let time=parseInt(duras)
     let h = parseInt(time/ 3600),
         m = parseInt(parseInt(time % 3600)/60),
         s = parseInt(time% 60);
         if(h<10){h='0'+h};
         if(time/3600==0){m='00'}else if (m < 10) { m = '0' + m }; 
         if(time/60==0){s='00'}else if (s < 10) { s='0' + s };
     $('.sure .times').html(`<a>
                                 <span class="h">${h}</span>:
                                 <span class="m">${m}</span>:
                                 <span class="s">${s}</span>
                             </a><br/>
                             <label>答题用时</label>`);
    //信息填充
    $('.score span').text(scoss);
    $('.oks a').text(ass);

    //查看解析
    $('#btn').on('click',function(){
        location.href=`./answers.html?testId=${testId}&testTypeId=${testTypeId}`
    })
})
