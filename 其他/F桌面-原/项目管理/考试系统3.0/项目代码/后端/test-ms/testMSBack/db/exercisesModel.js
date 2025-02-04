//引入mongoose模块
let mgs = require('mongoose');
//目标集合对象
let exercisesSchema = new mgs.Schema({
    topics: String,
    options: { type: mgs.SchemaTypes.Array },
    answer: { type: mgs.SchemaTypes.Array},
    analysis: String,
    type: Number,
    score: {
        "type": Number,
        "default": 3
    },
    pointId:{
        type:mgs.SchemaTypes.ObjectId,
        ref:'pointsModel'

    }
})
//链接数据库,自定义名，对象，数据库集合名
mgs.model('exercisesModel', exercisesSchema, 'exercises')