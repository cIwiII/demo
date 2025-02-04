//存放所有学生请求
//引入自己的axios
import axios from "../../utils/axiosUtils"
const student ={
  getAllStudent(obj){
    return axios.get("/students/getStudents",
    {params:obj})
  },
  postStudent(obj){
    return axios.post("/students/addStudents",obj)
  },
  deleteStudent(id){
    return axios.delete("/students/deleteStudents",{data:{_id:id}})
  },
  putStudent(obj){
    return axios.put("/students/updateStudents",obj)
  },
  getAStudent(id){
    return axios.get("/students/getStudentsById",{params:{_id:id}})
  }
}
export default student