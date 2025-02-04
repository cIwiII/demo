const { usersModel } = require('../model/usersModel');
//获取到所有用户信息
async function getAllMembers(req, res, next) {
    let data = await usersModel.find({ state: 1 });
    console.log("data", data);
    if (data.length > 0) {
        res.send({
            data,
            meta: {
                msg: '获取成功',
                status: 200
            }
        });
    } else {
        res.send({
            meta: {
                msg: '获取失败',
                status: 201
            }
        });
    }
}
//删除会员（软删除）
async function delMember(req, res, next) {
    const { _id } = req.body
    if (_id) {
        let data = await usersModel.updateOne({ _id }, { state: 0 });
        if (data.nModified) {
            res.send({
                meta: {
                    msg: '删除成功',
                    status: 200
                }
            });
        } else {
            res.send({
                meta: {
                    msg: '删除失败',
                    status: 201
                }
            });
        }
    } else {
        res.send({
            meta: {
                msg: '参数不对',
                status: 202
            }
        });
    }
}
//修改会员（软删除）
async function updateMemberToVip(req, res, next) {
    const { _id, date } = req.body
    const currentDate = new Date();
    const fullData = currentDate.getFullYear()+"-"+(currentDate.getMonth()+1)+"-"+currentDate.getDate()
    console.log(fullData);
    if (_id  && date < fullData) {
        let data = await usersModel.updateOne({ _id }, { vip:true,vipdate:date });
        if (data.nModified) {
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
                    status: 201
                }
            });
        }
    } else {
        res.send({
            meta: {
                msg: '参数不对',
                status: 202
            }
        });
    }
}
async function cancleMember(req, res, next) {
    const { _id } = req.body
    if (_id) {
        let data = await usersModel.updateOne({ _id }, { vip:false,vipdate:"" });
        if (data.nModified) {
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
                    status: 201
                }
            });
        }
    } else {
        res.send({
            meta: {
                msg: '参数不对',
                status: 202
            }
        });
    }
}
module.exports = {
    getAllMembers,
    delMember,
    updateMemberToVip,
    cancleMember
};