/**
 * 这个userModel专门用于管理user的数据
 */
import { getAllUser } from "../apis/user";
interface IParams {
    payload: {}
}
interface IState {
    count: number,
    users: {}
}
const state: IState = {
    count: 10,
    users: []
}
export default {
    // user模块的状态机数据
    state: state,
    // 处理异步请求
    effects: {
        // 名字无所谓redux-saga
        // 这个语法是generator代码
        *getAllUserSaga({ payload }: IParams, { call, put }: any): any {
            // 发送异步请求
            console.log(payload);
            // 默认只能传递一个参数,如果多个参数,封装为对象传递过去
            const res = yield call(getAllUser, payload)
            console.log(res);
            // 继续将结果派发给reducer更新数据put就是在执行dispacth
            // 等待结果,put方法底层默认调用disptach派发请求
            yield put({ type: "initUser", payload: res.data.data })
        }
    },
    // 存放我们reducer代码
    reducers: {
        // reducers里面每个函数其实就是以前case
        initState(state: any, action: any) {
            state.count = action.payload
            console.log(action.payload);
            return {
                ...state
            }
        },
        incrementRC(state: any, action: any) {
            state.count++
            return {
                ...state
            }
        },
        initUser(state: any, action: any) {
            state.users = action.payload
            return {
                ...state
            }
        }
    }
}