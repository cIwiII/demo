import axios from "../utils/axiosUtils"
import { IRole,IAddRole } from "../types/requestParams"

// 获取角色数据
export const getAllRole = (obj:IRole) => axios.get('role',{params:obj})

// 添加
export const addRole = (obj:IAddRole) => axios.post('role',`roleName=${obj.roleName}&remark=${obj.remark}&menuId=${obj.menuId}`)

// 删除角色
export const deleteRole = (roleIdArr:any) =>axios.delete(`role/${roleIdArr}`)
