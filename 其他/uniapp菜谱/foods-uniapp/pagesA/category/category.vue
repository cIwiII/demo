<template>
	<view>
		<view class="head">
			<view class="cate">
				<view class="active">分类</view>
				<view>食材</view>
			</view>
			<view class="inp">
				<input type="text" value="" placeholder="想吃什么搜这里,如麻婆豆腐" />
			</view>
		</view>
		
		<view class="con">
			<!-- 左边 -->
			<view class="asides">
				<view v-for="(v,index) in categoryArr" :key="v._id" class="aside" :class="{active:cateIndex==index}" @click="changeCate(index)">
					<view class="activ">{{v.cat_name}}</view>
				</view>
			</view>
			<!-- 右边 -->
			<view class="content">
				<!-- 分类遍历 -->
				<view class="cateContent" v-for="v in categoryArr" :key="v._id">
					<view class="title">{{v.cat_name}}</view>
					<!-- 同类遍历 -->
					<view class="cateNav">
						<view v-for="val in v.children" :key="val.cat_id"  class="conting">
							<image :src="val.cat_icon?val.cat_icon:'https://www.imgtu.net/i/2022/07/23/62dbad90c98d2.png'" mode="scaleToFill" class="cateImg"></image>
							<view class="valTitle">{{val.cat_name}}</view>
						</view>
						
						
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { createNamespacedHelpers } from "vuex"
	const { mapActions, mapState ,mapMutations} = createNamespacedHelpers('categoryModule')
	export default {
		data() {
			return {}
		},
		computed: {
			...mapState(['categoryArr','cateIndex'])
		},
		methods: {
			...mapActions(['getCateData']),
			...mapMutations(['changeCateIndex']),
			changeCate(index){
				this.changeCateIndex(index)
			}
		},
		created() {
			this.getCateData();
		}
	}
</script>

<style lang="scss" scoped>
	.head{
		background-color: $themeColor;
		padding: 20rpx 0;
		.cate{
			width: 440rpx;
			height: 50rpx;
			margin: 0 154rpx;
			padding-top: 10rpx;
			border-radius: 16rpx;
			display: flex;
			border: 1px solid #fff;
			view{
				width: 220rpx;
				height: 60rpx;
				line-height: 60rpx;
				border-radius: 16rpx;
				color: #fff;
				text-align: center;
				position: relative;
				top: -10rpx;
			}
			.active{
				background-color: #fff;
				color: $themeColor;
			}
		}
		.inp{
			height: 80rpx;
			background-color: #eaeaea;
			margin:20rpx;
			color: #767676;
			border-radius: 16rpx;
			padding: 17rpx 40rpx;
			box-sizing: border-box;
		}
	}
	.con{
		display: flex;
		flex-wrap: nowrap;
		.asides{
			width: 200rpx;
			.aside{
				width: 200rpx;
				padding: 60rpx 0;
				
				text-align: center;
				box-sizing: border-box;
				.activ{
					color: #6c6c6c;
					border-right: 4rpx solid transparent;
					position: relative;
					right: -4rpx;
				}
			}
			.active{
				background-color: #dfdfdf;
				.activ{
					border-right: 4rpx solid $themeColor;
					color: $themeColor;
				}
			}
		}
		.content{
			width: 550rpx;
			.cateContent{
				margin-bottom: 60rpx;
				.title{
					font-size: 30rpx;
					color: #9a9a9a;
					margin: 10rpx;
					margin-left: 20rpx;
				}
				.cateNav{
					display: flex;
					flex-wrap: wrap;
					.conting{
						text-align: center;
						margin: 0 40rpx;
						.cateImg{
							width: 103rpx;
							height: 100rpx;
							margin: 10rpx 0;
						}
						.valTitle{
							color: #6c6c6c;
							font-size: 28rpx;
						}
					}
				}
				
			}
		
		}
	}
	
</style>
