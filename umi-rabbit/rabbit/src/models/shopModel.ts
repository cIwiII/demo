

import { getShopsApply, findShopMS } from '@/apis/genApi'
export default {
    state: {
        allShopCharge: [],shopChargeTotal:0,shopTotal:0 ,allShop: []
    },
    effects: {
        // 获取所有店铺审核
        *asyncGetShopApply({ payload }: any, { call, put }: any): any {
            console.log('店铺审核');
            
            const res = yield call(getShopsApply,payload)
            if (res) {
                yield put({ type: "changeAllShop", payload: res.rows })
                yield put({ type: "changeShopTotal", payload: res.total })
            } else { alert('账户异常') }
        },
        // 获取所有店铺和电桩
        *asyncGetShopCharge({ payload }: any, { call, put }: any): any {
            const res = yield call(findShopMS,payload)
            if (res) {
                yield put({ type: "changeAllShopCharge", payload: res.rows })
                yield put({ type: "changeShopChargeTotal", payload: res.total })
            } else { alert('账户异常') }
        },

    },

    reducers: {
        //
        changeAllShop(state: any, action: any) {
            state.allShop = action.payload
            return {
                ...state
            }
        },
        changeShopTotal(state: any, action: any) {
            state.shopTotal = action.payload
            return {
                ...state
            }
        },
        changeAllShopCharge(state: any, action: any) {
            state.allShopCharge= action.payload
            return {
                ...state
            }
        },
        changeShopChargeTotal(state: any, action: any) {
            state.shopChargeTotal = action.payload
            return {
                ...state
            }
        },
       
    }
}