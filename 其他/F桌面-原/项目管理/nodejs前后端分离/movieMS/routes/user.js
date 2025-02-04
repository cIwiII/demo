var express = require('express');
var router = express.Router();

//引入mongoose模块
let mgs=require('mongoose');
//鉴权引入
let jsonwebtoken = require('jsonwebtoken');

//状态解密请求
router.get('/', function (req, res, next) {
  console.log('状态请求成功');
  let token = req.get('Authorization').split(' ')[1];
  
  let user = jsonwebtoken.verify(token, 'movielog').mov;//后一个指加密时的sign对象key值
  // console.log(user,123)
  res.send({
    code: 200,
    message: '获取成功',
    data: user
  })
})
/* GET users listing. */
//注册
router.post('/:acc/:pwd', async function(req, res, next) {
  console.log('post注册请求成功')
  let {acc,pwd}=req.params
  let accdata=await mgs.model('usermodel').find({
    account:acc
  });
  if(accdata.length==0){
    let addacc=await mgs.model('usermodel').create(
      {account:acc,password:pwd}
    )
    console.log('添加账号'+addacc)
    res.send({
      code:200,
      message:'注册成功'
    })
  }else{
    res.send({
      code:250,
      message:'账号已存在，请直接登陆'
    })
  }
});
//登陆
router.get('/:acc/:pwd', async function(req, res, next) {
  console.log('get登陆请求成功')
  let {acc,pwd}=req.params
  let accdata=await mgs.model('usermodel').find({
    account:acc
  });
  console.log('登陆账号');
  console.log(accdata);
  if(accdata.length==0){
    res.send({
      code:250,
      message:'账号不存在，请注册'
    })
  }else{
    if(accdata[0].password==pwd){
      let movietoken = jsonwebtoken.sign({ mov: accdata[0] }, 'movielog',
      { expiresIn: 3600 })
      res.send({
        code:200,
        message:'登陆成功',
        data:movietoken
      })
    }else{
      res.send({
        code:251,
        message:'密码错误'
      })
      
    }
    
  }
});

module.exports = router;
