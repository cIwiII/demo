import $api from '../../apis/apis.js'
export default {
	//开启命名空间
	namespaced: true,
	state: {
		swiperData: [],
		catitems: [],
		floors:[],
		recommend:[]
	},
	//同步方法
	mutations: {
		changeSwiper(state, v) {
			state.swiperData = v
		},
		changeCatitems(state, v) {
			state.catitems = v
		},
		changeFloors(state, v) {
			state.floors = v
		},
		changeRecommend(state, v) {
			state.recommend = v
		}
	},
	//异步请求
	actions: {
		async getSwiper(context) {
			const res = await $api.home.swiperData();
			if (res.data.meta.status == 200) {
				context.commit('changeSwiper', res.data.message)
			}
		 // return res.code
		},
		async getCatitems(context) {
			const res = await $api.home.catitems();
			if (res.data.meta.status == 200) {
				context.commit('changeCatitems', res.data.message)
			}
		},
		async getFloors(context) {
			const res = await $api.home.floorsData();
			if (res.data.meta.status == 200) {
				context.commit('changeFloors', res.data.message)
			}
		},
		async getRecommend(context) {
			const res = await $api.home.recommend();
			// console.log('首页请求执行返回',res)
			if (res.data.meta.status == 200) {
				context.commit('changeRecommend', res.data.message)
			}
		},
		//首页点赞
		async likePost(context,id) {
			const userId=uni.getStorageSync('_id')
			if(!userId){
				console.log('未登录')
				return
			}
			const res = await $api.my.mylike({user_id:userId,menu_id:id});
			console.log('点赞执行返回',res)
			if (res.data.code == 1) {
				context.commit('changeRecommend', res.data.message)
			}
		}
	}
}
