<template>
	<view id="openvip">
		<!-- 底部白色 -->
		<view class="fixff"></view>
		<!-- 顶部下层背景 -->
		<view class="fixed">
		</view>
		<!-- 0 -->
		<view class="open0">
			<view class="group">
				<u-avatar-group :urls="urls" size="20" gap="0.4">
				</u-avatar-group>
				<view>5593人已开通会员</view>
			</view>
			<view class="colorT">购买查询</view>
		</view>
		<!-- 1 -->
		<view class="open1">
			<view class="vipLogin">
				<image class="img"
					src="https://www.imgtu.net/i/2022/07/28/62e1f213317b6.png">
				</image>
			</view>
			<view class="disMeal">
				<view :class="{'active':payMouth==v.mouth}"
					v-for="v in mealArr" :key="v._id" class="mealItem" @click="payMouth=v.mouth">
					<view class="rele" v-if="v.type">推荐</view>
					<view class="strong">{{v.name}}</view>
					<view class="small">({{v.mouth}}个月)</view>
					<view class="colo"><span class="mon">￥</span>{{v.salePrice}}</view>
					<view class="dele">￥{{v.normalPrice}}</view>
				</view>
			
			</view>
			<view class="disflex">
				<view class="gx">恭喜</view>
				<view class="hint">您获得2折开通会员特权！</view>
			</view>
			<view class="openk" @click="openPop">立即开通</view>
		</view>
		<!-- 2 -->
		<view class="open2">
			<view class="strong">VIP特权</view>
			<view v-for="(v,index) in privilege" :key="index" class="disflex">
				<view>
					<image :src="v.icon" class="vipExqImg"></image>
				</view>
				<view>
					<view class="str">{{v.title}}</view>
					<view class="small">{{v.exp}}</view>
				</view>
				<!--uview图标 search  收藏 star-fill   未收藏star-->
			</view>
		</view>
		<!-- 3 -->
		<view class="open3">
			<view class="op3">会员使用说明</view>
			<view class="small">
				<view>1.会员服务一经开通，不支持退款</view>
				<view>2.如遇到苹果手机支付问题，建议参考Apptore支付 流程</view>
				<view>3.若会员开通出现异常，请立即联系客服，我们会在2 个工作日内出处理结果</view>
				<view>4.会员常见问题、会员服务协议、会员隐私协议。</view>
			</view>
		</view>
		
		<!-- 底部弹出层 -->
		<u-popup :show="show" mode="bottom" :overlay="true" @close="closePop" closeable loseIconPos="top-left" closeOnClickOverlay 
 overlayOpacity="0.5" safeAreaInsetBottom >
			<view class="popup">
				<view class="center"> 开通VIP会员 </view>
				
				<view class="disMeal">
					<view :class="{'active':payMouth==v.mouth}"
						v-for="v in mealArr" :key="v._id" class="mealItem" @click="payMouth=v.mouth">	
						<view class="popRele rele">即将涨价</view>
						<view class="strong">{{v.name}}</view>
						<view class="small">({{v.mouth}}个月)</view>
						<view class="colo"><span class="mon">￥</span>{{v.salePrice}}</view>
						<view class="dele">￥{{v.normalPrice}}</view>
					</view>
				</view>
				<view class="disflex">
					<view class="gx">恭喜</view>
					<view class="hint">开通后立即全站去广告、免费看10000+名厨视频</view>
				</view>
				<view class="openk" @click="paymon">立即购买</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
	import { createNamespacedHelpers } from "vuex"
	const {mapActions,mapState,mapMutations} = createNamespacedHelpers('userModule')
	export default {
		data() {
			return {
				//开通会员月数,和被选中框
				payMouth:12,
				//头像组
				urls: ['https://cdn.uviewui.com/uview/album/1.jpg',
					'https://cdn.uviewui.com/uview/album/2.jpg',
					'https://cdn.uviewui.com/uview/album/3.jpg',
					'https://cdn.uviewui.com/uview/album/4.jpg',
					'https://cdn.uviewui.com/uview/album/7.jpg',
					'https://cdn.uviewui.com/uview/album/6.jpg',
					'https://cdn.uviewui.com/uview/album/5.jpg'
				],
				//vip特权
				privilege: [
					{
					icon: 'https://www.imgtu.net/i/2022/07/24/62dcb8e38ef18.png',
					title: '1000+精品名厨菜谱',
					exp: '大咖教学，轻松学会'
				}, {
					icon: 'https://www.imgtu.net/i/2022/07/26/62e0083b55f55.png',
					title: '每周上新',
					exp: '新菜持续更新中'
				}, {
					icon: 'https://www.imgtu.net/i/2022/07/26/62e0083c02ddd.png',
					title: '会员免广告打扰',
					exp: '体验更流畅'
				}, {
					icon: 'https://www.imgtu.net/i/2022/07/26/62e0083d0075a.png',
					title: 'VIP尊贵身份标识',
					exp: '随时随地、与众不同'
				}],
				//底部弹出
				show: false,
			}
		},
		computed:{
			...mapState(['mealArr']),
		},
		methods: {
			...mapActions(['openVip','getMeal']),
			openPop(){
				console.log('打开')
				this.show=true
			},
			closePop(){
				console.log('关闭')
				this.show=false
			},
			paymon(){
				this.openVip(this.payMouth)
				uni.navigateTo({
					url: '/pagesB/vippay/vippay'
				});
			}
		},
		created() {
			//套餐获取
			this.getMeal();
		}
	}
</script>
<style lang="scss" scoped>
	#openvip {
		background-color: #f5f7fa;
		
		//白色背景
		.fixff{
			position: absolute;
			width: 750rpx;
			height: 892rpx;
			z-index: 0;
			background-color: #fff;
		}
		// 顶部背景
		.fixed {
			position: absolute;
			width: 750rpx;
			height: 302rpx;
			border-radius: 0 0 100rpx 100rpx;
			z-index: 1;
			background-color: #313131;
		}
		
		.open0 {
			padding-right: 32rpx;
			padding-top: 32rpx;
			display: flex;
			justify-content: space-between;
			color: #fff;
			.group{
				display: flex;
				padding-left: 30rpx;
				border-radius: 0 30rpx 30rpx 0;
			}
			
		}
		
		.open1,
		.open2,
		.open3 {
			padding: 32rpx 32rpx;
			margin-bottom: 20rpx;
			background-color: #fff;
		}
		.open0,.open1{
			position: relative;
			z-index: 2;
		}
		.open1,.popup {
			background-color: transparent;
			.vipLogin{
				width: 686rpx;
				.img{
					width: 686rpx;
					height: 302rpx;
					border-radius: 16rpx;
				}
			}
			.disMeal {
				display: flex;
				justify-content: space-between;
				margin: 32rpx 0;
				text-align: center;
				

				.mealItem {
					width: 212rpx;
					// height: 232rpx;
					background-color: #fbfcfe;
					border-radius: 16rpx;
					border: solid 2rpx #e0e0e0;
					padding-top: 20rpx;
					padding-bottom: 10rpx;
					position: relative;
					.rele {
						position: absolute;
						background-image:url(@/static/tuijian@2x.png);
						background-repeat: no-repeat;
						background-size: 94rpx 48rpx;
						color: #fff;
						font-size: 24rpx;
						padding: 8rpx 23rpx;
						top: -24rpx;
						left: 0;
					}
					.popRele{
						background-image: url(@/static/zhangjia@2x.png);
						background-size: 140rpx 58rpx;
						background-position: 0 -8rpx;
						padding-left: 14rpx;
					}
					.strong,.colo,.dele,.small{
						padding: 4rpx 0;
					}

					.strong {
						font-weight: 600;
					}
					.small{
						font-size: 20rpx;
						color: #b1b1b1;
					}
					.colo {
						color: #dcb66a;
						font-size: 40rpx;
						font-weight: 500;
						.mon{
							font-size: 25rpx;
						}
					}
					.dele {
						text-decoration-color: #b1b1b1;
						text-decoration: line-through;
						color: #b1b1b1;
						font-weight: 500;
					}
				}

				.active {
					background-color: #fbf7ef;
					border: solid 2rpx #dcb66a;
				}
			}

			.disflex {
				display: flex;

				.gx {
					background-image: url(@/static/gongxi@2x.png);
					background-repeat: no-repeat;
					color: #a2864e;
					font-size: 28rpx;
					margin-right: 8rpx;
				}
				.hint {
					font-size: 28rpx;
					color: #7c673c;
					font-weight: 500;
					
				}
			}

			.openk {
				text-align: center;
				color: #a56d48;
				font-size: 40rpx;
				font-weight: 600;
				background-color: #fcf1d3;
				padding: 10rpx 0;
				border-radius: 16rpx;
				margin:32rpx 0;
			}
		}

		.open2 {
			.strong {
				font-size: 40rpx;
				font-weight: 600;
			}

			.disflex {
				display: flex;
				margin: 30rpx 0;
				.vipExqImg{
					width: 90rpx;
					height: 90rpx;
					margin-right: 32rpx;
				}
				.str {
					font-weight: 500;
				}

				.small {
					font-size: 24rpx;
					color: #b1b1b1;
				}
			}

			.open3 {
				.op3{
					font-weight: 500;
				}
				.small {
					font-size: 28rpx;
					color: #b7b7b7;
					margin-top: 32rpx;
				}
			}
		}

		
// 弹出层
		.popup {
			padding: 15rpx 32rpx 0;
			.center {
				text-align: center;
				color: #828282;
			}
		}

	}
</style>
