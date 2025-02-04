const { swipersModel } = require('../model/swipersModel');
const { catitemsModel } = require('../model/catitemsModel');
const { floorModel } = require('../model/floorModel');
const { menuModel2}=require('../model/menuModel2');
const { menuModel}=require('../model/menuModel');
//首页轮播图信息
async function swiperdata(req, res, next) {
    let message = await swipersModel.find({state:1,show:1});
    if (message.length > 0) {
        res.send({
            message,
            meta: {
                msg: '获取成功',
                status: 200
            }
        });
    } else {
        res.send({
            message,
            meta: {
                msg: '获取失败',
                status: 201
            }
        });
    }
}
//首页分类信息
async function catitems(req, res, next) {
    let message = await catitemsModel.find();
    if (message.length > 0) {
        res.send({
            message,
            meta: {
                msg: '获取成功',
                status: 200
            }
        });
    } else {
        res.send({
            message,
            meta: {
                msg: '获取失败',
                status: 201
            }
        });
    }
}
//首页楼层信息
async function floorsdata(req,res,next){
    let message=await floorModel.find();
    if (message.length > 0) {
        res.send({
            message,
            meta: {
                msg: '获取成功',
                status: 200
            }
        });
    } else {
        res.send({
            message,
            meta: {
                msg: '获取失败',
                status: 201
            }
        });
    }
}
//首页精品好菜
async function boutiqueMenu(req,res,next){
    let message=await menuModel.find({"isHot":"Y"}).limit(12);
    if (message.length > 0) {
        res.send({
            message,
            meta: {
                msg: '获取成功',
                status: 200
            }
        });
    } else {
        res.send({
            message,
            meta: {
                msg: '获取失败',
                status: 201
            }
        });
    }
}

//首页推荐菜品
async function recommend(req,res,next){
    let message=await menuModel2.find({"isHot":"Y"},{"name":1,"coverpic":1,"pageview":1,"collections":1,"isFree":1});
    console.log("model2",message);
    if (message.length > 0) {
        res.send({
            message,
            meta: {
                msg: '获取成功',
                status: 200
            }
        });
    } else {
        res.send({
            message,
            meta: {
                msg: '获取失败',
                status: 201
            }
        });
    }
}


module.exports = {
    swiperdata,
    catitems,
    floorsdata,
    boutiqueMenu,
    recommend
}