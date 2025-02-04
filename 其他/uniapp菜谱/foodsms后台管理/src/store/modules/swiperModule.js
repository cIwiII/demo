import {Message} from 'element-ui'
//身份认证
import $http from '@/request/http'

export default {
    namespaced:true,
    state: {
        allSwiper:[],allMenu:[],
        //修改对象
        putSwiperObj:{},
        //搜索操作更新数据时
        searchVal:''
    },
    getters: {
    },
    mutations: {
        changeAllSwiper(state,v){
            state.allSwiper=v
        },
        changeAllMenu(state,v){
            state.allMenu=v
        },
        changePutSwiperObj(state,v){
            state.putSwiperObj=v
        },
        changeSearchVal(state,v){
            state.searchVal=v
        }
    },
    actions: {
        async getAllSwiper(context){
            if(context.state.searchVal.length!=0){
                context.dispatch('findSwiper',context.state.searchVal)
            }else{
                const res=await $http.swiper.getAllSwiper();
                console.log('所有轮播返回',res)
                if(res.data.meta.status==200){
                    context.commit('changeAllSwiper',res.data.message)
                }
            }
        },
        //获取所有商品,n是否是搜索状态
        async getAllMenu(context,n){
            // 参数obj可选{pageSize=12,currentPage=1}
            let obj={pageSize:100,currentPage:1}
            const res=await $http.menu.getAllMenu(obj);
            console.log('所有菜谱商品返回',res)
            if(res.data.meta.status==200){
                context.commit('changeAllMenu',res.data.menus)
            }
        },
        //获取图片上传后的地址
        async addSwiperFile(context,imgSrc){
            const res=await $http.swiper.addSwiperFile(imgSrc);
            console.log(res)
        },
        async deleSwiperFile(context,fileName){
            //上传后返回的名字
            const res=await $http.swiper.deleSwiperFile(fileName);
            console.log(res)
            
        },
        async addSwiper(context,obj){
            console.log('添加轮播对象',obj)
            //{goods_id,image_src,navigator_url,open_type}
            const res=await $http.swiper.addSwiper(obj);
            console.log('添加轮播图返回',res)
            return res
        },
        //下架
        async updateSwiperShow(context,_id){
            const res=await $http.swiper.updateSwiperShow(_id);
            console.log(res)
            return res
        },
        async deleSwiper(context,_id){
            console.log(_id)
            const res=await $http.swiper.deleSwiper(_id);
            console.log('删除轮播图返回',res)
            return res
        },
        //查询
        async findSwiper(context,_id){
            if(context.state.searchVal.length!=0){
                const res=await $http.swiper.findSwiper(_id);
                console.log('查询返回',res)
                if(res.data.code==200){
                    context.commit('changeAllSwiper',[res.data.data])
                }else{
                    alert('该轮播对象不存在')
                }
            }else{
                context.dispatch('getAllSwiper')
            }
            
            
        },
        //修改
        async updateSwiper(context,obj){
            //{_id,goods_id,image_src}
            const res=await $http.swiper.updateSwiper(obj);
            console.log('修改轮播返回',res)
            return res
        },

    },
    modules: {
     
    }
  }