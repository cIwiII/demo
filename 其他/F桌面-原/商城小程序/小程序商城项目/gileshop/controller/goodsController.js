const {goodsModel}=require('../model/goodsModel');
async function search(req,res,next){
    console.log(req.query);
    const {pageSize=6,currentPage=1}  = req.query;
    // 分页获取商品
    let message =await goodsModel
    .find()
    .limit(parseInt(pageSize))
    .skip((parseInt(currentPage) - 1) * parseInt(pageSize));
    // 获取总条数
    const totalNumber = await goodsModel.countDocuments();
    if (message.length > 0) {
        res.send({
            message,
            total:totalNumber,
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
module.exports={
    search
};