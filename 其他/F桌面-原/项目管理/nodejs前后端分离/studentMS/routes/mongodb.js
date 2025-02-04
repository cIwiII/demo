var express = require('express');
var router = express.Router();

//引入mongoose模块
let mongoose = require('mongoose');
//创建目标集合对象
let usersSchema = new mongoose.Schema({
  account: String,
  password: String
});
/* let newclassSchema=new mongoose.Schema({
  name:String,
  score:Number,
  classTime:Number
}); */
//建立模型对象与数据库中数据的关联关系,分离方式无需返回值
let usersModel = mongoose.model('usersmodel', usersSchema, 'users')
/* GET home page. */
router.get('/:account/:password', async function (req, res, next) {
  console.log('asdf')
  let re = await usersModel.find({
    $and: [{
      account: req.params.account
    },
    {
      password: req.params.password
    }
    ]
  });
  if (re) {
    res.send({
      code: 200,
      message: '登录成功',
    });
  } else {
    res.send({
      code: 200,
      message: '登录失败，账号或密码错误',

    });
  }
  console.log(re);

});
// router.get('/', async function(req, res, next) {
//查询users集合的所有数据
//方式一、模型关联无返回值，用名字,关系连接分开存放时只能使用方式一
//let re=await mongoose.model('usersModel').find({});
//方式二、模型关联有返回值，用返回对象  ↓
// let re=await newclassModel.find({});

/*  let re=await newclassModel.find({
   name:{
     $regex:'^JavaScript'
   }
 }); */

/* let re=await newclassModel.find({
  $and:[{
    classTime:{$gte:5}
  },
  {
    classTime:{$lt:9}
  }
  ]
}); */
/* let re=await newclassModel.find({
  $or:[{
    score:3
  },
  {
    classTime:{$lt:5}
  }
  ]
}); */
/*  let re=await newclassModel.find({
   $or:[{
     name:{
       $regex:'web'
     }
   },
   {
     classTime:{$lt:5}
   }
   ]
 });
 console.log(re);
 res.send({
   code:200,
   message:'成功',
   data:re
}); */
// }); 
/*
    练习
        1、将自己的信息添加到学生集合
        2、删除姓名为'张三三'的学生信息
        3、根据性别分班，男生一个班，女生一个班
        4、完成注册功能
    */
//添加
router.post('/:account/:password', async function (req, res, next) {
  console.log('asdf')
  let re = await usersModel.create(
    { account: req.params.account, password: req.params.password }
  );
  console.log(re);
  res.send({
    code: 200,
    message: '添加成功',
  });

});
router.delete('/:account/:password', async function (req, res, next) {
  console.log('asdf')
  let re = await usersModel.deleteMany(
    { account: req.params.account });
  console.log(re);
  res.send({
    code: 200,
    message: '删除成功',
  });
});
router.put('/:account/:password', async function (req, res, next) {
  console.log('asdf')
  let re = await usersModel.updateMany(
    { account: req.params.account },{password:req.params.password});
  console.log(re);
  res.send({
    code: 200,
    message: '修改成功',
  });
});

module.exports = router;



/* router.post('/',function(){
  console.log('执行');
  let uploadMethod=uploadFiles({
    path:'./public/images',
    key:'imgname',
    size:1024
  });
  uploadMethod(req,res,function(error){
    if(error){
      res.send({
        code:250,
        message:'上传失败'
      });
    }else{
      res.send({
        code:200,
        message:'上传成功'，
        data:`http://127.0.0.1:3001/images/${req.files[0].filename}`
      })
    }
  }) */
// })
