//引入mongoose模块
let mongoose = require('mongoose');
//创建目标集合对象
let gradesSchema = new mongoose.Schema({
  nameId:{
      type:mongoose.SchemaTypes.ObjectId,
      ref:'studentModel'
  },
  //课程由学生数据渲染而来，不需要课程数据
  /* classId:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'studentModel'
  }, */
  score:String

});

//建立模型对象与数据库中数据的关联关系
mongoose.model('gradesModel', gradesSchema, 'grades')

//服务器入口导入执行一次