let experss = require('express');
router = experss.Router();

// 引入mongoose模块
let mgs = require('mongoose');

// 所有试卷，未考试展示需要用到
router.get('/', async function (req, res) {
    console.log('tests-get请求成功');
    let tests = await mgs.model('testsModel').find({});
    res.send({
        code: 200,
        message: '查询成功',
        data: tests
    })
})
//考试根据id获取一份试卷进入考试,不发送题目信息
router.get('/:testId', async function (req, res) {
    console.log('考试答题请求请求成功');
    let tests = await mgs.model('testsModel').find({_id:req.params.testId});
    res.send({
        code: 200,
        message: '查询成功',
        data: tests
    })
})
//正式考试获取对应试卷题目信息
router.post('/:testId', async function (req, res) {
    console.log('考试答题请求请求成功');
    let tests = await mgs.model('testsModel').find({_id:req.params.testId}).populate('exerciseId');
    res.send({
        code: 200,
        message: '查询成功',
        data: tests
    })
})

module.exports = router;