import $api from '../../apis/apis.js'
export default {
	//开启命名空间
	namespaced:true,
	state:{
		recommendArr:[],freeMenuArr:[],likeArr:[]
	},
	//同步方法
	mutations:{
		changeRecommendArr(state, v) {
			state.recommendArr = v
		},
		changeFreeMenuArr(state, v) {
			state.freeMenuArr = v
		},
		changeLikeArr(state, v) {
			state.likeArr = v
		}
	},
	//异步请求
	actions:{
		async getRecommendArr(context) {
			const res = await $api.vip.getRecommendMenuList();
			console.log('推荐',res);
			if (res.data.meta.status == 200) {
				context.commit('changeRecommendArr', res.data.menus)
			}
		},
		async getFreeMenuArr(context) {
			const res = await $api.vip.getisFreeMenuList();
			console.log('限免',res);
			if (res.data.meta.status == 200) {
				context.commit('changeFreeMenuArr', res.data.menus)
			}
		},
		//vip页面猜你喜欢
		async getLikeArr(context) {
			const res = await $api.vip.likeMenu();
			console.log('喜欢',res);
			if (res.data.meta.status == 200) {
				context.commit('changeLikeArr', res.data.menus)
			}
		},
	}
	
}