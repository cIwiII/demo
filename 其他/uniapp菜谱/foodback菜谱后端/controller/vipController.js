const { menuModel } = require('../model/menuModel');
//最新推荐
async function getRecommendMenuList(req, res, next) {
    let data = await menuModel.find({ "isRecommend": "Y" },{"name":1,"coverpic":1,"pageview":1,"collections":1,"isFree":1,"ingredient":1,"vid":1});
    //随机选择4个
    let menus = [];
    while(menus.length<4){
        var randomArray = data[parseInt(Math.random() * data.length)];
        if (menus.indexOf(randomArray) > -1) {
        } else {
            menus.push(randomArray);
        }
    }
    if (menus.length > 0) {
        res.send({
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
//限时免费
async function getisFreeMenuList(req, res, next) {
    let data = await menuModel.find({ "isFree": "Y" },{"name":1,"coverpic":1,"pageview":1,"collections":1,"isFree":1,"ingredient":1,"vid":1});
    //随机选择4个
    let menus = [];
    while(menus.length<4){
        var randomArray = data[parseInt(Math.random() * data.length)];
        if (menus.indexOf(randomArray) > -1) {
        } else {
            menus.push(randomArray);
        }
    }
    if (menus.length > 0) {
        res.send({
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
//猜你喜欢,这里模拟猜你喜欢，猜你喜欢需要用到大数据来完成
async function likeMenu(req,res,next){
    let data = await menuModel.find({ "isFree": "Y" },{"name":1,"coverpic":1,"pageview":1,"collections":1,"isFree":1,"ingredient":1,"vid":1});
    //随机选择4个
    let menus = [];
    while(menus.length<4){
        var randomArray = data[parseInt(Math.random() * data.length)];
        if (menus.indexOf(randomArray) > -1) {
        } else {
            menus.push(randomArray);
        }
    }
    if (menus.length > 0) {
        res.send({
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
//精品名厨(会员专享)
async function vipExclusive(req,res,next){
    let data=await menuModel.find();
   
    //排序并过滤grade小于3的
    const menus = data.sort((a, b) => b.pageview - a.pageview).filter(item => item.grade > 3);
    console.log('menus',menus);
     //数据长度大于12 获取点赞量最多10条数据，否则直接返回
     if (menus.length > 12) {
        const newMenus = menus.slice(0, 12);
        res.send({
            status: 200,
            msg: '获取数据成功',
            menus: newMenus
        })
    } else {
        res.send({
            status: 200,
            msg: '获取数据成功',
            menus
        })
    }
}
module.exports = {
    getRecommendMenuList,
    getisFreeMenuList,
    likeMenu,
    vipExclusive
};