import $api from '../../apis/apis.js'
export default {
	//开启命名空间
	namespaced: true,
	state: {
		token: '',status:false,//是否登录

		userInfo:{
			//未登录默认头像,搜搜页有有用到是否是会员
			avatarUrl: "https://www.imgtu.net/i/2022/07/27/62e0168162840.png",
			gender: "1",
			mycollect: [],
			mylike: [],
			nickName: "",
			openid: "",
			province: "",
			record: [],
			state: 0,
			vipdate: "",
			_id: "62e0ed37aca6a21944d4ce6c"
		},
		//套餐数组
		mealArr:[],
		//所有收藏
		allCollectArr:[],
		//所有浏览记录
		allRecordArr:[],
		//所有点赞
		allLikeArr:[],
	},
	//同步方法
	mutations: {
		changeToken(state, v) {
			state.token = v
		},
		changeStatus(state, v) {
			state.status = v
		},
		changeUserInfo(state, v) {
			state.userInfo = v
			state.status = true
		},
		changeMealArr(state, v) {
			state.mealArr = v
		},
		changeAllCollect(state, v) {
			state.allCollectArr = v
		},
		changeAllRecordArr(state, v) {
			state.allRecordArr = v
		},
		changeAllLikeArr(state, v) {
			state.allLikeArr = v
		},
	},
	//异步请求
	actions: {
		//登录
		async userProfile(context) {
			//111111获取用户信息
			const userInfoPromise =new Promise((resolve, reject) => {
				//内置方法
				uni.getUserProfile({
					desc:"获取信息用户身份认证",
					success:(res)=>{
						resolve(res.userInfo)
					},
					fail(error){
						reject(error)
					}
				})
			})
			const userInfo =await userInfoPromise
			console.log(userInfo);
			console.log('信息')
			//222222获取code
			const loginPromise = new Promise((resolve, reject) => {
				uni.login({
					success: (result) => {
						resolve(result.code)
					}
				});
			})//end
			const code = await loginPromise
			console.log('返回code',code);
		
			//33333333333用code获取token存储
			const res = await $api.user.wxLogin({
				code:code,
				appId:'wx8af0d772136f1e01',
				appSecret: '5f646a6c12de7c01a343b566bc2f75e1'
			});
			if (res.statusCode == 200) {
				context.commit('changeToken', res.data.token);
				uni.setStorageSync("token", res.data.token);
				context.commit('changeStatus', true);
				//4444444444信息更新到后端
				let newobj=userInfo
				newobj.token=res.data.token
				const resq = await $api.user.auth(newobj,res.data.token);
				console.log(resq.data)
			}else{
				console.log('登陆失败')
			}
			return true
		},
		//使用token，获取用户信息
		async getUserInfo(context) {
			const res = await $api.user.getUserInfo(context.state.token);
			if (res.statusCode== 200) {
				context.commit('changeUserInfo',res.data[0])
				uni.setStorageSync("_id", res.data[0]._id);
			}else{
				console.log('token身份过期');
			}
			return true
		},
		//获取套餐
		async getMeal(context) {
			const res = await $api.my.topupList();
			console.log('getvip',res);
			if (res.data.meta.status== 200) {
				context.commit('changeMealArr',res.data.data)
			}
		},
		//会员开通
		async openVip(context,date) {
			const id=context.state.userInfo._id
			const res = await $api.my.openVip(id,date);
			console.log('openvip',res);
			if (res.statusCode== 200) {
				let newObj=context.state.userInfo
				newObj.vip=true
				context.commit('changeUserInfo',newObj)
			}
			console.log('开通会员后用户信息',context.state.userInfo);
			return true
		},
		//所有收藏
		async getAllCollect(context) {
			const res = await $api.my.getcollect(uni.getStorageSync('_id'));
			console.log('所有收藏返回',res);
			if (res.data.meta.status==200) {
				context.commit('changeAllCollect',res.data.mycollect)
			}
		},
		//所有浏览记录
		async getAllRecord(context) {
			const res = await $api.my.getrecord(uni.getStorageSync('_id'));
			// console.log('所有浏览记录返回',res);
			if (res.data.meta.status==200) {
				context.commit('changeAllRecordArr',res.data.record)
				return res.data.record
			}
			return null
		},
		//所有点赞
		async getAllLike(context) {
			const res = await $api.my.getmylike(uni.getStorageSync('_id'));
			console.log('所有点赞返回',res);
			if (res.data.meta.status==200) {
				context.commit('changeAllLikeArr',res.data.mylike)
				return res.data.mylike
			}
			return null
		},
	}
}
