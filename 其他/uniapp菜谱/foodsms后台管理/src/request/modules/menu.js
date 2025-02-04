//引入自己的axios
import axios from "../../utils/axiosUtils"
const menu ={
    getAllMenu(obj){//可选。默认{pageSize=12,currentPage=1}
      return axios.post("admin/findAllMenu",obj)
    },
    searchMenu(obj){//可选。默认{pageSize=12,currentPage=1,val=''}
      return axios.post("admin/searchMenu",obj)
    },
    menuDetail(_id){
      return axios.post("admin/menuDetail",{_id})
    },
    updateMenu(obj){//{_id,isFree,isHot,name,needtime}
      return axios.post("admin/updateMenu",obj)
    }
  }
  export default menu