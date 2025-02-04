//引入mongoose模块
let mgs=require('mongoose');
//目标集合对象
let userSchema=new mgs.Schema({
    account:String,
    password:String
})
//链接数据库,自定义名，对象，数据库集合名
mgs.model('usermodel',userSchema,'user')