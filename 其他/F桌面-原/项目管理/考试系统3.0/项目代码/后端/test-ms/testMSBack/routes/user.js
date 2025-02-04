var express = require('express');
var router = express.Router();
let mongoose=require('mongoose');
//引入jwt插件
let jsonwebtoken=require('jsonwebtoken');
//图片工具
let { uploadFiles } = require('../util/handleFile');

//登录
router.get('/:acc/:pwd', async function(req, res) {
  let {acc,pwd} =req.params;
  let re = await mongoose.model('studentsModel').find({
    phone:acc
  });
  if(re.length<1){
    res.send({
      code:260,
      message:'登录失败！账号不存在，请注册！'
    })
  }else if(re[0].password == pwd){
    let token=jsonwebtoken.sign({
      user:re[0]
    },'testkey',{
      expiresIn:'1h'
    });
    res.send({
      code:200,
      message:'登录成功！',
      data:token
    });
  }else{
    res.send({
      code:250,
      message:'登录失败！账号或密码有误！'
    })
  }
});

//注册
router.post('/:acc/:pwd',async function(req,res){
  let {acc,pwd} = req.params;
  let re = await mongoose.model('studentsModel').find({
    phone:acc
  });
  if(re.length>0){
    res.send({
      code:250,
      message:'注册失败!账号已存在，请直接登录！'
    });
  }else{
    await mongoose.model('studentsModel').create({
      phone:acc,
      password:pwd,
      name:'8024号同学',
      gender:'男',
      avatar:'user2.png'

    });
    res.send({
      code:200,
      message:'注册成功！'
    });
  }
})

//修改
router.put('/:name/:gender',async function(req,res){
  console.log('资料修改');
  let {name,gender}=req.params;
  let token = req.get('Authorization').split(' ')[1];
  let user = jsonwebtoken.verify(token, 'testkey').user;
  let re = await mongoose.model('studentsModel').find({
    _id:user._id
  });
  if(re.length==1){
      let uploadMethod = uploadFiles({
        path: './public/images',
        key: 'imgna',//前端指定的存文件对应的属性名字
        size: 1024
      });
      uploadMethod(req, res, async function (error) {
        //有结果时执行的回调函数
        console.log(req.files)
        if(req.files==undefined){
          let reup= await mongoose.model('studentsModel').updateOne(
            {_id:user._id},{name,gender});
            if(reup.modifiedCount>0){ 
              let astudent = await mongoose.model('studentsModel').find({
                _id:user._id
              });
              res.send({
                code: 200,
                message: '修改成功',
                data: astudent[0]
              })
            }else{
              res.send({
                code: 250,
                message: '修改失败'
              })
            }
           
        }else{
          let reup= await mongoose.model('studentsModel').updateOne(
            {_id:user._id},{name,gender,avatar:req.files[0].filename});
            if (error) {//没有参数接收失败转为boolean为false
              res.send({
                code: 250,
                message: '上传失败'
              })
            }else if(reup.modifiedCount==1){ 
              let astudent = await mongoose.model('studentsModel').find({
                _id:user._id
              });
             
              res.send({
                code: 200,
                message: '修改成功',
                data: astudent[0]
              })
            }else {
              res.send({
                code: 250,
                message: '修改失败'
                
              })
            }
        }
      });
    
  }else{
    res.send({
      code:250,
      message:'账户异常'
    })
  }
})
//登陆状态验证
router.get('/',async function(req,res){
  console.log('鉴权认证');
  let token = req.get('Authorization').split(' ')[1];
  let user = jsonwebtoken.verify(token, 'testkey').user;
  let astudent = await mongoose.model('studentsModel').find({
    _id:user._id,phone:user.phone,password:user.password
  });
  if(astudent.length>0){
    res.send({
      code:200,
      message:'身份认证通过',
    })
  }
  else{
    res.send({
      code:250,
      message:'当前处于未登录状态，请登陆'
    })
  }
})


module.exports = router;
