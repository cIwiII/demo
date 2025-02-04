import {createStore} from "vuex"
import {IRootState} from "../types/MainStore"
import productModel from "./modules/product"
const store = createStore<IRootState>({
    state:{
        username:"xiaowang",
        users:[
            {id:1,name:"xiaofeiei"}
        ],
        count:10
    },
    getters:{

    },
    mutations:{
        increment(state,payload){
            state.count += payload
        },
        decrement(state,payload){
            state.count -= payload
        }
    },
    actions:{
        asyncIncrement(context,payload){
            setTimeout(() => {
                context.commit('increment',payload)
            }, 1000);
        }
    },
    modules:{
        productModel
    }
})

export default store