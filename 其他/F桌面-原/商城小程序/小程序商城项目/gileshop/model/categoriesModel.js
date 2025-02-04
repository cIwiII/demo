var {Schema,model}=require('mongoose');
//定义Schema
var categoriesSchema=new Schema({
  
});
//配置数据模型
//暴露模块
module.exports.categoriesModel=model('categoriesModel',categoriesSchema,"categories");