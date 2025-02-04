var express = require('express');
var router = express.Router();

//引入mongoose模块
let mgs = require('mongoose');
//鉴权引入
let jsonwebtoken = require('jsonwebtoken');

//单个学生所有已考试卷展示请求get1,,排行榜 ,收藏对应答案获取
router.get('/', async function (req, res, next) {
    console.log('get获取学生所有已考试卷求成功');
      let token = req.get('Authorization').split(' ')[1];
      let user = jsonwebtoken.verify(token, 'testkey').user;//后一个指加密时的sign对象key值
    let stuTestedsData = await mgs.model('testedsModel').find(
        { studentId: user._id }
    ).populate({
            path: 'testId',
            populate:{
                    path:'exerciseId'
            }
            //同级将populate对象改（）后加.
        }
    ).populate('typeId');
    res.send({
        code: 200,
        message: '获取成功',
        data: stuTestedsData
    })
});
//get2
// 单个学生指定已考试卷信息（成绩等...）请求,试卷id 
router.post('/:testId', async function (req, res) {
    console.log('查看已考试卷解析');
    let token = req.get('Authorization').split(' ')[1];
      let user = jsonwebtoken.verify(token, 'testkey').user;
    let tested = await mgs.model('testedsModel').find({
        $and: [
            { student: user._id},
            { testId: req.params.testId }
        ]
    }).populate({
        path: 'testId',
        populate:{
                path:'exerciseId'
        }
    }).populate('typeId');

    res.send({
        code: 200,
        message: '查询成功',
        data: tested
    })

})

router.post('/', async function (req, res, next) {
    console.log('考试完成添加到已考题库');
    console.log(req.body)
    let ss=req.body
    
      let token = req.get('Authorization').split(' ')[1];
      let user = jsonwebtoken.verify(token, 'testkey').user;
      let addTesteds = await mgs.model('testedsModel').create({
        studentId: user._id,
        testId: ss.teId,
        typeId: ss.type,
        answers: ss.stuAnArr,
        score: ss.scoss,
        accuracy: ss.ass,
        durations: ss.duras
    });
        res.send({
            code: 200,
            message: '试卷已添加为已考',
        })
})

module.exports = router;

