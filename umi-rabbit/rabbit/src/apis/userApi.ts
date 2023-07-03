import axios from "../utils/axiosUtils"
import { IUser,IAddUser } from "../types/requestParams"
// body参数转字符串
// const qs= require('qs');
import  qs from 'qs'
// 登录{username:string,password:string}
export const login = (username: string, password: string) => axios.post('login', `username=${username}&password=${password}`)

// export const login = () => axios({
//     url: 'login',
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     data: 'username=bobo&password=1234qwer'
// })
//验证
export const check = (username: string) => axios.post("user/check/", `username=${username}`)

// 获取用户数据
// export const getUserData = () => axios.get("user")
export const getUserData = (obj:IUser) => axios.get("user",{params:obj})

// 部门获取
export const getDept = () => axios.get("dept")
// 新增用户
export const addUser = (obj:IAddUser) => axios.post("user",decodeURIComponent(qs.stringify(obj)))

// export const addUser = (obj:IAddUser) =>{
//     let bb=decodeURIComponent(qs.stringify(obj))
//  console.log(bb);
    // return axios({
    //     url: 'user',
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     },
//        // data: `username=${obj.username}&password=${obj.password}&roleId=${obj.roleId}&status=${obj.status}&ssex=${obj.ssex}&email=${obj.email}&mobile=${obj.mobile}&deptId=${obj.deptId}`
//         data: bb
//     })
// }

// 用户删除
export const deleUsers = (userId:number[]) => axios.delete(`user/${userId}`)

// 修改用户
export const putUser = (obj:any) =>axios.put(`user`,decodeURIComponent(qs.stringify(obj)))

