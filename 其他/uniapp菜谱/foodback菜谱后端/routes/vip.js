var express = require('express');
var router = express.Router();
const {getRecommendMenuList,getisFreeMenuList,likeMenu,vipExclusive}=require('../controller/vipController');

//最新推荐
router.get("/getRecommendMenuList",getRecommendMenuList);
//限时免费
router.get("/getisFreeMenuList",getisFreeMenuList);
//猜你喜欢
router.get("/likeMenu",likeMenu);
//精品名厨视频(会员专享)
router.get("/vipExclusive",vipExclusive);
module.exports = router;
