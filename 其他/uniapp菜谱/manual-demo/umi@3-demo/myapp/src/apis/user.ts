import axios from "axios"

// 默认请求地址
axios.defaults.baseURL="http://127.0.0.1:8002"
export const getAllUser=(params:number)=>axios.get("users/getAccountList2")