//引入mongoose模块
let mgs=require('mongoose');
//目标集合对象
let cinemaSchema=new mgs.Schema({
    name:String,
    address:String,
    movieIdList:[{
        type:mgs.SchemaTypes.ObjectId,
        ref:'moviemodel'
      }]
})
//链接数据库,自定义名，对象，数据库集合名
mgs.model('cinemamodel',cinemaSchema,'cinema')