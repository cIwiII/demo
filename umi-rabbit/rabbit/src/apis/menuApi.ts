import axios from "../utils/axiosUtils"
import {IAddMenu} from "../types/basic"
import {IMenu} from "@/types/requestParams"
import  qs from 'qs'


//根据用户名获取权限菜单
export const authMenu= (username:string)=>axios.get(`menu/${username}`)

//修改菜单
// {
//     menuName?:string,
//     path?:string,
//     component?:string,
//     parentId?:string,
//     icon?:string,
//     orderNum?:string,
//     perms?:string,
//     type?:string,
//     menuId:string
//     }
export const menuPut= (menuId:string)=>axios.put("menu",menuId)
// 根据 ID 删除菜单
export const deleMenu= (id:any[])=>axios.delete(`menu/${id}`)

// 获取菜单数据(数组)
// {
//     menuName?:string,	菜单名称
// createTimeFrom?:string,	菜单创建开始时间（例：2021-10-12）
// createTimeTo?:string	菜单创建结束时间
// }
export const getMenu= (obj:IMenu)=>axios.get(`menu`,{params:obj})

// 新增菜单
export const addMenu= (obj:IAddMenu)=>axios.post(`menu`,decodeURIComponent(qs.stringify(obj)))