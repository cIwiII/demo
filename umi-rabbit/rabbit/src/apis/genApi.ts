import axios from "../utils/axiosUtils"
import {ICharge,IShopEnter,IShop,IPutCharge,IPutShop,IShopCharge,IPutShopCharge} from "@/types/requestParams"
import  qs from 'qs'
import {IPutServe,IGetShopping} from "@/types/serveReq"
//获取所有充电桩的审核数据,请求Query参数
export const getChargeApply= (obj:ICharge)=>axios.get(`gen/apply/charge?${decodeURIComponent(qs.stringify(obj))}`)

// 修改充电桩状态,请求Body参数
export const putCharge= (obj:IPutCharge)=>axios.put(`gen/apply/charge`,decodeURIComponent(qs.stringify(obj)))

// 获取所有商铺的审核数据,请求Query参数
export const getShopsApply= (obj:IShop)=>axios.get(`gen/apply?${decodeURIComponent(qs.stringify(obj))}`)

// 修改商铺状态,body
export const putApply= (obj:IPutShop)=>axios.put(`gen/apply`,decodeURIComponent(qs.stringify(obj)))

// 门店管理获取门店信息（包括店铺和充电站）,
export const findShopMS= (obj:IShopCharge)=>axios.get(`gen/shop/findAll?${decodeURIComponent(qs.stringify(obj))}`)

// 修改门店状态,
export const putShopCharge= (obj:IPutShopCharge)=>axios.put(`gen/shop`,decodeURIComponent(qs.stringify(obj)))

// 验证商家手机号是否已注册,
export const checkTel= (tel:string)=>axios.get(`gen/apply/shop/tel/${tel}`)

// 查看店铺名是否已注册,
export const checkShopName= (shopname:string)=>axios.get(`gen/apply/shop/shopname/${shopname}`)

// 新增店铺或充电站,
export const addCharge= (obj:IShopEnter)=>{
    console.log('最终入驻信息',decodeURIComponent(qs.stringify(obj)))
   return axios.post(`gen/apply/shop`,decodeURIComponent(qs.stringify(obj)))
}


// --------------------
// 获取所有商品分类,类型
// name	车品生活	否	string	商品类型名称
// status	2	否	string	商品类型状态（1：启用，2：停用）
export const shopCate= ()=>axios.get(`gen/goodstype`)

// 获取商品数据
export const getAllShop= (obj:IGetShopping)=>{
    console.log(`gen/goods/?${obj.pageSize}/${obj.pageNum}/${obj.name}/${obj.sortField}/${obj.sortOrder}/${obj.status}/${obj.goodstypeId}`)
   return axios.get(`gen/goods/?${obj.pageSize}/${obj.pageNum}/${obj.name}/${obj.sortField}/${obj.sortOrder}/${obj.status}/${obj.goodstypeId}`)
}

// 服务分类
export const servicetype= (name:string)=>axios.get(`gen/servicetype?name=${name}`)
    
// 修改服务类别
export const putService= (obj:IPutServe)=>axios.put(`gen/servicetype`,decodeURIComponent(qs.stringify(obj)))

// 新增服务类型
interface IaddServe{
    name:string,
    Pid:string|number
}
export const addService= (obj:IaddServe)=>axios.post(`gen/servicetype`,decodeURIComponent(qs.stringify(obj)))

// 删除
export const deleService= (id:any)=>axios.delete(`gen/servicetype/${id}`)
