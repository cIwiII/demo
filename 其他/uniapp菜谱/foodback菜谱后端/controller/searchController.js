const { menuModel } = require('../model/menuModel');
//搜索菜单
async function searchMenu(req, res, next) {
    var { pageSize, currentPage, val } = req.body;
    if (!pageSize) {
        pageSize = 12;
    }
    if (!currentPage) {
        currentPage = 1;
    }
    if (!val) {
        val = "";
    }
    //总条数
    const total = await menuModel.countDocuments({
        $or: [
            { name: { $regex: val, $options: '$i' } },
            { classtips: { $regex: val, $options: '$i' } }
        ]
    });
    //总页数
    const pages = Math.ceil(total / pageSize);
    //查找菜谱
    const menus = await menuModel.find({
        $or: [
            { name: { $regex: val, $options: '$i' } },
            { classtips: { $regex: val, $options: '$i' } }
        ]
    }).limit(parseInt(pageSize)).skip((currentPage - 1) * parseInt(pageSize));

    if (menus.length > 0) {
        res.send({
            total,
            pages,
            menus,
            meta: {
                msg: '获取成功',
                status: 200
            }
        });
    } else {
        res.send({
            menus,
            meta: {
                msg: '获取失败',
                status: 201
            }
        });
    }
}
//获取所有菜单
async function findAllMenu(req, res, next) {
    var { pageSize, currentPage } = req.body;
    if (!pageSize) {
        pageSize = 12;
    }
    if (!currentPage) {
        currentPage = 1;
    }
    //总条数
    const total = await menuModel.countDocuments();
    //总页数
    const pages = Math.ceil(total / pageSize);
    //查找菜谱
    const menus = await menuModel.find().limit(parseInt(pageSize)).skip((currentPage - 1) * parseInt(pageSize));

    if (menus.length > 0) {
        res.send({
            total,
            pages,
            menus,
            meta: {
                msg: '获取成功',
                status: 200
            }
        });
    } else {
        res.send({
            menus,
            meta: {
                msg: '获取失败',
                status: 201
            }
        });
    }
}
//菜单详情
async function menuDetail(req, res, next) {
    const params = req.body;
    console.log(params);
    let message = await menuModel.find(params);
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
//会员精品推荐
async function memberRecommend(req, res, next) {
    let message = await menuModel.find({ "isFree": "N" }, { "name": 1, "coverpic": 1, "pageview": 1, "collections": 1, "isFree": 1, "vid": 1 }).limit(5);
    console.log("model2", message);
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
//所属页面普通推荐
async function normalRecommend(req, res, next) {
    let message = await menuModel.find({ "isFree": "Y" }, { "name": 1, "coverpic": 1, "pageview": 1, "collections": 1, "isFree": 1, "ingredient": 1 }).limit(5);
    console.log("model2", message);
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

// 后端接口 修改菜单
async function updateMenu(req, res, next) {
    const { _id, isFree, isHot, name, needtime } = req.body
    if (_id && isFree && isHot  && name && needtime) {
        let message = await menuModel.updateOne({ _id }, { isFree, isHot, name, needtime });
        if (message.nModified) {
            res.send({
                meta: {
                    msg: '修改成功',
                    status: 200
                }
            });
        } else {
            res.send({
                meta: {
                    msg: '修改失败',
                    status: 202
                }
            });
        }
    } else {
        res.send({
            meta: {
                msg: '参数错误',
                status: 201
            }
        });
    }

}
module.exports = {
    searchMenu,
    menuDetail,
    memberRecommend,
    normalRecommend,
    updateMenu,
    findAllMenu
};