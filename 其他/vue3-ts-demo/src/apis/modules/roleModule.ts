import axios from "../../utils/axiosUtils"
// 查询所有角色
export const findRoles= ()=>axios.get("/roles/findRoles")