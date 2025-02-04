import axios from "../../utils/axiosUtils"
import {IProductAdd,IProductDele,IProductSearch} from '../../types/project'

// 获取商品信息
export const findGoods= ()=>axios.get("goods/findGoods")

// 商城图片上传
export const fileUpload= (imgSrc:object)=>axios.post("/goods/fileUpload",{imgSrc})
// 删除上传文件
export const deleteFiles= (fileName:object)=>axios.post("/goods/deleteFiles ",{fileName})
//根据编号查询商品
export const findGoodsById= (id:string)=>axios.post("/goods/findGoodsById",{id})
// 删除商品
export const deleteGoods= (id:string)=>axios.post("/goods/deleteGoods",{id})
// 修改商品信息{id,price,type}
export const updateGoods= (data:IProductDele)=>axios.post("/goods/updateGoods",data)
// 商品添加{name,title,price,type,imgSrc,msg},,需要token
export const addGoods= (data:IProductAdd)=>axios.post("/goods/addGoods",data)
// 按照条件搜索商品{searchType,searchData}
export const findGoodsByName= (data:IProductSearch)=>axios.post("/goods/findGoodsByName",data) 