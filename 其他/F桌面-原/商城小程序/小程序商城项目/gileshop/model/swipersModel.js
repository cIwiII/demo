var {Schema,model}=require('mongoose');
//定义Schema
var swiperSchema=new Schema({
    image_src:String,
    open_type:String,
    goods_id:Number,
    navigator_url:String
});
//配置数据模型
//暴露模块
module.exports.swipersModel=model('swipersModel',swiperSchema,"swipers");