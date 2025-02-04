var express = require('express');
var router = express.Router();

//引入mongoose模块
let mongoose = require('mongoose');
//鉴权引入
let jsonwebtoken = require('jsonwebtoken');

/* GET home page. */
//状态解密请求
router.get('/', function (req, res, next) {
  console.log('状态请求成功');
  let token = req.get('Authorization').split(' ')[1];
  let user = jsonwebtoken.verify(token, 'login').users;//后一个指加密时的sign对象key值
  res.send({
    code: 200,
    message: '获取成功',
    data: user
  })
})
//登陆请求
router.get('/:account/:password', async function (req, res, next) {
  console.log('登陆请求成功')
  let re = await mongoose.model('userModel').find({
    $and: [{
      account: req.params.account
    }
    ]
  });
  console.log(re);
  if (re.length == 0) {
    res.send({
      code: 250,
      message: '登录失败，账号不存在'

    })
  }
  else if (re[0].password == req.params.password) {
    let token = jsonwebtoken.sign({ users: re[0] }, 'login',
      { expiresIn: 3600 })
    res.send({
      code: 200,
      message: '登录成功',
      data: token
    });
  } else {
    res.send({
      code: 250,
      message: '登录失败,密码错误'

    })
  }
});
//添加
router.post('/:account/:password', async function (req, res, next) {
  console.log('post请求成功')
  let re2 = await mongoose.model('userModel').find({
    account: req.params.account
  });
  if (re2.length == 0) {
    let re = await mongoose.model('userModel').create(
      { account: req.params.account, password: req.params.password }
    );
    console.log(re);
    res.send({
      code: 200,
      message: '注册成功',
    });
  }else{
    res.send({
      code: 250,
      message: '账号已存在，请直接登陆'
    });
  }
});
router.delete('/', async function (req, res, next) {
  console.log('delete请求成功')
  let token = req.get('Authorization').split(' ')[1];
  let user = jsonwebtoken.verify(token, 'login').users;
  let re = await mongoose.model('userModel').deleteMany(
    { account:user.account });
  console.log('删除对象：'+re);
  if(re.deletedCount>0){
    res.send({
      code: 200,
      message: '注销成功',
    });
  }else{
    res.send({
      code: 250,
      message: '注销失败',
    });
  }

});
router.put('/:oldpwd/:newpwd', async function (req, res, next) {
  console.log('put请求成功')
  let { oldpwd, newpwd } = req.params
  let token = req.get('Authorization').split(' ')[1];
  let user = jsonwebtoken.verify(token, 'login').users;
  if (user.password != oldpwd) {
    res.send({
      code: 250,
      message: '原密码错误',
    });
  } else {
    let re = await mongoose.model('userModel').updateMany(
      { account: user.account },
      { password: newpwd });
    res.send({
      code: 200,
      message: '修改成功,请重新登陆'
    });
  }
});

module.exports = router;