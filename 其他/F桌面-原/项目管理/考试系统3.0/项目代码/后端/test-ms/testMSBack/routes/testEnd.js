let experss = require('express');
router = experss.Router();

// 引入mongoose模块
let mgs = require('mongoose');

// 根据已考试卷 _id ，获取学生的考试成绩
router.get('/:id', async function (req, res) {
    let score = await mgs.model('testedsModel').find({
        _id: req.params.id
    });
    res.send({
        code: 200,
        message: '查询成功',
        data: score

    })
})

module.exports = router;