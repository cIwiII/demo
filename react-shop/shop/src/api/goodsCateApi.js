/**
 * 分类相关请求
 */

import request from "../utils/request"

/** 获取到所有的分类信息 */
export const findCategroy = (parentId=0)=>request.get("/categroy/findCategroy",{params:{parentId}})
/** 添加分类信息 {name,type,parentId} */
export const addCategroy= (data)=>request.post("/categroy/addCategroy",data)
/** 修改分类信息{id,name} */
export const updateCateGroy = (data)=>request.post("/categroy/updateCateGroy",data)
/** 删除分类信息 */
export const deleteCateGroy = (id)=>request.post("/categroy/deleteCateGroy",{id})
/** 级联分类数据 */
export const findAllCategroy = (parentId=0)=>request.get("/categroy/findAllCategroy",{params:{parentId}})