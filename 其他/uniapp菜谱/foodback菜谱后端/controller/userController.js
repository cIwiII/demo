const { usersModel } = require('../model/usersModel');
const { menuModel } = require('../model/menuModel');
const { topupModel } = require("../model/topupModel");
const axios = require('axios');
const jwt = require('jsonwebtoken');
/*
    开通会员
    备注：时间上有问题
*/
async function openVip(req, res, next) {
    const { _id, date } = req.query;
    const { vip, vipdate } = await usersModel.findOne({ _id })
    if (_id && date) {
        if (!vip) {
            const newdate = new Date()
            let ndate1 = new Date(newdate.getTime() + date * 2678400000);
            const newvip = ndate1.toLocaleDateString();
            const { nModified } = await usersModel.updateOne({ _id }, { vip: true, vipdate: newvip })
            if (nModified) {
                res.send({
                    msg: "开通成功",
                    code: 1
                })
            }
            else {
                res.send({
                    msg: "开通失败",
                    code: 0
                })
            }
        }
        else {
            console.log('vipdate', vipdate);
            const newdate = new Date(vipdate);
            let ndate1 = new Date(newdate.getTime() + date * 2678400000);
            const newvip = ndate1.toLocaleDateString();
            const { nModified } = await usersModel.updateOne({ _id }, { vipdate: newvip })
            if (nModified) {
                res.send({
                    msg: "续费成功",
                    code: 1
                })
            }
            else {
                res.send({
                    msg: "续费失败",
                    code: 0
                })
            }
        }
    } else {
        res.send({
            msg: "参数错误",
            code: 403
        })
    }

}
/**
 * 套餐管理
 * @param {}} req 
 * @param {*} res 
 * @param {*} next 
 */
async function topupList(req, res, next) {
    const object = await topupModel.find({ state: 1 }).limit(3);
    res.send({
        data: object,
        meta: {
            msg: '获取成功',
            status: 200
        }
    });
}
/* 
   我的收藏
*/
async function getcollect(req, res, next) {
    const { _id } = req.query;
    const { mycollect } = await usersModel.findOne({ _id }).populate("mycollect");
    if (mycollect.length > 0) {
        res.send({
            mycollect,
            meta: {
                msg: '获取成功',
                status: 200
            }
        });
    } else {
        res.send({
            meta: {
                msg: '暂无收藏信息',
                status: 201
            }
        });
    }
}
//收藏餐品信息
async function collect(req, res, next) {
    const { user_id, menu_id } = req.body;
    console.log('menu_id', menu_id);
    console.log('user_id', user_id);
    const { nModified } = await usersModel.updateOne({ _id: user_id, mycollect: { $ne: menu_id } }, { $push: { mycollect: menu_id } });
    if (nModified) {
        const { collections } = await menuModel.findOne({ _id: menu_id })

        if (collections == 0 || collections) {
            console.log(1);
            await menuModel.updateOne({ _id: menu_id }, { collections: collections + 1 })
        }
        else {
            await menuModel.updateOne({ _id: menu_id }, { collections: 1 })
        }

        res.send({
            msg: "收藏成功",
            code: 1
        })
    }
    else {
        const { collections } = await menuModel.findOne({ _id: menu_id })
        await menuModel.updateOne({ _id: menu_id }, { collections: collections - 1 })
        await usersModel.updateOne({ _id: user_id }, { $pull: { mycollect: menu_id } });
        res.send({
            msg: "取消收藏",
            code: 0
        })
    }
}
//我的点赞
async function mylike(req, res, next) {
    const { user_id, menu_id } = req.body;
    console.log('menu_id', menu_id);
    console.log('user_id', user_id);
    const { nModified } = await usersModel.updateOne({ _id: user_id, mylike: { $ne: menu_id } }, { $push: { mylike: menu_id } });
    if (nModified) {
        res.send({
            msg: "喜欢成功",
            code: 1
        })
    }
    else {
        await usersModel.updateOne({ _id: user_id }, { $pull: { mylike: menu_id } });
        res.send({
            msg: "取消喜欢",
            code: 0
        })
    }
}
//获取用户所有点赞
async function getmylike(req, res, next) {
    const {_id} = req.query;
    console.log('user_id', _id);
    const { mylike } = await usersModel.findOne({_id}).populate("mylike");
    if (mylike.length>0) {
        res.send({
            mylike,
            meta:{
                msg: "获取成功",
                status:200
            }
        })
    }
    else {
        res.send({
            mylike:[],
            meta:{
                msg: "暂无点赞",
                status:201
            }
        })
    }
}
//浏览餐品
async function record(req, res, next) {
    const { user_id, menu_id } = req.body;
    console.log('menu_id', menu_id);
    console.log('user_id', user_id);
    await usersModel.updateOne({ _id: user_id, record: { $ne: menu_id } }, { $push: { record: menu_id } });
    const { pageview } = await menuModel.findOne({ _id: menu_id })
    if (pageview == 0 || pageview) {
        await menuModel.updateOne({ _id: menu_id }, { pageview: pageview + 1 })
    }
    else {
        await menuModel.updateOne({ _id: menu_id }, { pageview: 1 })
    }
    const { record } = await usersModel.findOne({ _id: user_id })
    const len = record.length
    if (len > 10) {
        record.splice(0, len - 10)
        await usersModel.updateOne({ _id: user_id }, { record: [...record] })
    }
    res.send({
        msg: "浏览成功",
        code: 1
    })
}
async function getrecord(req, res, next) {
    const { _id } = req.query;
    const { record } = await usersModel.findOne({ _id }).populate("record");
    if (record.length > 0) {
        res.send({
            record,
            meta: {
                msg: '获取成功',
                status: 200
            }
        });
    } else {
        res.send({
            meta: {
                msg: '暂无浏览信息',
                status: 201
            }
        });
    }
}
//微信登录
async function wxLogin(req, res, next) {
    const { code, appId, appSecret } = req.body;
    try {
        // 向微信服务器发送请求
        const { data } = await axios({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            method: 'GET',
            params: {
                appId,
                secret: appSecret,
                js_code: code,
                grant_type: 'authorization_code'
            }
        })
        const { session_key, openid } = data;
        if (!openid) return { message: 'openid 不存在' }
        // 查询数据库中是否有该 openid
        let [userInfo] = await usersModel.find({ openid });
        // 如果没有对应的 openid 用户信息，则新建
        if (!userInfo) {
            userInfo = await usersModel.create({ openid });
        }
        let token = jwt.sign({
            openid,
            _id: userInfo._id,
            session_key
        }, 'PRIVATE_KEY');
        //返回token及用户信息
        res.send({ token: 'Bearer ' + token, userInfo });
    } catch (error) {
        console.log('============== wxLogin 异常 ==============');
        console.log(error);
        console.log('=========================================');
    }
}

/*
 获取用户信息，方便用户第二次及后续使用时直接加载数据，无需再次授权
*/
async function getUserInfo(req, res, next) {
    let { token } = req.query;
    token = token.substring(7);
    const { _id, openid, session_key } = jwt.verify(token, 'PRIVATE_KEY');
    let message = await usersModel.find({ _id });
    res.send(message);
}
//将用户授权获得的信息更新到本地
async function auth(req, res, next) {
    let { token } = req.body;
    if (token) {
        token = token.substring(7);
        const { _id, openid, session_key } = jwt.verify(token, 'PRIVATE_KEY');
        let params = { ...req.body, _id, openid, session_key,state:1 };
        const data = await usersModel.updateOne({ _id: params._id }, params);
        console.log(data);
        if (_id) {
            if (data.nModified == 1) {
                res.send({
                    message: '授权成功',
                    code: 200
                })
            } else {
                res.send({
                    message: '已经授权',
                    code: 200
                })
            }
        } else {
            res.send({
                message: '授权失败,请重新登录',
                code: 500
            })
        }
    } else {
        res.send({
            message: '请在data中传递token',
            code: 500
        })
    }
}

module.exports = {
    openVip,
    getcollect,
    collect,
    mylike,
    getmylike,
    record,
    getrecord,
    wxLogin,
    getUserInfo,
    auth,
    topupList
};