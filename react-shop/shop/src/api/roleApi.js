/**
 * 角色相关请求
 */

import request from "../utils/request"

/** 查询所有角色 */
export const findRoles= ()=>request.get("/roles/findRoles")
/** 添加角色{name,createTime} */
export const addRoles= (data)=>request.post("/roles/addRoles",data)
/** 删除角色 */
export const deleteRoles= (id)=>request.post("/roles/deleteRoles",{id})
/** 根据编号查询角色 */
export const findRoleById= (roleId)=>request.post("/roles/findRoleById",{roleId})
/** 修改角色权限{id,authTime,authUser,menus} */
export const putAuth= (data)=>request.post("/roles/addAuth",data)