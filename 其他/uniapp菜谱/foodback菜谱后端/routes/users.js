var express = require('express');
var router = express.Router();
const {openVip,getUserInfo,getcollect,collect,mylike,getmylike,record,getrecord,wxLogin,auth,topupList} =require('../controller/userController');
//开通会员
router.get('/openVip',openVip);
//充值列表
router.get('/topupList',topupList);
//我的收藏
router.get("/getcollect",getcollect);
//收藏餐品
router.post("/collect",collect);
//我的点赞
router.post("/mylike",mylike);
//所有点赞
router.get("/getmylike",getmylike);
//浏览餐品
router.post("/record",record);
//我的浏览记录
router.get("/getrecord",getrecord);
//微信登录
router.post("/wxLogin",wxLogin);
//获取用户信息
router.get("/getUserInfo",getUserInfo);
//将用户授权获得的信息更新到本地
router.post("/auth",auth);
module.exports = router;