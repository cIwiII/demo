import axios from "../../utils/axiosUtils"
const user ={
    login(obj){
      return axios.post("/users/login",obj)
    },
    getUserInfo(){
      return axios.get("/users/getUserInfo")
    },
    reg(obj){
      return axios.post("/users/register",obj)
    },
  }
  export default user