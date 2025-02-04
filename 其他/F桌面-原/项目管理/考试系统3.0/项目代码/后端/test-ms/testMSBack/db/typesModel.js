//引入mongoose模块
let mgs = require('mongoose');
//目标集合对象
let typesSchema = new mgs.Schema({
  type: String
})
//链接数据库,自定义名，对象，数据库集合名
mgs.model('typesModel', typesSchema, 'types')