let express = require('express');
let router = express.Router();
let mgs = require('mongoose')
let jsonwebtoken = require('jsonwebtoken');

//判断是否已经收藏
router.get('/', async function (req, res) {
  console.log('收藏查询');
  let token = req.get('Authorization').split(' ')[1];
  let user = jsonwebtoken.verify(token, 'testkey').user;
  let allCollArr = await mgs.model('collectionsModel').find({
    studentId: user._id
  }).populate('exerciseId')
  res.send({
    code: 200,
    message: '获取成功',
    data: allCollArr
  })
})

router.post('/:exerId', async function (req, res) {
  console.log('收藏添加');
  let token = req.get('Authorization').split(' ')[1];
  let user = jsonwebtoken.verify(token, 'testkey').user;
  let findss = await mgs.model('collectionsModel').find(
    { studentId: user._id, exerciseId: req.params.exerId })
    console.log(findss);
  if (findss.length==0) {
    let addTesteds = await mgs.model('collectionsModel').create({
      studentId: user._id, exerciseId: req.params.exerId
    })
    res.send({
      code: 200,
      message: '收藏成功'
    })
  }else{
    res.send({
      code: 250,
      message: '收藏'
    })
  }
  

})
router.delete('/:exerId', async function (req, res) {
  console.log('收藏删除');
  let token = req.get('Authorization').split(' ')[1];
  let user = jsonwebtoken.verify(token, 'testkey').user;
  let deles = await mgs.model('collectionsModel').deleteMany({
    studentId: user._id, exerciseId: req.params.exerId
  })
  if (deles.deletedCount>0) {
    res.send({
      code: 200,
      message: '取消收藏'
    })
  } else {
    res.send({
      code: 200,
      message: '未收藏'
    })
  }


})

module.exports = router