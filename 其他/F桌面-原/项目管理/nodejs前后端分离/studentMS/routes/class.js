var express = require('express');
var router = express.Router();

//引入mongoose模块
let mongoose = require('mongoose');
//获取数据长度


// async function classArr() {
//   let re = await mongoose.model('classModel').find({});
//   n = re.length + 1
//   return re;
// }
// classArr()

/* GET users listing. */
//添加
router.post('/:name/:scroe/:classTime', async function (req, res, next) {
  console.log('post请求成功')
  console.log(req.params.scroe)
  //查找是否存在该课程
  let re = await mongoose.model('classModel').find(
    { name: req.params.name }
  );

  if (re.length > 0) {
    res.send({
      code: 250, message: '课程已存在'
    });
  } else {
    let createObj = await mongoose.model('classModel').create(
      {name: req.params.name,scroe: req.params.scroe,classTime: req.params.classTime }
    );
    let re1 = await mongoose.model('classModel').find({});
    res.send({
      code: 200, message: createObj.name + '添加成功', data: re1
    });
  }
});
//查询
router.get('/', async function (req, res, next) {
  let re = await mongoose.model('classModel').find({});
  // console.log(re)
  res.send({
    code: 200, message: '查询成功', data: re
  });
});
//修改
router.put('/:id/:name/:scroe/:classTime', async function (req, res, next) {
  console.log('put请求成功' + req.params.id)
  let re3 = await mongoose.model('classModel').find(
    { name: req.params.name }
  );

  let re2 = await mongoose.model('classModel').find({});
  if(re3.length==0){
    let re = await mongoose.model('classModel').updateMany(
      { _id: req.params.id },
      { name: req.params.name,
        scroe: req.params.scroe,
        classTime: req.params.classTime
      }
  
    );
    console.log(re);
    re2 = await mongoose.model('classModel').find({});
    if(re.modifiedCount>0){
      res.send({
        code: 200, message: '修改成功', data: re2
      });
    }
  }
 else{
    res.send({
      code: 250, message: '修改失败,课程已存在',data:re2
    });
  }
 
});
//删除
router.delete('/:id', async function (req, res, next) {
  console.log('delete请求成功')

  let re = await mongoose.model('classModel').deleteMany(
    { _id: req.params.id });

  console.log(re);
  if (re.deletedCount > 0) {
    let re2 = await mongoose.model('classModel').find({});
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
