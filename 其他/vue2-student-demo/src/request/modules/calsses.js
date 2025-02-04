import axios from "../../utils/axiosUtils"
const classes ={
    getClasses(obj){
      return axios.get("/classes/getClasses", {params:obj})
    },
    //获取一个班级
    getAClasses(id){
      return axios.get("/classes/getClassesById",{params:{_id:id}})
    },
    postClasses(obj){
      return axios.post("/classes/addClasses",obj)
    },
    deleteClasses(id){
      return axios.delete("/classes/deleteClasses",{data:{_id:id}})
    },
    putClasses(obj){
      return axios.put("/classes/updateClasses",obj)
    },
  }
  export default classes