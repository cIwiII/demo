import {Message} from 'element-ui'
//身份认证
import $http from '@/request/http'

export default {
    namespaced:true,
    state: {
        allMeal:[],
        //点击修改的对象
        putMealObj: {}
    },
    getters: {
    },
    mutations: {
        changeAllMeal(state,v){
            state.allMeal=v
        },
        changePutMealObj(state,v){
            state.putMealObj=v
        }
    },
    actions: {
        async getAllMeal(context){
            const res=await $http.meal.getAllMeal();
            console.log('所有套餐返回',res);
            if(res.data.meta.status==200){
                context.commit('changeAllMeal',res.data.data)
            }
        },
        async updateMeal(context,obj){
            //{_id,mouth,salePrice,normalPrice,type,name}
            const res=await $http.meal.updateMeal(obj);
            console.log('套餐修改返回',res)
            if(res.data.meta.status==200){
                context.commit('changePutMealObj',{})
                Message.success('修改成功')
            }
            return res
        },
        async addMeal(context,obj){
            //{mouth,salePrice,normalPrice,type,name}
            const res=await $http.meal.addMeal(obj);
            console.log('添加套餐返回',res)
            return res
        },
        async deleMeal(context,_id){
            const res=await $http.meal.deleMeal(_id);
            console.log('套餐删除返回',res)
            return res
        }
    },
    modules: {
     
    }
  }