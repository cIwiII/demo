import axios from "../../utils/axiosUtils"
import {IUserAdd} from '../../types/project'
// 用户登陆{account,password}
export const login= (data:{account:string ,password:string})=>axios.post("/users/login",data)
// 获取账户列表
export const getAccountList= ()=>axios.post("/users/getAccountList")
// 添加{account:string,password:int,email:string,role:str(id)}
export const accountadd= (data:IUserAdd)=>axios.post("/users/accountadd",data)
// 删除id;string	要删除的用户编号id=60d59714b2841111a8c15ac0
export const deleteUser= (id:string)=>axios.get("/users/delAccount",{params:{id}})
