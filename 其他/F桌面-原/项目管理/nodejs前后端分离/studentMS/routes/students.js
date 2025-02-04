var express = require('express');
var router = express.Router();

//引入mongoose模块
let mongoose = require('mongoose');


/* GET users listing. */
//查询
router.get('/',async function(req,res,next){
  console.log('get请求成功');
let re=await mongoose.model('studentModel').find({}).populate('classId')
//  console.log(re);
res.send({
      code:200,
      message:"获取成功",
      data:re
  })
});
//添加
router.post('/:name/:age/:gender/:classId',async function (req, res, next) {
  console.log('post请求成功')
  let {name,age,gender,classId}=req.params
  //查找是否存在该课程
  // let re = await mongoose.model('classModel').find(
  //   {name}
  // );

  // if (re.length > 0) {
  //   res.send({
  //     code: 250, message: '该学生已存在'
  //   });
  // } else {
    let createObj = await mongoose.model('studentModel').create(
      {name,age,gender,classId}
    );
    // console.log(createObj)
    let re1 = await mongoose.model('classModel').find({});
    res.send({
      code: 200, message: '添加成功', data: re1
    });
  // }
});

//修改
router.put('/:id/:name/:age/:gender/:classId',async function (req, res, next) {
  let {id,name,age,gender,classId}=req.params;
  let re = await mongoose.model('studentModel').updateMany(
    { _id: id },
    { name,
      age,
      gender,
      classId,
    }
  );
  let re2 = await mongoose.model('studentModel').find({}).populate('classId');
  if(re.modifiedCount>0){
    res.send({
      code: 200, message: '修改成功', data: re2
    });
  }else{
    res.send({
      code: 250, message: '修改失败',data:re2
    });
  }
});
//删除
router.delete('/:id',async function (req, res, next) {
  let re = await mongoose.model('studentModel').deleteMany(
    { _id: req.params.id });
  // console.log(re);
  if (re.deletedCount > 0) {
    let re2 = await mongoose.model('studentModel').find({}).populate('classId');
    res.send({
      code: 200, message: '删除成功', data: re2
    });
  }else{
    res.send({
      code: 200, message: '删除失败'
    });
  }

});

module.exports = router;
