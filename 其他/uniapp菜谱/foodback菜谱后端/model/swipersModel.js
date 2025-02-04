var {Schema,model}=require('mongoose');
//定义Schema
var swiperSchema=new Schema({
    image_src:String,
    open_type:String,
    goods_id: {
        type: Schema.Types.ObjectId,
        ref: 'menuModel'
    },
    navigator_url:String,
    state:Number,
    show:Number
});
//配置数据模型
//暴露模块
module.exports.swipersModel=model('swipersModel',swiperSchema,"swipers");