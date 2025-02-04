//引入mongoose模块
let mgs = require('mongoose');
//目标集合对象
let testsSchema = new mgs.Schema({
    title: String,
    date: String,
    durations: String,
    "start-time": String,
    "end-time": String,
    form: Number,
    pointId: {
        type: mgs.SchemaTypes.Array,
        ref: 'pointsModel'
    },
    exerciseId: {
        type: mgs.SchemaTypes.Array,
        ref: 'exercisesModel'
    }
})
//链接数据库,自定义名，对象，数据库集合名
mgs.model('testsModel', testsSchema, 'tests')