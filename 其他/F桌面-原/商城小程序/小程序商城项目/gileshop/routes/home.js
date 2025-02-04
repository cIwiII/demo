var express = require('express');
var router = express.Router();
const {swiperdata,catitems,floordata}=require('../controller/homeController');

//首页轮播图
router.get('/swiperdata', swiperdata);
//首页分类
router.get('/catitems', catitems);
//首页滑动信息
router.get('/floordata',floordata);
module.exports = router;
