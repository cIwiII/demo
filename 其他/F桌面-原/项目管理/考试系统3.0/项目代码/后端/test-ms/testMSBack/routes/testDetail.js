let experss = require('express');
router = experss.Router();

// 引入mongoose模块
let mgs = require('mongoose');

// 接收学生id和试卷id
// :studentId/:exercisesId
router.get('/', async function (req, res) {

    // 根据传入的学生的ID，在student集合中查找对应的学生
    let studentData = await mgs.model('studentsModel').find({
        _id: req.params.studentId
    });

    // 根据传入的试卷的ID，在exercises集合中查找对应的试卷
    let testData = await mgs.model('exercisesModel').find({
        _id: req.params.exercisesId
    });

    res.send({
        code: 200,
        message: '查询成功',
        data1: studentData,
        data2: testData
    })
    console.log(studentData,testData)

})

module.exports = router;