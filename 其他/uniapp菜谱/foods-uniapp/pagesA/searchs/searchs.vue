<template>
	<view id="search">
		<!-- 搜索 -->
		<view class="searcho">
			<!-- 搜索框 -->
			<input class="searcht" type="text" placeholder="请输入你想要的内容" value="甜点" /><text>搜索</text>
		</view>
		<!-- 水平滑动模块 -->
		<view class="rotation">
			<view class="roTitle">精品名厨视频-会员专享</view>
			<scroll-view scroll-x="true" class="scrollx">
				<view class="aModule" v-for="v in member" :key="v._id">
					<view class="viOverly1" :class="{viOverly2:userInfo.vip}" @click="openvip" >会员随心看(点击去开通)</view>
					<video :src="v.vid" class="video" :poster="v.coverpic" objectFit="fill"></video>
					
					<viwe class="title">{{v.name}}</viwe>
					<view class="disflex">
						<view class="xl">
							<view>{{v.pageview}}</view>
							<image src="@/static/view.png" mode="scaleToFill">
							</image>
						</view>
						<view class="xl" @click="addLike(v_id)">
							<view>{{v.collections}}</view>
							<image src="@/static/star_filled.png"
								mode="scaleToFill"></image>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 垂直滚动模块 -->
		<scroll-view scroll-y="true" class="scrolly">
				<navigator url="/pagesB/detail/detail" class="scrollItem" v-for="v in randArr" :key="v._id" @click="goDetail(v._id)">
				<image :src="v.coverpic" mode=""></image>
				<view class="info">
					<view class="titley">{{v.name}}</view>
					<view class="materials">鸡蛋、低筋面粉、玉米淀粉...</view>
					<view class="disflex">
						<view class="xl">
							<view>{{v.pageview}}</view>
							<image src="@/static/view.png" mode="scaleToFill">
							</image>
						</view>
						<view class="xl" @click="addLike(v_id)">
							<view>{{v.collections}}</view>
							<image src="@/static/star_filled.png"
								mode="scaleToFill"></image>
						</view>
					</view>
				</view>
				</navigator>
			
		</scroll-view>
		<!-- 返回顶部 -->
		<view class="wrap">
				<u-back-top :scroll-top="scrollTop"></u-back-top>
		</view>
	</view>
</template>

<script>
	import {createNamespacedHelpers} from "vuex"
	const {mapActions,mapState} = createNamespacedHelpers('categoryModule')
	const {mapActions:detailActions,mapMutations:detailMutations} = createNamespacedHelpers('detailModule')
	const {mapState:userState} = createNamespacedHelpers('userModule')
	const {mapActions:homeActions} = createNamespacedHelpers('homeModule')
	export default {
		data() {
			return {
				//初始滚动条位置
				scrollTop: 0,
				obj: {
					pageSize: 12,
					currentPage: 1,
					val: ''
				},
				
			};
		},
		computed: {
			...mapState(['member', 'randArr']),
			...userState(['userInfo'])
		},
		methods: {
			...mapActions(['getMember', 'getRandArr']),
			...detailActions(['getAMenuObj']),
			...detailMutations(['changeMenuId']),
			...homeActions(['likePost']),
			goDetail(id){
				//详情页请求
				this.getAMenuObj(id)
			},
			addLike(id){
				console.log('点击执行');
				this.likePost(id)
			},
			openvip(){
				uni.navigateTo({
					url: '/pagesB/openvip/openvip'
				});
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		created() {
			this.getMember();
			this.getRandArr();
		}
	}
</script>

<style lang="scss" scoped>
	#search {
		.searcho {
			background-color: $themeColor;
			padding-bottom: 30rpx;
			margin-bottom: 20rpx;
			display: flex;
			justify-content: center;

			.searcht {
				width: 540rpx;
				height: 60rpx;
				background-color: #ffffff;
				border-radius: 16rpx;
			}
		}

		.rotation {
			margin-left: 20rpx;
			margin-bottom: 40rpx;

			.roTitle {
				font-weight: 600;
				font-size: 40rpx;
			}

			.scrollx {
				margin-top: 20rpx;
				width: 730rpx;
				height: 324rpx;
				white-space: nowrap;

				.aModule {
					display: inline-block;
					width: 316rpx;
					height: 324rpx;
					background-color: #f9f9f9;
					margin-right: 20rpx;
					position: relative;
					.video {
						width: 316rpx;
						height: 220rpx;
					}
					.viOverly1{
						position: absolute;
						width: 316rpx;
						height: 220rpx;
						line-height: 220rpx;
						text-align: center;
						color: #ffffff;
						font-size: 30rpx;
						font-weight: 500;
						background-color:rgba(49,49,49,0.4);
						z-index: 2;
					}
					.viOverly2{
						z-index: -2;
					}
					.title {
						display: block;
						padding-left: 20rpx;
					}

					.disflex {
						padding-left: 20rpx;
						display: flex;
						
						// display: flex;
						font-size: 20rpx;
						
						.xl {
							width: 150rpx;
							display: flex;
						
							image {
								margin-left: 20rpx;
								width: 32rpx;
								height: 32rpx;
							}
						}
					}
				}
			}
		}

		.scrolly {
			margin-left: 20rpx;

			.scrollItem {
				margin-bottom: 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				image {
					width: 314rpx;
					height: 210rpx;
					border-radius: 16rpx;
				}

				.info {
					width: 350rpx;
					margin-right: 30rpx;
					padding-right: 20rpx;
					.titley {
						width: 196rpx;
						height: 40rpx;
						font-size: 28rpx;
						font-weight: normal;
						font-stretch: normal;
						line-height: 40rpx;
						letter-spacing: 0rpx;
						color: #3a3a3a;
					}
					.materials{
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 26rpx;
						color: #3a3a3a;
					}
					.disflex {
						display: flex;
						margin-top: 50rpx;
						font-size: 20rpx;
						.xl {
							width: 150rpx;
							display: flex;
							image {
								margin-left: 20rpx;
								width: 32rpx;
								height: 32rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
