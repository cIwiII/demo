var express = require('express');
var router = express.Router();
const {categories}=require('../controller/categoriesController');

//获取所有的商品信息
router.get('/',categories);
module.exports = router;
