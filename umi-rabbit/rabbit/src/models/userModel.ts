/**
 * 这个userModel专门用于管理user的数据
 */
import { authMenu } from '../apis/menuApi'
import { getUserData,getDept} from "@/apis/userApi"
import { getAllRole } from "@/apis/roleApi"
import { message } from 'antd';
export default {
  state: {
    userInfo: {}, userMenu: [], userTotal: 1, dept: [], allRole: []
  },
  effects: {

    //获取用户权限菜单
    *getUserAuth({ payload }: any, { call, put }: any): any {
      const username: string | null = localStorage.getItem('username')
      const res = yield call(authMenu, username)
      if (res) {
        yield put({ type: "getUserMenu", payload: res[0].children })
      } else {
        alert('当前账号获取菜单异常')
      }
    },
    // 
    *getUser({ payload }: any, { call, put }: any): any {
      const res = yield call(getUserData, payload)
      if (res.rows) {
        yield put({ type: "changeAllUser", payload: res.rows })
        yield put({ type: "changeUserTotal", payload: res.total })
      } else {
        alert('当前账号获取用户列表异常')
      }
    },
    *asyncGetDept({ payload }: any, { call, put }: any): any {
      const res = yield call(getDept)
      console.log('dept', res)
      if (res.rows) {
        // message.success('添加成功')
        yield put({ type: "changeDept", payload: res.rows.children })
      } else {
        alert('当前账号异常')
      }
    },
    *asyncGetRole({ payload }: any, { call, put }: any): any {
      const res = yield call(getAllRole)
      if (res) {
        yield put({ type: "changeAllRole", payload: res.rows })
      } else { alert('账户异常') }
    },
   
  },
  reducers: {
    // 登录
    getUserInfo(state: any, action: any) {
      state.userInfo = action.payload
      // console.log('用户登录信息', action.payload);
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('username', action.payload.user.username)
      localStorage.setItem('userimg', action.payload.user.avatar)
      return {
        ...state
      }
    },

    getUserMenu(state: any, action: any) {
      state.userMenu = action.payload
      // console.log('所有菜单信息', action.payload);
      return {
        ...state
      }
    },
    changeAllUser(state: any, action: any) {
      state.allUser = action.payload
      return {
        ...state
      }
    },
    changeUserTotal(state: any, action: any) {
      state.userTotal = action.payload
      return {
        ...state
      }
    },
    changeDept(state: any, action: any) {
      state.dept = action.payload
      return {
        ...state
      }
    },
    changeAllRole(state: any, action: any) {
      state.allRole = action.payload
      return {
        ...state
      }
    },
  }
}
