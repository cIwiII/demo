const {
    Schema,
    model
} = require('mongoose');
const usersSchema = new Schema({
    nickName:String,//昵称
    mycollect: [{
        type: Schema.Types.ObjectId,
        ref: 'menuModel'
    }],//收藏
    record:[{
        type: Schema.Types.ObjectId,
        ref: 'menuModel'
    }],//浏览记录
    mylike:[{
        type: Schema.Types.ObjectId,
        ref: 'menuModel'
    }],//点赞
    vip:Boolean,//会员日期
    vipdate:String,//会员到期
    avatarUrl:String,//头像
    openid:String,//唯一标识
    gender: String,//性别
    province: String,//省份
    state:Number
}, {
    versionKey: false
});
module.exports.usersModel = model('usersModel', usersSchema, 'users');