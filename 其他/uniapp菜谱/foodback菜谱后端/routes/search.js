var express = require('express');
var router = express.Router();
const {searchMenu,menuDetail,memberRecommend,normalRecommend}=require('../controller/searchController');

//菜单搜索
router.post('/searchMenu', searchMenu);
//菜单详情
router.post("/menuDetail",menuDetail);
// 会员金品菜品推荐
router.get("/memberRecommend",memberRecommend);
// 搜索页面普通推荐
router.get("/normalRecommend",normalRecommend);
module.exports = router;
