
console.log('试卷信息页的主js文件')
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../sass/tests-basic-info.scss';



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
let testType = getPromise(`/types/${testTypeId}`, 'get')
let test = getPromise(`/tests/${testId}`, 'get')

$(function () {

    async function ajaxa() {
        let aj1 = await testType;
        let aj2 = await test;
        if (aj1.code == 200 && aj2.code == 200) {
            $('.testTitle').html(aj2.data[0].title)
            $('#ajaxte1').append(`<p>考试类型：<span>${aj1.data[0].type}</span></p>
            <p>考试时间：<span>${aj2.data[0].date}</span></p>
            <p>答卷时间：<span>${aj2.data[0].durations}</span></p>
            <p>考试方式：<span>线上</span></p>`)
        }

        //在页面信息页，读取时间和生成选项卡列表，
        let anArr = [];
        for (let a = 0; a < aj2.data[0].exerciseId.length; a++) {
            anArr.push([])
        };
        let anArrJSON = JSON.stringify(anArr);
        sessionStorage.setItem("anArr", anArrJSON)
        //获取时间并存储
        let times = aj2.data[0].durations * 60
        sessionStorage.setItem("time", times)
    }
    ajaxa()

    $('#sess1').append(` <p>姓名：<span>${sessionStorage.getItem('name')}</span></p>
    <p>证件号码：<span>${sessionStorage.getItem('stuId')}</span></p>
    <p>部门：<span>信息中心</span></p>`)


    $('#befer').on('click', function () {
        location.href = `./tests.html?testTypeId=${testTypeId}`
    })
    $('#start').on('click', function () {
        location.href = `./exercises.html?testTypeId=${testTypeId}&testId=${testId}`
    })

})
