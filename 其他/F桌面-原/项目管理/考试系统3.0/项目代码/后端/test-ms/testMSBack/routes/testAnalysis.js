let express = require('express');
router = express.Router();

let mongoose = require('mongoose');
// 根据已考试试卷的id，获取此试卷的所有信息
// :/testedId
router.get('/', async function (req, res) {
    let tested = await mongoose.model('testedsModel').find({
        _id: req.params.testedId
    });
    res.send({
        code: 200,
        message: '查询成功',
        data: tested
    });
});


// 学员点击收藏功能，可以对当前考题进行收藏或者取消收藏操作。
// 接收学生的id和需要收藏的试题的id
// studentId,exercisesId
router.post('/:studentId/:exercisesId', async function (req, res) {
    await mongoose.model('collectionsModel').create({
        studentId: req.params.studentId,
        exerciseId: req.params.exercisesId
    });
    res.send({
        code: 200,
        message: '收藏成功',
    });
})

router.delete('/:id', async function (req, res) {
    await mongoose.model('collectionsModel').deleteMany({
        _id: req.params.id
    });
    res.send({
        code: 200,
        message: '取消收藏成功',
    });
})

module.exports=router;


module.exports = router;
