
import { IRole, IAddRole } from '@/types/requestParams'
 import { getAllRole,addRole} from "@/apis/roleApi"
export default {
    state: {
        allRole:[],roleTotal:0
    },
    effects: {
      // 获取角色数据
    *asyncGetRole({payload}:any,{call,put}:any):any{
        const res = yield call(getAllRole,payload)
        if (res) {
          yield put({type:"changeAllRole",payload:res.rows})
          yield put({type:"changeRoleTotal",payload:res.total})
        }else{alert('账户异常')}
      },
    },
    reducers: {
        changeAllRole(state: any, action: any) {
            state.allRole = action.payload
            return {
              ...state
            }
          },
          changeRoleTotal(state: any, action: any) {
            state.roleTotal = action.payload
            return {
              ...state
            }
          },
      
    }
}