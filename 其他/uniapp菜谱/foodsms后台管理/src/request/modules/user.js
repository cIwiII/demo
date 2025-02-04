//引入自己的axios
import axios from "../../utils/axiosUtils"
const user ={
    login(obj){//管理员账号{account,password} 默认（zhangsan）密码 默认（123456）
      return axios.post("admin/login",obj)
    },
    getUserInfo(){
      return axios.get("admin/getUserInfo")
    },
    getAllUser(){
      return axios.get("admin/getAllAdmins")
    },
    addAdmin(obj){//{account,password,realname,telephone}
      return axios.post("admin/addAdmins",obj)
    },
    deleAdmin(_id){
      return axios.post("admin/delAdmins",{_id})
    }
  }
  export default user