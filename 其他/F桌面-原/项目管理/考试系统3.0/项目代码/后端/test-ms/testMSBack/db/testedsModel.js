let mgs = require('mongoose');
//目标集合对象
let testedsSchema = new mgs.Schema({
    studentId: {
        type: mgs.SchemaTypes.ObjectId,
        ref: 'studentsModel'
    },
    testId: {
        type: mgs.SchemaTypes.ObjectId,
        ref: 'testsModel'
    },
    typeId: {
        type: mgs.SchemaTypes.ObjectId,
        ref: 'typesModel'
    },
    answers: [[Number]],
    score: String,
    accuracy: String,
    durations: String
})
mgs.model('testedsModel', testedsSchema, 'testeds')
