const { topupModel } = require('../model/topupModel');
//获取到所有套餐信息
async function getAllMeal(req, res, next) {
    let data = await topupModel.find({ state: 1 });
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
//删除套餐（软删除）
async function delMeal(req, res, next) {
    const { _id } = req.body
    if (_id) {
        let data = await topupModel.updateOne({ _id }, { state: 0 });
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
//修改套餐
async function updateMeal(req, res, next) {
    const { _id, mouth,salePrice,normalPrice,type,name} = req.body
    if (_id) {
        let data = await topupModel.updateOne({ _id }, {mouth,salePrice,normalPrice,type,name});
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
//添加套餐
async function addMeal(req, res, next) {
    const {mouth,salePrice,normalPrice,type,name} = req.body
    if (mouth>=1 && mouth <=12 && salePrice && normalPrice && type && name) {
        let data = await topupModel.create({mouth,salePrice,normalPrice,type,name,state:1});
        console.log(data);
        if (data) {
            res.send({
                meta: {
                    msg: '添加成功',
                    status: 200
                }
            });
        } else {
            res.send({
                meta: {
                    msg: '添加失败',
                    status: 201
                }
            });
        }
    } else {
        res.send({
            meta: {
                msg: '参数不能为空,且月份必须1-12月份,type的值为(0|1)',
                status: 202
            }
        });
    }
}
module.exports = {
    getAllMeal,
    delMeal,
    updateMeal,
    addMeal
};