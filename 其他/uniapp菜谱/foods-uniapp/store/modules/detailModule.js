import $api from '../../apis/apis.js'
export default {
	//开启命名空间
	namespaced:true,
	state:{
		detailObj:{},
		//详情页面该菜品是否被收藏
		menuBool:false,
		//情页面该菜品id
		menuId:null,
	},
	//同步方法
	mutations:{
		changeDatail(state,obj){
			state.detailObj=obj
		},
		changeMenuBool(state,v){
			state.menuBool=v
		},
		changeMenuId(state,v){
			state.menuId=v
		}
	},
	//异步请求
	actions:{
		//获取详情页对象和判断是否被收藏 ,浏览记录添加
		async getAMenuObj(context,id){
			const user_id=uni.getStorageSync('_id');
			const menu_id=id;
			//所有收藏获取,添加浏览记录
			const req2=$api.my.getcollect(user_id);
			const req3=$api.my.record({user_id,menu_id})
			//获取一个详情对象
			const res = await $api.search.menuDetail(menu_id);
			// console.log('详情',res)
			if (res.data.meta.status != 200){return};
			context.commit('changeDatail', res.data.message[0])
			context.commit('changeMenuId',id)
			
			const ida=res.data.message[0]._id
			//获取所有收藏
			const res2=await req2;
			//成功获取后再添加浏览
			const res3=await req3;
			console.log('添加浏览返回',res3)
			if(res3.data.code=1){console.log('浏览记录添加成功')}
			if(res2.data.meta.status!=200){return};
			// console.log('所有收藏',res2)
			const index=res2.data.mycollect.findIndex(v=>v._id==ida);
			//是否被收藏
			if(index==-1){
				context.commit('changeMenuBool',false)
				return
			}
			context.commit('changeMenuBool',true)
			console.log('changeMenuBool执行')
		},
		//添加或移除收藏
		async collectTF(context){
			const user_id=uni.getStorageSync('_id');
			const menu_id=context.state.menuId;
			if(!user_id){
				console.log('未登录')
				return
			}
			const res=await $api.my.collect({user_id,menu_id})
			console.log('收藏',res)
			if (res.data.code == 1){  //添加收藏
				context.commit('changeMenuBool',true)
			}else if(res.data.code == 0){  //移除收藏
				context.commit('changeMenuBool',false)
			};
		},
		
	}
	
}