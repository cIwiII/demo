//引入mongoose模块
let mongoose = require('mongoose');
//创建目标集合对象
let classSchema=new mongoose.Schema({
  name:String,
  scroe:Number,
  classTime:Number
});
//建立模型对象与数据库中数据的关联关系
let classModel=mongoose.model('classModel', classSchema, 'class')

//服务器入口导入执行一次