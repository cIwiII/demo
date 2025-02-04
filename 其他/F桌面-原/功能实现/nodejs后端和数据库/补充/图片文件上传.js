var express = require('express');
var router = express.Router();

//引入文件接收模块multer插件工具包。handleFile.js（自备js文件使用）,返回对象解构赋值
let { uploadFiles } = require('../db/handleFile');

router.post('/',function (req, res, next) {
    console.log('post执行');
    //上传文件的配置要求
    let uploadMethod = uploadFiles({
        path: './public/images',//上传文件保存路径
        key: 'imgname',//前端指定的存文件对应的属性名字
        size: 1024 //文件最大容量限制，单位KB
    });
    console.log(req.body)
    uploadMethod(req, res, function (error) {
        //有结果时执行的回调函数
        if (error) {//没有参数接收失败转为boolean为false
            res.send({
                code: 250,
                message: '上传失败'
            })
        } else {
            res.send({
                code: 200,
                message: '上传成功',
                data: `http://127.0.0.1:3000/images/${req.files[0].filename}`
            })
        }
    })
})

//引入mongoose模块
let mongoose = require('mongoose');
router.get('/',async function(req,res,next){
    console.log('token鉴权请求成功');
// let re=await mongoose.model('teacherModel').find({}).populate('classId')
    res.send({
        code:250,
        message:"token状态响应成功",
        // data:re
    })

})


module.exports = router;