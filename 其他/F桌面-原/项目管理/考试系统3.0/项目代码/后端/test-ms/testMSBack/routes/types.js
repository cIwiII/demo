let experss = require('express');
router = experss.Router();

// 引入mongoose模块
let mgs = require('mongoose');

router.get('/', async function (req, res) {
    let finArr= await mgs.model('typesModel').find({});
    res.send({
        code: 200,
        message: '查询成功',
        data: finArr
    })
})
router.get('/:id', async function (req, res) {
console.log('考试信息页获取')
    let finArr= await mgs.model('typesModel').find({_id:req.params.id});
    res.send({
        code: 200,
        message: '查询成功',
        data: finArr
    })
})

module.exports = router;