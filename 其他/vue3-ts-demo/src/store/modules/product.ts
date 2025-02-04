import { Module } from "vuex"
// Module 这个模块专门提供用于约束子模块
import {IRootState} from "../../types/MainStore"
// 编写一个接口，约束state
interface IUser {
    username:string
}
// interface IRoot {

// }
// 两个泛型：约束子仓库state，ROOT主仓库完整约束
const product:Module<IUser,IRootState> = {
    namespaced:true,
    state: {
        username:"xiaowang",
    },
    getters: {},
    mutations: {
        changeUsername(state,payload){
            state.username = payload
        }
    },
    actions: {
        asyncChangeUsername(context,payload){
            setTimeout(() => {
                context.commit("changeUsername",payload)
            }, 1000);
        }
    },
}
export default product