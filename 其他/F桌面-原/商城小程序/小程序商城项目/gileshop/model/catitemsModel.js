var {Schema,model}=require('mongoose');
//定义Schema
var catitemsSchema=new Schema({
    name:String,
    image_src:String,
    open_type:String,
    navigator_url:String
});
//配置数据模型
//暴露模块
module.exports.catitemsModel=model('catitemsModel',catitemsSchema,"catitems");