import axios from "../../utils/axiosUtils"
import {IProductAdd,IProductDele,IProductSearch} from '../../types/project'
// 获取到所有的分类信息
export const findCategroy = (parentId=0)=>axios.get("/categroy/findCategroy",{params:{parentId}})
// 添加分类信息 {name,type,parentId}
// export const addCategroy= (data)=>axios.post("/categroy/addCategroy",data)
// // 修改分类信息{id,name}
// export const updateCateGroy = (data)=>axios.post("/categroy/updateCateGroy",data)
// // 删除分类信息
// export const deleteCateGroy = (id)=>axios.post("/categroy/deleteCateGroy",{id})
// 级联分类数据
export const findAllCategroy = (parentId=0)=>axios.get("/categroy/findAllCategroy",{params:{parentId}})