var express = require('express');
var router = express.Router();
const {swiperdata,catitems,floorsdata,boutiqueMenu,recommend}=require('../controller/homeController');

//首页轮播图
router.get('/swiperdata', swiperdata);
//首页分类
router.get('/catitems', catitems);
//首页楼层信息
router.get("/floorsdata",floorsdata);
//首页精品好菜
router.get("/boutiqueMenu",boutiqueMenu);
// 首页推荐菜品
router.get("/recommend",recommend);

module.exports = router;
