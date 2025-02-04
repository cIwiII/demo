const { swipersModel } = require('../model/swipersModel');
const { catitemsModel } = require('../model/catitemsModel');
const { floorsModel } = require('../model/floorsModel');
async function swiperdata(req, res, next) {
    let message = await swipersModel.find();
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
async function floordata(req, res, next) {
    const message = await floorsModel.find();
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
    floordata
}