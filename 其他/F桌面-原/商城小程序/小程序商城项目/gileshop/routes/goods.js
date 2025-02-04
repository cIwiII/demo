var express = require('express');
var router = express.Router();
const {search}=require('../controller/goodsController');

//获取所有的商品信息
router.get('/search',search);
module.exports = router;
