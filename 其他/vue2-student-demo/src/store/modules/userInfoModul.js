
//身份认证
import $http from '@/request/http'

export default {
    namespaced:true,
    state:{
        userInfo:{
            auth:0,username:''
        }
    },
    mutations:{
        changeUserInfo(state,userInfo){
                state.userInfo=userInfo
                console.log('info赋值',state.userInfo)
        }
    },
    actions:{
        async getUserInfo(context,state){
            const res = await $http.user.getUserInfo()
            if(res.code==1){
                let {auth,username}=res.data
                context.commit('changeUserInfo',{auth,username})
                console.log('info赋值',state.userInfo)
            }
            
            return res.code
        }
    }
}