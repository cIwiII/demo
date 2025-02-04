//引入mongoose模块
let mgs = require('mongoose');
//目标集合对象
let collectionsSchema = new mgs.Schema(
    {
        "studentId": { // 学员 _id
            "type": mgs.SchemaTypes.ObjectId,
            "ref": 'studentsModel'
        }
        ,
        "exerciseId": { // 试题 _id
            "type": mgs.SchemaTypes.ObjectId,
            "ref": 'exercisesModel'
        }
    }
)
//链接数据库,自定义名，对象，数据库集合名
mgs.model('collectionsModel', collectionsSchema, 'collections')