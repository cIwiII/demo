
import axios from "../../utils/axiosUtils"
const subjects ={
    getSubjects(){
      return axios.get("/subjects/getSubjects")
    },
  }
  export default subjects