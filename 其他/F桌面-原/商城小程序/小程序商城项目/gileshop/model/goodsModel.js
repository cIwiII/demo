var {Schema,model}=require('mongoose');
//定义Schema
var goodsSchema=new Schema({
  
});
//配置数据模型
//暴露模块
module.exports.goodsModel=model('goodsModel',goodsSchema,"goods");