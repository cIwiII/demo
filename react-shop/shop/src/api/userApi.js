/**
 * 用户相关请求
 */

import request from "../utils/request"

/** 用户登陆{account,password} */
export const login= (data)=>request.post("/users/login",data)
/** 获取账户列表 */
export const getUserList= ()=>request.post("/users/getAccountList")
/** 添加{account:string,password:int,email:string,role:str(id)} */
export const addUser= (data)=>request.post("/users/accountadd",data)
/** 删除id;string	要删除的用户编号id=60d59714b2841111a8c15ac0 */
export const delUser= (id)=>request.get("/users/delAccount",{params:{id}})