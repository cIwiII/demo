<template>
	<view id="my">
		<!-- 1 -->
		<view class="mych1">
			<view class="myHead">
				<view>
					<image :src="userInfo.avatarUrl" class="img"></image>
				</view>
				<!-- 登录状态 -->
				<view v-if="status" class="tex">
					<view class="tex2">你好：{{userInfo.nickName}}</view>
					<view class="tex3">可收藏，可查看喜欢的菜谱</view>
				</view>
				<!-- 未登录 -->
				<view v-else class="tex" @click="show = true" >
					<view class="tex2">点击立即登录</view>
					<view class="tex3">登录后可收藏喜欢的菜谱</view>
				</view>
				
			</view>
			<!-- 登录弹出 -->
			<template v-if="!status">
				<u-popup :show="show" mode="bottom">
					<view v-if="reLogin" class="disflex">
						<view class="disItem">
							<u-button type="success" customStyle="width: 200rpx"
								@click="show=false">取消</u-button>
						</view>
						<view class="disItem">
							<u-button type="success" text="确认登录"
								customStyle="width: 200rpx" @click="login">登录
							</u-button>
						</view>
					</view>
					<view v-else class="disflex">
						<button type="primary" loading="true">登录中 Loading</button>
					</view>
				</u-popup>
			</template>
			
			<image src="https://www.imgtu.net/i/2022/07/28/62e259ee7c8e4.png" mode="scaleToFill" class="vipImg"></image>
		</view>
		<!-- 2 -->
		<view class="mych2">
			<view v-for="v in array2" :key="v.id" class="mych2Item" @click="changeNavId(v.id)">
				<!-- 被选中 -->
				<view class="icon" v-if="chooiseNavId==v.id"><u-icon :name="v.icon" size='60rpx' color="#ff5500"></u-icon></view>
				<!-- 未被选中 -->
				<view class="icon" v-else ><u-icon :name="v.icon" size='60rpx' color="#d1d1d1"></u-icon></view>
				<view>{{v.title}}</view>
			</view>
		</view>
		<!-- 3 -->
		<view class="mych3">
			<!-- chooiseNavId=2 浏览记录-->
			<template v-if="chooiseNavId==2">
				<view v-if="allRecordArr.length==0">暂无浏览</view>
				<view v-else>
					<view>共有{{allRecordArr.length}}条浏览记录</view>
					<view v-for="(v,index) in allRecordArr" :key="index">{{index+1}}.{{v.name}}</view>
				</view>
			</template>
			<!-- chooiseNavId=3 点赞-->
			<template  v-else-if="chooiseNavId==3">
				<view v-if="allLikeArr.length>0">
					<view>共有{{allLikeArr.length}}条浏览记录</view>
					<view v-for="(v,index) in allLikeArr" :key="index">{{index+1}}.{{v.name}}</view>
				</view>
				<view v-else>暂无点赞</view>
				
			</template>
			<!-- chooiseNavId=1(默认展示收藏),展示收藏 -->
			<template v-else>
				<view class="bodyHead">
					<view class="headItem" :class="{active:chooiseId=='all'}" @click="chooiseId='all'">所有食材</view>
					<view class="headItem" v-for="v in allCollectArr" @click="chooiseId=v._id" :key="v._id" :class="{active:chooiseId==v._id}">{{v.name}}</view>
					
				</view>
				<view v-for="(v,index) in materials" :key="index" class="tbody">
					<view class="tLeft">{{v.name}}</view>
					<view class="tRight">{{v.number}}</view>
				</view>
			</template>
			
		</view>
		<!-- 4 -->
		<view class="mych4">
			<view>我的菜谱</view>
			<scroll-view scroll-x="true" class="scrollView">
				<view v-for="(v,index) in allCollectArr" :key="index" class="scroll-item">
					<image :src="v.coverpic" mode="scaleToFill" class="scrImg"></image>
					<view class="">{{v.name}}</view>
				</view>
			</scroll-view>
		</view>
		<!-- 5 -->
		<view class="mych5">
			<u-cell-group>
					<u-cell icon="thumb-up-fill" title="去App Store给菜谱大全评分" center isLink url="" size="large"></u-cell>
					<u-cell icon="more-circle-fill" title="反馈问题" center isLink url=""></u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import { createNamespacedHelpers } from "vuex"
	const {mapActions,mapState,mapMutations} = createNamespacedHelpers('userModule')
	export default {
		data() {
			return {
				//底部登陆显示
				show: true,
				//登录请求发送中显示
				reLogin: true,
				//第二栏数据
				array2:[
					{id:1,title:'我的收藏',icon:'heart-fill'},
					{id:2,title:'浏览记录',icon:'clock-fill'},
					{id:3,title:'点赞',icon:'thumb-up-fill'}
				],
				//选中收藏或记录或点赞，下方展示内容，默认展示收藏id=1
				chooiseNavId:1,
				//选中的菜谱_id,展示材料，默认全部
				chooiseId:'all',
				//
				
			}
		},
		computed: {
			...mapState(['status','headSrc','userInfo','allCollectArr','allRecordArr','allLikeArr']),
			//需要的材料
			materials(){
				if(this.chooiseId=='all'){
					let arr=[]
					this.allCollectArr.forEach(v=>{
						arr=[...arr,...v.ingredient]
					})
					return arr
				}else{
					let arr=this.allCollectArr.find(v=>v._id==this.chooiseId);
					return arr.ingredient
				}
			}
		},
		methods: {
			...mapMutations(['changeStatus']),
			...mapActions(['userProfile','getUserInfo','getAllCollect','getAllRecord','getAllLike']),
			
			
			async login() {
				const req1 = this.userProfile();
				this.reLogin = false
				const res1 = await req1
				const req2=this.getUserInfo();
				const res2=await req2
				//执行完返回true
				if (res2) {
					this.show = false;
					this.reLogin = trueX
				}
				console.log('登录成功');
			},
			changeNavId(navId){
				const oldId=this.chooiseNavId
				this.chooiseNavId=navId
				if(navId==2 &&oldId!=2){this.getAllRecord()}
				if(navId==3 &&oldId!=3){this.getAllLike()}
			}
			
			
		},
		onShow() {
			console.log('显示')
			this.getAllCollect();
		}
	}
</script>

<style lang="scss" scoped>
	#my {
		background-color: #f5f5f5;

		.mych1,
		.mych2,
		.mych3,
		.mych4,
		.mych5 {
			padding: 20rpx 32rpx;
			margin-bottom: 20rpx;
			background-color: #fff;
		}

		.mych1 {
			.myHead {
				display: flex;

				.img {
					width: 116rpx;
					height: 116rpx;
				}

				.tex {
					padding: 20rpx 0 0;
					margin-left: 24rpx;

					.tex2 {
						margin-bottom: 10rpx;
					}

					.tex3 {
						color: #ccc;
						font-size: 22rpx;
					}
				}
			}

			.disflex {
				display: flex;
				justify-content: space-evenly;
				height: 120rpx;
				align-items: center;
			}
			.vipImg{
				margin-top: 34rpx;
				width: 688rpx;
				height: 118rpx;
			}
		}
		.mych2{
			display: flex;
			justify-content: space-between;
			.mych2Item{
				width: 140rpx;
				text-align: center;
				font-size: 28rpx;
				.icon{
					padding:0 38rpx;
				}
			}
		}
		.mych3{
			.bodyHead {
				display: flex;
				justify-content: space-between;
				
					font-size: 28rpx;
				letter-spacing: -1rpx;
				.active{
					color: $themeColor;
					font-size: 32rpx;
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
		.mych4{
			padding-right:0;
			.scrollView{
				width: 718rpx;
				height: 290rpx;
				margin-top: 32rpx;
				white-space: nowrap;
				.scroll-item{
					display: inline-block;
					margin-right: 32rpx;
					text-align: center;
					
					.scrImg{
						width: 172rpx;
						height: 208rpx;
						margin-bottom: 10rpx;
						border-radius: 16rpx;
					}
				}
			}
		}
		.mych5{
			
		}
	}
</style>
