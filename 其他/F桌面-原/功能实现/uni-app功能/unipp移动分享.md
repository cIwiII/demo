

app端的分享可以直接使用uniapp封装的方法uni.share，uni-app的App引擎已经封装了微信、QQ、微博的分享SDK，开发者可以直接调用相关功能。可以分享到微信、QQ、微博，每个社交平台被称为分享服务提供商，即provider。可以分享文字、图片、图文横条、音乐、视频等多种形式。同时注意，分享为小程序也使用本API。即在App里可以通过本API把一个内容以小程序（通常为内容页）方式直接分享给微信好友。直接上代码

```js
<!-- #ifdef APP-PLUS -->
<view class="item" @click="appShare('WXSceneSession')">
	<view class="iconfont icon-weixin3"></view>
	<view class="">微信好友</view>
</view>
<view class="item" @click="appShare('WXSenceTimeline')">
	<view class="iconfont icon-pengyouquan"></view>
	<view class="">微信朋友圈</view>
</view>
<!-- #endif -->


appShare(scene) {
	let that = this
	let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
	let curRoute = routes[routes.length - 1].$page.fullPath // 获取当前页面路由，也就是最后一个打开的页面路由
	uni.share({
		provider: "weixin", //分享服务提供商（即weixin|qq|sinaweibo）
		scene: scene, //场景，可取值参考下面说明。
		type: 0, //分享形式
		href: `${HTTP_IP_URL}${curRoute}&spread=${that.uid}`, //跳转链接
		title: that.storeInfo.storeName, //分享内容的标题
		summary: that.storeInfo.storeInfo, //分享内容的摘要
		imageUrl: that.storeInfo.image, //图片地址
		success: function(res) {
			that.posters = false; //成功后关闭底部弹框
		},
		fail: function(err) {
			uni.showToast({
				title: '分享失败',
				icon: 'none',
				duration: 2000
			})
			that.posters = false;
		}
	});
},
```

uni.share 在App端各社交平台分享配置说明

打开 manifest.json -> App模块权限配置，勾选 Share(分享)；
按如下文档具体配置微信、微博、QQ的参数
在 manifest.json 的 App SDK 配置里，勾选微信消息及朋友圈，并填写 appid，如需在iOS平台使用还需要配置通用链接。