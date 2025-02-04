var express = require('express');
var router = express.Router();

//引入mongoose模块
let mgs = require('mongoose');
//鉴权引入
let jsonwebtoken = require('jsonwebtoken');

//题库展示请求(暂时没有需求)
router.get('/', async function (req, res, next) {
    console.log('get获取所有题库请求成功');
    //   let token = req.get('Authorization').split(' ')[1];
    //   let user = jsonwebtoken.verify(token, 'testkey').user;//后一个指加密时的sign对象key值
    let exercisesdata = await mgs.model('exercisesModel').find({});
    res.send({
        code: 200,
        message: '获取成功',
        data: exercisesdata
    })
})


module.exports = router;

