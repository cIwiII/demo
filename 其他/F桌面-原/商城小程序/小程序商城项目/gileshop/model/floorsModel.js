var {Schema,model}=require('mongoose');
//定义Schema
var floorsSchema=new Schema({
    
});
//配置数据模型
//暴露模块
module.exports.floorsModel=model('floorsModel',floorsSchema,"recommend");