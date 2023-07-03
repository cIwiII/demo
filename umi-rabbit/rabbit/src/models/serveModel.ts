

import { servicetype} from '@/apis/genApi'
export default {
    state: {
        allServe: [],serveNum:0
    },
    effects: {
        // 获取服务
    *asyncGetServe({payload}:any,{call,put}:any):any{
        const res =yield call(servicetype,payload)
        if (res) {
          yield put({type:"changeAllServe",payload:res.rows.children})
          yield put({type:"changeServeNum",payload:res.total})
        }else{alert('账户异常')}
      },

    },


    reducers: {
        //修改服务
        changeAllServe(state: any, action: any) {
            state.allServe = action.payload
            // console.log('所有菜单信息', action.payload);
            return {
                ...state
            }
        },
        // 服务个数
        changeServeNum(state: any, action: any) {
            state.serveNum = action.payload
            // console.log('所有菜单信息', action.payload);
            return {
                ...state
            }
        },
    }
}