var express = require('express');
var router = express.Router();
const {getAllMembers,delMember,updateMemberToVip,cancleMember} =require('../controller/memberController.js');
//（后端接口）获取到所有会员
router.get('/getAllMembers',getAllMembers);
// （后端接口）删除会员
router.post('/delMember',delMember);
// （后端接口）授权会员
router.post('/updateMemberToVip',updateMemberToVip);
// （后端接口）取消会员
router.post('/cancleMember',cancleMember);
module.exports = router;