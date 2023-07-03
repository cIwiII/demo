/**
 * 商品相关请求
 */

import request from "../utils/request"

/** 获取商品信息 */
export const findGoods= ()=>request.get("/goods/findGoods")
/** 商城图片上传 */
export const fileUpload= (imgSrc)=>request.post("/goods/fileUpload",{imgSrc})
/** 删除上传文件 */
export const deleteFiles= (fileName)=>request.post("/goods/deleteFiles ",{fileName})
//根据编号查询商品
export const findGoodsById= (id)=>request.post("/goods/findGoodsById",{id})
/** 删除商品 */
export const deleteGoods= (id)=>request.post("/goods/deleteGoods",{id})
/** 修改商品信息{id,price,type} */
export const updateGoods= (data)=>request.post("/goods/updateGoods",data)
/** 商品添加{name,title,price,type,imgSrc,msg},,需要token */
export const addGoods= (data)=>request.post("/goods/addGoods",data)
/** 按照条件搜索商品{searchType,searchData} */
export const findGoodsByName= (data)=>request.post("/goods/findGoodsByName",data) 