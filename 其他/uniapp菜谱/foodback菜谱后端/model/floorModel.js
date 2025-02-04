var {Schema,model}=require('mongoose');
//定义Schema
var floorSchema=new Schema({
    floor_title:String,
    isFirst:Boolean,
    floor_imgs:Array,
});
//配置数据模型
//暴露模块
module.exports.floorModel=model('floorModel',floorSchema,"floors");