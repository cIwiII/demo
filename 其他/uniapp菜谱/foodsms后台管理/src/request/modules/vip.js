//引入自己的axios
import axios from "../../utils/axiosUtils"
const vip ={
    getAllVip(){
      return axios.get("member/getAllMembers")
    },
    deleVip(_id){//可选。默认{pageSize=12,currentPage=1,val=''}
      return axios.post("member/delMember",{_id})
    },
    //开通
    ToVip(obj){//{_id,date}
      return axios.post("member/updateMemberToVip",obj)
    },
    cancleMember(_id){
      return axios.post("member/cancleMember",{_id})
    }
  }
  export default vip