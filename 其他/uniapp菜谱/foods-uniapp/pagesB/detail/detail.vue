<template>
	<view id="detail">
		<!-- 1 -->
		<view class="detailHead">
			<view class="detaicon" @click="collect">
				<template v-if="menuBool"><u-icon name="heart-fill" color="#87ff3c" size="25"></u-icon></template>
				<template v-else><u-icon name="heart-fill" color="#969696" size="25"></u-icon></template>
			</view>
			<view class="detaicon">
			<u-icon name="share-fill" color="#0055ff" size="25"></u-icon>
			</view>
		</view>
		<!-- 2-->
		<view class="videoContent">
			<video :src="detailObj.vid" :poster="detailObj.coverpic" objectFit="fill"></video>
		</view>
		<view class="afterVideo">
			<view class="viptit">
				<text>会员低至2元/月，免广告，看10000+名厨视频</text>
			</view>
			<view class="detaName">{{detailObj.name}}</view>
			<view class="disflex">
				<view class="right">{{detailObj.pageview?detailObj.pageview:0}}浏览</view>
				<view>{{detailObj.collections?detailObj.collections:0}}收藏</view>
			</view>
		</view>

		<!-- 3 -->
		<view class="detaH4">
			<view class="h4">心得</view>
			<text>鲷鱼烧是日本的传统小吃，皮外酥里嫩，再加上自己喜欢的馅料，特别好吃。以前在日本每天都吃，现在想吃，.自己动手做，设备材料齐全的话,其实很简单</text>
			<view class="h4">养生必读</view>
			<text>鸡蛋：护眼明目</text>
		</view>
		<!-- 4 -->
		<view class="deta4">
			<view class="tabHed">
				<view>30分钟以上</view>
				<view>切墩(初级)</view>
			</view>
			<view class="tabBody">
				<view class="bodyHead">
					<view>用料</view>
					<view class="headRight">加入采购清单</view>
				</view>
				<view v-for="(v,index) in detailObj.ingredient" :key="index" class="tbody">
					<view class="tLeft">{{v.name}}</view>
					<view class="tRight">{{v.number}}</view>
				</view>
			</view>

			<!-- 步骤 -->
			<view class="detaB">
				<view v-for="(v,index) in detailObj.method" :key="index" class="aDetaB">
					<view>步骤{{index+1}}</view>
					<image :src="v.img" mode="scaleToFill" class="detaBImg"></image>
					<text>{{v.describe}}</text>
				</view>

			</view>
			<!-- 小贴士 -->
			<view class="tips">
				<view class="tip">
					<view>小贴士</view>
					<view v-for="(v,index) in detailObj.tips" :key="index">
						<text v-for="(val,index2) in v.tipdescribe" :key="index2">{{val}}</text>
					</view>
					<view></view>
				</view>

			</view>
			<view class="relatednessText">相关菜谱</view>
			<view class="relatedness">
				<view v-for="(v,index) in array" :key="index" class="aMenu">
					<image :src="v.imgPath" mode="widthFix" class="relaImg"></image>
					<view>{{v.name}}</view>
					<view class="relaInfo">
						<view class="relagk">
							{{v.xl}}
						</view>
						<view class="relagk">
							{{v.sc}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 返回顶部 -->
		<view class="wrap">
				<u-back-top :scroll-top="scrollTop"></u-back-top>
		</view>
	</view>
</template>

<script>
	import {createNamespacedHelpers} from "vuex"
	const {mapActions,mapState} = createNamespacedHelpers('detailModule')
	export default {
		data() {
			return {
				//初始滚动条位置
				scrollTop: 0,
				//最下方推荐
				array: [{
						id: 1,
						imgPath: 'https://www.imgtu.net/i/2022/07/23/62dbad90c98d2.png',
						name: '川味凉粉',
						xl: 20,
						sc: 12
					},
					{
						id: 2,
						imgPath: 'https://www.imgtu.net/i/2022/07/23/62dbad90c98d2.png',
						name: '川味凉粉2',
						xl: 20,
						sc: 12
					},
					{
						id: 3,
						imgPath: 'https://www.imgtu.net/i/2022/07/23/62dbad90c98d2.png',
						name: '川味凉粉3',
						xl: 20,
						sc: 12
					},
					{
						id: 4,
						imgPath: 'https://www.imgtu.net/i/2022/07/23/62dbad90c98d2.png',
						name: '川味凉粉4',
						xl: 20,
						sc: 12
					},
				]
			}
		},
		computed: {
			...mapState(['detailObj','menuBool'])
		},
		methods: {
			...mapActions(['collectTF']),
			collect(){
				this.collectTF();
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		created() {
			//由上一个页面发送请求
			// const obj = {
			// 	_id: '601fa488882000007800670c'
			// }
			// this.getAMenuObj(obj);
		}
	}
</script>

<style lang="scss" scoped>
	#detail {
		background-color: #bfbfbf;

		view {
			background-color: #fff;
		}

		.detailHead {
			display: flex;
			justify-content: start;
			background-color: $themeColor;
			height: 55rpx;
			padding-left: 580rpx;
			border-top: 1rpx solid #fff;
			.detaicon{
				width: 50rpx;
				height: 50rpx;
				padding: 0 10rpx;
				background-color: $themeColor;
			}
		}

		.videoContent {
			video {
				width: 750rpx;
				height: 386rpx;
			}
		}

		.afterVideo {
			padding: 32rpx;
			margin-bottom: 20rpx;

			.viptit {
				padding: 30rpx;
				color: #fff;
				font-size: 28rpx;
				background-image: linear-gradient(270deg,
						#e7b564 0%,
						#f0c379 49%,
						#e7b564 100%);
				border-radius: 16rpx;

				text {
					text-align: center;
					width: 580rpx;
					height: 32rpx;
				}
			}

			.detaName {
				padding: 50rpx 0;
				text-align: center;
				font-size: 40rpx;
			}

			.disflex {
				display: flex;
				justify-content: center;
				font-size: 32rpx;
				color: #aaaaaa;
				.right {
					margin-right: 40rpx;
				}
			}
		}

		.detaH4 {
			padding: 20rpx 32rpx;
			margin-bottom: 20rpx;

			.h4 {
				margin-bottom: 20rpx;
				margin-top: 40rpx;
				font-weight: 600;
			}

			text {
				
				font-size: 28rpx
			}
		}

		.deta4 {
			padding: 32rpx;

			.tabHed {
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.tabBody {
				.bodyHead {
					display: flex;
					justify-content: space-between;

					.headRight {
						color: $themeColor;
					}
				}

				.tbody {
					display: flex;
					text-align: left;
					padding: 30rpx 0;
					border-bottom: 2rpx solid #a2a2a2;

					.tLeft {
						width: 400rpx;
					}

					.tRight {
						width: 300rpx;
					}
				}
			}

			.detaB {
				padding: 40rpx 0;
				border-bottom: 2rpx solid #bfbfbf;

				.aDetaB {
					margin-bottom: 40rpx;

					.detaBImg {
						width: 688rpx;
						height: 440rpx;
						margin: 20rpx 0;
						border-radius: 8rpx;
					}
				}
			}

			.tips {
				padding: 30rpx 0;

				.tip {
					background-color: #eaeaea;
					padding: 30rpx 40rpx;
					border-radius: 6rpx;
					view{
						background-color: #eaeaea;
						letter-spacing: 2rpx;
					}
				}
			}

			.relatednessText {
				margin-top: 20rpx;
			}

			.relatedness {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.aMenu {
					margin: 10rpx 0;

					.relaImg {
						margin: 20rpx 0 10rpx;
						width: 334rpx;
						height: 248rpx;
					}

					.relaInfo {
						display: flex;
						font-size: 22rpx;
						color: #aaaaaa;

						.relagk {
							width: 167rpx;
						}
					}
				}
			}
		}
	}
</style>
