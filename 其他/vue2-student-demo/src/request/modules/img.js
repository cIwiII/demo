import axios from "../../utils/axiosUtils"
const img ={
    postImg(obj){
      return axios.post("/images/uploadImages",obj)
    },
  }
  export default img