import $api from '../../apis/apis.js'
export default {
	//开启命名空间
	namespaced:true,
	state:{
		member:[],randArr:[],
		//分类页面数据和选中的索引，默认0
		categoryArr:[],cateIndex:0
	},
	//同步方法
	mutations:{
		changeMember(state,v){
			state.member=v
		},
		changeRandArr(state,v){
			state.randArr=v
		},
		changeCategoryArr(state,v){
			state.categoryArr=v
		},
		changeCateIndex(state,v){
			state.cateIndex=v
		}
	},
	//异步请求(前两个是搜索页面，后一个是分类页面)
	actions:{
		async getMember(context) {
			const res = await $api.search.memberRecommend();
			// console.log('执行',res)
			if (res.data.meta.status == 200) {
				context.commit('changeMember', res.data.message)
				// console.log('ok')
			}
		},
		async getRandArr(context) {
			const res = await $api.search.memberRecommend();
			// console.log('执行',res)
			if (res.data.meta.status == 200) {
				context.commit('changeRandArr', res.data.message)
				// console.log('ok')
			}
		},
		//分页请求
		async getCateData(context) {
			const res = await $api.categories.categories();
			// console.log('执行',res)
			if (res.data.meta.status == 200) {
				context.commit('changeCategoryArr', res.data.message)
				// console.log('ok')
			}
		},
		
	}
	
}