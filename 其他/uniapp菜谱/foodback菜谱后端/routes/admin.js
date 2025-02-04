var express = require('express');
var router = express.Router();

const {
    login,
    getUserInfo,
    getAllAdmins,
    getAllSwiper,
    addSwiper,
    fileUpload,
    deleteFiles,
    deleteSwiper,
    updateSwiper,
    addAdmins,
    delAdmins,
    updateSwiperShow,
    findByIdSwiper
} = require('../controller/adminController');
const {
    searchMenu,
    menuDetail,
    updateBoutiqueMenu,
    updateMenu,
    findAllMenu
} = require('../controller/searchController');

const { uploadToImages } = require("../utils/myUpload")

//管理员登录
router.post('/login', login);
//管理员登录后获取userInfo
router.get('/getUserInfo', getUserInfo);
//管理员列表(无分页)
router.get('/getAllAdmins', getAllAdmins);
//添加管理员
router.post('/addAdmins', addAdmins);
//删除管理员
router.post('/delAdmins', delAdmins);
//获取所有的轮播图
router.get("/getAllSwiper", getAllSwiper);
//添加轮播图信息
router.post("/addSwiper", addSwiper);
// 文件上传接口
router.post('/fileUpload', uploadToImages.single('imgSrc'), fileUpload)
// 删除文件的接口
router.post('/deleteFiles', deleteFiles)
//删除轮播头信息
router.get("/deleteSwiper", deleteSwiper);
// 根据编号获取轮播图
router.get("/findByIdSwiper", findByIdSwiper);
//修改轮播图
router.post("/updateSwiper", updateSwiper);
//轮播图上架
router.post("/updateSwiperShow", updateSwiperShow);
//搜索菜单列表
router.post('/searchMenu', searchMenu);
//展示菜单列表
router.post('/findAllMenu', findAllMenu);
//菜单详情
router.post("/menuDetail", menuDetail);
//（后端接口）删除菜品
router.post("/updateMenu", updateMenu);
module.exports = router;