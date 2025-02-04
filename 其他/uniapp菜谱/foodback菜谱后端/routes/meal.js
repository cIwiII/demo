var express = require('express');
var router = express.Router();
const {getAllMeal,delMeal,updateMeal,addMeal} =require('../controller/mealController');
// 获取所有套餐
router.get('/getAllMeal',getAllMeal);
// 删除套餐
router.post('/delMeal',delMeal);
// 修改套餐
router.post('/updateMeal',updateMeal);
// 添加套餐
router.post('/addMeal',addMeal);

module.exports = router;