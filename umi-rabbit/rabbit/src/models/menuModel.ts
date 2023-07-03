

import { getMenu,addMenu} from '@/apis/menuApi'
export default {
    state: {
        allMenu: []
    },
    effects: {
        // 获取菜单
    *asyncGetMenu({payload}:any,{call,put}:any):any{
        const res = yield call(getMenu,payload)
        if (res) {
          yield put({type:"changeAllMenu",payload:res.rows.children})
        }else{alert('账户异常')}
      },
    },
    reducers: {
        //所有菜单
        changeAllMenu(state: any, action: any) {
            state.allMenu = action.payload
            // console.log('所有菜单信息', action.payload);
            return {
                ...state
            }
        },

    }
}