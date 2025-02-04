const {categoriesModel}=require('../model/categoriesModel');
async function categories(req,res,next){
    const message=await categoriesModel.find();
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
module.exports={
    categories
};