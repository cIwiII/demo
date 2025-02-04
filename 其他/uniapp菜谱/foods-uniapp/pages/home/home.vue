<template>
	<view class="">
		<image src="https://www.imgtu.net/i/2022/07/22/62da79af6a0eb.png"
			class="headImg"></image>
		<!-- 标题 -->
		<view class="poi">
			<view class="h2">香哈菜谱大全</view>
			<view class="h4">小白学做菜必备烹饪助手</view>
		</view>
		<view class="posti">
			<navigator url="/pagesA/searchs/searchs" class="search">请输入搜索内容
				<!-- 存放小图标 -->
				<text></text>
			</navigator>
		</view>

		<scroll-view scroll-y="true" class="pageHome" :show-scrollbar="true">
			<!-- 轮播图 -->
			<view>
				<swiper class="banner" :autoplay="true" :indicator-dots="true"
					:circular="true" :interval="2000">
					<swiper-item v-for="v in swiperData" :key="v._id">
						<navigator :url="v.navigator_url"
							:open-type="v.open_type">
							<image class="scrollImg" :src="v.image_src"
								mode="widthFix"></image>
						</navigator>
					</swiper-item>
				</swiper>
			</view>
			<!-- 分类导航 -->
			<view class="typeNav">
				<!-- 单个类 -->
				<view class="type" v-for="v in catitems" :key="v._id">
					<navigator :url="v.navigator_url" :data-v="v.name">
						<image class="typeImg" :src="v.image_src"
							mode="widthFix"></image>
						<view class="title">
							<text>{{v.name}}</text>
						</view>
					</navigator>
				</view>
			</view>
			<!-- 前三个 -->
			<view class="img3">
				<image
					src="https://www.imgtu.net/i/2022/07/22/62da912c2d28f.png"
					class="dongzhi-1" mode="widthFix">
				</image>
				<view>
					<template v-for="(v,i) in floors">
						<image v-if="i!=0" :src="v.floor_imgs" class="xImg"
							mode="widthFix" :key="v._id"></image>
					</template>
				</view>
			</view>
			<!-- 每个菜单 -->
			<view class="menus">

				<view class="aMenu" v-for="v in recommend" :key="v._id">
					<image :src="v.coverpic" mode="scaleToFill"
						class="aMenuImg"></image>
					<view class="title">{{v.name}}</view>
					<view class="xlsc">
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
			</view>
		</scroll-view>
		<!-- 返回顶部 -->
		<view class="wrap">
			<u-back-top :scroll-top="scrollTop"></u-back-top>
		</view>
	</view>
</template>

<script>
	import { createNamespacedHelpers } from "vuex"
	const { mapActions, mapState } = createNamespacedHelpers('homeModule')
	export default {
		//
		computed: {
			...mapState(['swiperData', 'catitems', 'floors', 'recommend']),
		},
		data() {
			return {
				//初始滚动条位置
				scrollTop: 0,
			}
		},
		methods: {
			...mapActions(['getSwiper', 'getCatitems', 'getFloors',
				'getRecommend','likePost']),
				addLike(id){
					console.log('执行');
					this.likePost(id)
				}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		created() {
			this.getSwiper();
			this.getCatitems();
			this.getFloors();
			this.getRecommend();
		}
	}
</script>

<style lang="scss" scoped>
	.headImg {
		width: 750rpx;
		height: 190rpx;
		margin-bottom: 60rpx
	}

	.poi {
		position: absolute;
		top: 50rpx;
		color: #fff;
		left: 30rpx;

		.h2 {
			font-size: 40rpx;
			font-weight: 500;
		}

		.h4 {
			font-size: 22rpx;
			font-weight: 500;
		}
	}

	.posti {
		position: absolute;
		margin: 0 10rpx;
		top: 140rpx;
		z-index: 2;

		.search {
			box-shadow: 0rpx 4rpx 8rpx 0rpx #ebebeb;
			width: 700rpx;
			height: 60rpx;
			background-color: white;
			border-radius: 100rpx;
			text-align: center;
			line-height: 65rpx;
			padding-left: 10rpx;
			color: gray;
			margin: 15rpx;
			margin-bottom: 30rpx;
		}
	}

	.pageHome {
		height: 78vh;
		margin: 0 40rpx;
		width: 750rpx;

		.banner {
			height: 350rpx;

			.scrollImg {
				width: 670rpx;
			}
		}

		.typeNav {
			margin: 0 -47rpx;
			overflow: hidden;

			.type {
				text-align: center;
				margin: 10rpx 47rpx;
				font-size: 20rpx;
				float: left;

				.typeImg {
					width: 60rpx;
					// height:60rpx;
				}
			}
		}

		.img3 {
			display: flex;

			.dongzhi-1 {
				flex-shrink: 0;
				width: 324rpx;
				// height: 362rpx;
				background-image: linear-gradient(90deg,
					);
				border-radius: 8rpx;
				margin-right: 20rpx
			}

			.xImg {
				width: 322rpx;
				// height: 176rpx;
				background-image: linear-gradient(90deg,
					);
				border-radius: 8rpx;
			}
		}

		.menus {
			width: 670rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-top: 30rpx;

			.aMenu {
				flex-shrink: 0;
				margin-bottom: 40rpx;

				.aMenuImg {
					width: 324rpx;
					height: 228rpx;
					background-image: linear-gradient(90deg,
						);
					border-radius: 8rpx;
				}

				.title {
					height: 40rpx;
					font-size: 28rpx;
					font-weight: 600;
					font-stretch: normal;
					line-height: 20rpx;
					letter-spacing: 0rpx;
					color: #575757;
				}

				.xlsc {
					display: flex;
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
</style>
