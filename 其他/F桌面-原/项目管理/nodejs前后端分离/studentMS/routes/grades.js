var express = require('express');
var router = express.Router();

//引入mongoose模块
let mongoose = require('mongoose');

router.get('/',async function(req,res,next){
    console.log('get请求成功');
let re=await mongoose.model('gradesModel').find({
    // score:{
    //     $gt:70
    // }
}).populate({
    path:'nameId',
    populate:({
        path:'classId'
    })
})
    res.send({
        code:200,
        message:"获取成功",
        data:re
    })
})


module.exports = router;