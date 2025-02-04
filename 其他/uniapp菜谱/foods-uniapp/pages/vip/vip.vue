<template>
	<view id="vip">
		<!-- <view class="headVip"> -->
			<scroll-view scroll-x="true" class="headVipScroll">
				<view class="scrollItem" v-for="v in array"  :class="{active:v.id==activeId}" :key="v.id" @click="activeId=v.id">
					{{v.name}}
				</view>
			</scroll-view>
		<!-- </view> -->
		<navigator url="/pagesB/openvip/openvip" open-type="navigate">
			<image src="https://www.imgtu.net/i/2022/07/23/62db8846cdb5e.png" mode="widthFix" class="vipImg"></image>
		</navigator>
		
		<view class="content">
			<view class="vip">VIP最新推荐</view>
			<scroll-view scroll-x="true" class="scrollView">
				<view v-for="(va,index) in recommendArr" class="scroll-item">
					<video :src="va.vid" class="imgHeight"  objectFit="fill"></video>
					<!-- :poster="va.coverpic?va.coverpic:imgpath" -->
					<!-- 是否免费va.isFree=="Y" -->
					<view class="">{{va.name}}</view>
					<view class="xlsc">
						<view class="xl">{{va.pageview}} --</view>
						<view class="xl">{{va.collections}} --</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="content">
			<view class="vip">限时免费体验</view>
			<scroll-view scroll-x="true" class="scrollView">
				<view v-for="(va,index) in freeMenuArr" class="scroll-item">
					<video :src="va.vid" class="imgHeight" objectFit="fill"></video>
					<view class="">{{va.name}}</view>
					<view class="xlsc">
						<view class="xl">{{va.pageview}} --</view>
						<view class="xl">{{va.collections}} --</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="content">
			<view class="vip">猜你喜欢</view>
			<scroll-view scroll-x="true" class="scrollView">
				<view v-for="(va,index) in likeArr" class="scroll-item">
					<video :src="va.vid" class="imgHeight" objectFit="fill"></video>
					<!-- <image v-if="regVideo.test(va.vid)" :src="va.coverpic" mode="widthFix" class="imgHeight"></image> -->
					<view class="">{{va.name}}</view>
					<view class="xlsc">
						<view class="xl">{{va.pageview}} --</view>
						<view class="xl">{{va.collections}} --</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	import { createNamespacedHelpers } from "vuex"
	const { mapActions, mapState } = createNamespacedHelpers('vipModule')
	export default {
		computed:{
			...mapState(['recommendArr','freeMenuArr','likeArr'])
		},
		methods: {
			...mapActions(['getRecommendArr','getFreeMenuArr','getLikeArr']),
		},
		created(){
			this.getRecommendArr();
			this.getFreeMenuArr();
			this.getLikeArr();
		},
		data() {
			return {
				//没有封面默认封面
				imgpath:'https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/xuchaobo/20210830142440.jpg',
				//顶部数据
				array:[
					{id:1,name:'推荐'},
					{id:2,name:'免费体检'},
					{id:3,name:'小白入门'},
					{id:4,name:'快手菜'},
					{id:5,name:'家常菜'},
					{id:6,name:'面食'},
					{id:7,name:'川湘菜'},
					{id:8,name:'凉菜'}
				],
				//顶部选中id,默认1
				activeId:1,
				//----------
			}
		}
	}
</script>

<style lang="scss" scoped>
	#vip {
		
text-align: center;
		.headVipScroll {
				padding-left: 32rpx;
				color: #fff;
				// width: 750rpx;
				white-space: nowrap;
				height: 90rpx;
				background-color: $themeColor;
				.scrollItem{
					font-size: 28rpx;
					padding: 20rpx 10rpx;
					margin-right: 80rpx;
					text-align: left;
					display: inline-block;
				}
				.active{
					font-size: 36rpx;
					font-weight: 600;
				}
		}

		.vipImg {
			width: 700rpx;
			border-radius: 16rpx;
			margin: 20rpx 0 40rpx;
			
		}

		.content {
			margin: 20rpx 0;
			margin-left: 32rpx;
			text-align: left;
			.vip {
				
				height: 56rpx;
				font-size: 40rpx;
				// line-height: 56rpx;
				// letter-spacing: 0rpx;
				color: #303030;
				margin: 10rpx 0 15rpx;
			}
			.scrollView{
				width: 700rpx;
				height: 330rpx;
				white-space: nowrap;
				.scroll-item{
					display: inline-block;
					height: 440rpx;//没什么影响
					margin-right: 12rpx;
					.imgHeight{
						width: 314rpx;
						height: 220rpx;
						border-radius: 8rpx;
					}
					.xlsc {
						display: flex;
						font-size: 18rpx;
					
						.xl {
							width: 157rpx;
					
						}
					}
				}
				
			}
			
		}

	}
</style>
