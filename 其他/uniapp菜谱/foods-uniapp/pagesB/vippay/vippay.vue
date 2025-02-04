<template>
	<view>
		
		<image src="https://www.imgtu.net/i/2022/07/28/62e256df9e53b.png" mode="scaleToFill" class="img"></image>
		<navigator url="/pages/home/home" class="back" open-type="switchTab">返回首页</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.img{
	width: 750rpx;
	height: 820rpx;
}
.back{
	margin: 0 102rpx;
	width: 542rpx;
		border-radius: 86rpx;
		border: solid 2rpx #ff921e;
		text-align: center;
		color: #ff921e;
		padding: 30rpx 0;
}
</style>
