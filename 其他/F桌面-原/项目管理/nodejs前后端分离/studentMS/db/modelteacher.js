//引入mongoose模块
let mongoose = require('mongoose');
//创建目标集合对象
let teacherSchema = new mongoose.Schema({
  neme: String,
  tel: String,
  satry:String,
  classId:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'classModel'
  }]
});

//建立模型对象与数据库中数据的关联关系
mongoose.model('teacherModel', teacherSchema, 'teacher')

//服务器入口导入执行一次