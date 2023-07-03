

import { getChargeApply} from '@/apis/genApi'
export default {
    state: {
        allChargeApply: [],chargeTotal:0
    },
    effects: {
        // 获取所有店铺审核
    *asyncGetChargeApply({payload}:any,{call,put}:any):any{
        console.log(12222);
        
        const res = yield call(getChargeApply,payload)
        if (res) {
          yield put({type:"changeAllChargeApply",payload:res.rows})
          yield put({type:"changeChargeTotal",payload:res.total})
        }else{alert('账户异常')}
      },
    },
    reducers: {
        //
        changeAllChargeApply(state: any, action: any) {
            state.allChargeApply = action.payload
            // console.log('所有菜单信息', action.payload);
            return {
                ...state
            }
        },
        changeChargeTotal(state: any, action: any) {
            state.chargeTotal = action.payload
            // console.log('所有菜单信息', action.payload);
            return {
                ...state
            }
        },
    }
}