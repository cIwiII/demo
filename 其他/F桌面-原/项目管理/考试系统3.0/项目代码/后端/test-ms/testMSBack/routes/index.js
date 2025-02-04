var express = require('express');
var router = express.Router();
//引入jwt插件
let jsonwebtoken = require('jsonwebtoken');

// 引入mongoose模块
let mongoose = require('mongoose');
let { uploadFiles } = require('./../util/handleFile');

// 查询考试类型
router.get('/', async function (req, res) {
  // 从types集合查询数据响应到前端
  let data = await mongoose.model('typesModel').find({});
  // console.log(data)
  res.send({
    code: 200,
    message: '查询成功!',
    data: data
  })
});

// 接收token，解谜，响应用户的手机号
router.post('/', function (req, res) {
  let token = req.get('Authorization').split(' ')[1];
  // console.log(token)
  let user = jsonwebtoken.verify(token, 'testkey').user;
  // console.log(user)
  // 将获取到的对象响应到浏览器
  res.send({
    code: 200,
    message: '查询成功',
    data: user
  });
})


// 用户修改资料，将修改过后的资料响应给浏览器
router.put('/:phone/:name/:gender/:fileName', async function (req, res) {
  let { phone, name, gender, fileName } = req.params;
  // console.log(phone, name, gender, avatar)
  let re = await mongoose.model('studentsModel').updateMany({
    phone
  }, {
    name,
    gender,
    avatar: fileName
  });

  let uploadMethod = uploadFiles({
    path: './public/images',//上传文件保存路径
    key: 'pic',//上传文件在表单数据中的名称，要与前端取的名称对应
    size: 2048//上传文件的大小限制，单位为KB
  });

  // 将修改过后的数据再重新查询出来响应给浏览器
  let re1 = await mongoose.model('studentsModel').find({
    phone
  })
  console.log(re1)

  uploadMethod(req, res, function (err) {
    if (err || re.length < 1) {
      res.send({
        code: 250,
        message: '修改失败',
      });
    } else {
      res.send({
        code: 200,
        message: '修改成功',
        data: re1
      })
    }
  })

})








module.exports = router;
