
import axios from "../../utils/axiosUtils"
const teacher = {
    //获取所有教师
    getTeacher() {
        return axios.get("/teachers/getTeachers",)
    },
    getATeacher(id){
        return axios.get('teachers/getTeachersById',{params:{_id:id}})
    },
    delTeacher(id) {
        return axios.delete("/teachers/deleteTeachers",{data:{_id:id}})
    },
    addTeacher(obj) {
        return axios.post("/teachers/addTeachers",obj)
    },
    putTeacher(obj) {
        return axios.put("/teachers/updateTeachers",obj)
    },
}
export default teacher