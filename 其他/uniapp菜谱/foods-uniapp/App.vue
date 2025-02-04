<script>
	import { createNamespacedHelpers } from "vuex"
	const {mapActions,mapState,mapMutations} = createNamespacedHelpers('userModule')
	export default {
		onLaunch: function() {
			console.log('App Launch函数执行')
			const token=uni.getStorageSync('token')
			uni.request({
				url: 'http://127.0.0.1:4001/user/getUserInfo',
				method: "GET",
				data:{token},
				header: { 
					'Authorization':token 
				},
				success: (result) => {
					console.log(result);
					if (result.data) {
						this.changeUserInfo(result.data[0])
					}else{
						// uni.removeStorageSync('token')
						uni.clearStorageSync()
					}
				},
				fail: (error) => {
					console.log(error);
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			...mapMutations(['changeUserInfo'])
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
</style>
