var express = require('express');
var router = express.Router();

//引入mongoose模块
let mgs = require('mongoose');
//鉴权引入
let jsonwebtoken = require('jsonwebtoken');

//对应学生Id的错题展示请求（id解密获取）
router.get('/', async function (req, res, next) {
    console.log('get获取对应学生所有错题请求成功');
    let token = req.get('Authorization').split(' ')[1];
    let user = jsonwebtoken.verify(token, 'testkey').user;//后一个指加密时的sign对象key值
    let errorsdata = await mgs.model('errorsModel').find({ studentId: user._id }).populate('exerciseId');
    res.send({
        code: 200,
        message: '获取成功',
        data: errorsdata
    })
})

//添加错题接收JSON三维数组对象，一个元素包含id和答案数组
router.post('/:arrJSON',function (req, res, next) {
    console.log('post错题添加请求成功')
    let token = req.get('Authorization').split(' ')[1];
    let user = jsonwebtoken.verify(token, 'testkey').user;
    //JSON转化
    let arr = JSON.parse(req.params.arrJSON)
    arr.forEach(async function(val) {
        let as=await mgs.model('errorsModel').find({
            studentId:user._id,exerciseId: val[0]
        })
        if(as.length==0){
            let addErrorObj = await mgs.model('errorsModel').create(
                {
                    studentId:user._id,
                    exerciseId: val[0],
                    errorAnswer:val[1]
                }
            )
        }
       
    });
    res.send({
        code: 200,
        message: '添加成功'
    })

});
//delete删除
router.delete('/:exId', async function (req, res, next) {
    console.log('delete删除错题请求成功')
    let token = req.get('Authorization').split(' ')[1];
    let user = jsonwebtoken.verify(token, 'testkey').user;
    //调试使用学生数据,后面通过解密获取
    let re = await mgs.model('errorsModel').deleteMany(
        {
            exerciseId: req.params.exId,
            studentId: user._id
        });
    if (re.deletedCount > 0) {
        res.send({
            code: 200, message: '删除成功'
        });
    } else {
        res.send({
            code: 200, message: '删除失败'
        });
    }
});


module.exports = router;

