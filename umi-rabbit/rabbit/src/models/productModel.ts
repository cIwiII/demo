import { shopCate, getAllShop } from '@/apis/genApi';
export default {
  state: {
    allShopCate: [],
    allShop: [],
  },
  effects: {
    // 分类获取
    *asyncGetCate({ payload }: any, { call, put }: any): any {
      const res = yield call(shopCate);
      if (res) {
        yield put({ type: 'changeAllShopCate', payload: res.rows.children });
      } else {
        alert('账户异常');
      }
    },
    // 商品获取
    *asyncGetShop({ payload }: any, { call, put }: any): any {
      const res = yield call(getAllShop, payload);
      if (res) {
        yield put({ type: 'changeAllShop', payload: res.rows });
      } else {
        alert('账户异常');
      }
    },
  },
  reducers: {
    //分类
    changeAllShopCate(state: any, action: any) {
      state.allShopCate = action.payload;
      return {
        ...state,
      };
    },
    //商品
    changeAllShop(state: any, action: any) {
      state.allShop = action.payload;
      return {
        ...state,
      };
    },
  },
};
