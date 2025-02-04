import {Message} from 'element-ui'
//身份认证
import $http from '@/request/http'

export default {
    namespaced:true,
    state: {
        allVip:[]
    },
    getters: {
    },
    mutations: {
        changeAllVip(state,v){
            state.allVip=v
        }
    },
    actions: {
        async getAllVip(context){
            const res=await $http.vip.getAllVip();
            console.log('所有vip返回',res)
            if(res.data.meta.status==200){
                context.commit('changeAllVip',res.data.data)
            }

        },
        async deleVip(context,_id){
            //可选。默认{pageSize=12,currentPage=1,val=''}
            const res=await $http.vip.deleVip(_id);
            console.log('删除会员返回',res)
            return res
        },
        async ToVip(context,obj){
            //{_id,date}
            const res=await $http.vip.ToVip(obj);
            console.log('充值会员返回',res)
            return res
        },
        async cancleVip(context,_id){
            const res=await $http.vip.cancleMember(_id);
            console.log('取消会员返回',res)
            return res
        },
        
    },
    modules: {
     
    }
  }