//引入自己的axios
import axios from "../../utils/axiosUtils"
const meal ={
    getAllMeal(){
      return axios.get("meal/getAllMeal")
    },
    updateMeal(obj){//{_id,mouth,salePrice,normalPrice,type,name}
      return axios.post("meal/updateMeal",obj)
    },
    addMeal(obj){//{mouth,salePrice,normalPrice,type,name}
      return axios.post("meal/addMeal",obj)
    },
    deleMeal(_id){
      return axios.post("meal/delMeal",{_id})
    }
  }
  export default meal