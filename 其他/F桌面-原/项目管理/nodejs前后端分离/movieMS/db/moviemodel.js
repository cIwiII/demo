//引入mongoose模块
let mgs=require('mongoose');
//目标集合对象
let movieSchema=new mgs.Schema({
    name:String,
    description:String,
    img:String
})
//链接数据库,自定义名，对象，数据库集合名
mgs.model('moviemodel',movieSchema,'movie')