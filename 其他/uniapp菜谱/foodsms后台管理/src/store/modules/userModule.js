import {Message} from 'element-ui'
//身份认证
import $http from '@/request/http'

export default {
    namespaced:true,
    state:{
        userInfo:{
            // auth:0,username:''
        },
        allUser:[],
        // allUserTh:[
        //     {id:1,th:'用户编号',td:"_id",width:"180"},
        //     {id:2,th:'用户名',td:"account",width:"180"},
        //     {id:3,th:'真实名',td:"realname",width:"180"},
        //     {id:4,th:'联系方式',td:"telephone",width:"180"},
        //     {id:5,th:'操作',td:"添加",width:"180"},
        //  ]
    },
    mutations:{
        changeUserInfo(state,v){
            state.userInfo=v
        },
        changeAllUser(state,v){
            state.allUser=v
        }
    },
   

    actions:{
         //登陆请求
        async login(context,obj){
            console.log("登陆");
            //管理员账号{account,password}
            const res=await $http.user.login(obj);
            if(res.data.code!=200){
               Message.error('登陆失败，账号或密码有误')
               return false
            }
            // console.log('登陆成功返回',res)
            Message.success('登录成功');
            sessionStorage.setItem('token', res.data.token);
            return true
        },
        //获取用户信息
        async getUserInfo(context){
            const res = await $http.user.getUserInfo()
            if(res.data.code==1){
                context.commit('changeUserInfo',res.data.userInfo);
                //常用信息存储
                sessionStorage.setItem('realname',res.data.userInfo.realname);

                console.log('用户信息已更为',res.data.userInfo)
                return true
            }
            // {
            //     "code": 1,
            //     "userInfo": {
            //         "_id": "61132f3ab30c00004d003602",
            //         "account": "zhangsan",
            //         "password": "123456",
            //         "realname": "张三疯",
            //         "status": 1,
            //         "telephone": "13324567899"
            //     },
            //     "message": "获取用户信息成功"
            // }
            return false
        },
        async getAllUser(context){
            const res=await $http.user.getAllUser();
            console.log('所有用户',res)
            if(res.data.code==200){
                context.commit('changeAllUser',res.data.message)
            }
        },
        async addAdmin(context,obj){
            //{account,password,realname,telephone}
            const res=await $http.user.addAdmin(obj);
            console.log('添加返回',res)
            if(res.data.code==200){
                alert('添加成功')
            }
            else{
                alert('账户异常')
            }
            return res

        },
        async deleAdmin(context,_id){
            const res=await $http.user.deleAdmin(_id);
            console.log('删除返回',res)
                return res
        },
    }
}