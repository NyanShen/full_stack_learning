<template>
	<view class="login">
		<view class="login-header"></view>
		<view class="login-btn">
			<button class="btn btn-primary mgb30">微信登录</button>
			<!-- #ifdef APP-PLUS -->
			<button class="btn default" @click="phoneLogin">手机号登录</button>
			<!-- #endif -->
		</view>
		<view class="flex-row login-agree" @click="toggleCheck">
			<view class="icon" :class="isChecked ? 'icon-checked':'icon-unchecked'"></view>
			<view class="flex-c login-agree-text">
				<text>我同意并愿意遵守</text>
				<view class="btn-text">
					{{"<<"}}服务协议{{">>"}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isChecked: false, // 是否同意
			}
		},
		methods: {
			toggleCheck() {
				this.isChecked = !this.isChecked;
			},
			phoneLogin() {
				// #ifdef APP-PLUS
				uni.login({
						provider: 'univerify',
						univerifyStyle: {
							"fullScreen": true, // 是否全屏显示，默认值： false
							"backgroundColor": "#ffffff", // 授权页面背景颜色，默认值：#ffffff
							"backgroundImage": "", // 全屏显示的背景图片，默认值："" （仅支持本地图片，只有全屏显示时支持）
							"icon": {
								"path": "static/images/logo.png", // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo
								"width": "60px", //图标宽度 默认值：60px
								"height": "60px" //图标高度 默认值：60px
							},
							"closeIcon": {
								"path": "", // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo
							},
							"phoneNum": {
								"color": "#202020" // 手机号文字颜色 默认值：#202020
							},
							"slogan": {
								"color": "#BBBBBB" //  slogan 字体颜色 默认值：#BBBBBB
							},
							"authButton": {
								"normalColor": "#3479f5", // 授权按钮正常状态背景颜色 默认值：#3479f5
								"highlightColor": "#2861c5", // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）
								"disabledColor": "#73aaf5", // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）
								"textColor": "#ffffff", // 授权按钮文字颜色 默认值：#ffffff
								"title": "本机号码一键登录", // 授权按钮文案 默认值：“本机号码一键登录”
								"borderRadius": "24px" // 授权按钮圆角 默认值："24px" （按钮高度的一半）
							},
							"otherLoginButton": {
								"visible": true, // 是否显示其他登录按钮，默认值：true
								"normalColor": "", // 其他登录按钮正常状态背景颜色 默认值：透明
								"highlightColor": "", // 其他登录按钮按下状态背景颜色 默认值：透明
								"textColor": "#656565", // 其他登录按钮文字颜色 默认值：#656565
								"title": "其他登录方式", // 其他登录方式按钮文字 默认值：“其他登录方式”
								"borderColor": "", //边框颜色 默认值：透明（仅iOS支持）
								"borderRadius": "0px" // 其他登录按钮圆角 默认值："24px" （按钮高度的一半）
							},
							"privacyTerms": {
								"defaultCheckBoxState": true, // 条款勾选框初始状态 默认值： true
								"isCenterHint": false, //未勾选服务条款时点击登录按钮的提示是否居中显示 默认值: false (3.7.13+ 版本支持)
								"uncheckedImage": "", // 可选 条款勾选框未选中状态图片（仅支持本地图片 建议尺寸 24x24px）(3.2.0+ 版本支持)
								"checkedImage": "", // 可选 条款勾选框选中状态图片（仅支持本地图片 建议尺寸24x24px）(3.2.0+ 版本支持)
								"checkBoxSize": 12, // 可选 条款勾选框大小
								"textColor": "#BBBBBB", // 文字颜色 默认值：#BBBBBB
								"termsColor": "#5496E3", //  协议文字颜色 默认值： #5496E3
								"prefix": "我已阅读并同意", // 条款前的文案 默认值：“我已阅读并同意”
								"suffix": "并使用本机号码登录", // 条款后的文案 默认值：“并使用本机号码登录”
								"privacyItems": [ // 自定义协议条款，最大支持2个，需要同时设置url和title. 否则不生效
									{
										"url": "https://", // 点击跳转的协议详情页面
										"title": "用户服务协议" // 协议名称
									}
								]
							},
							"buttons": { // 自定义页面下方按钮仅全屏模式生效（3.1.14+ 版本支持）
								"iconWidth": "45px", // 图标宽度（高度等比例缩放） 默认值：45px
								"list": [{
										"provider": "qq",
										"iconPath": "/static/images/QQ.png" // 图标路径仅支持本地图片
									},
									{
										"provider": "weixin",
										"iconPath": "/static/images/wechat.png" // 图标路径仅支持本地图片
									}
								]
							}
						}
					})
					.then(res => {
						console.log("univerify login success>>>", res)
						uni.closeAuthView()
						// 在得到access_token后，通过callfunction调用云函数
						// uniCloud.callFunction({
						// 	name: 'getPhoneNumber', // 你的云函数名称
						// 	data: res.authResult
						// }).then(resp => {
						// 	// 登录成功，可以关闭一键登录授权界面了
						// 	console.log("uniCloud succ>>>", resp)
						// }).catch(err => {
						// 	// 处理错误
						// 	console.log("uniCloud err>>>", err)
						// })
					})
					.catch(error => {
						console.log("univerify login fail>>>", error)
						uni.closeAuthView();
					})
				// #endif

			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-header {
		width: 100%;
		height: 530rpx;
		background: url("../../static/images/bg_login.png");
		background-size: cover;
	}

	.login-btn {
		padding: 50rpx;
	}

	.login-agree {
		position: fixed;
		bottom: 30rpx;
		left: 0;
		width: 100%;
		font-size: 22rpx;
		color: $uni-text-color-grey;

		.icon {
			width: 23rpx;
			height: 23rpx;
			margin-right: 10rpx;
		}

		.icon-unchecked {
			background: url("../../static/images/unchecked.png");
			background-size: cover;

		}

		.icon-checked {
			background: url("../../static/images/checked.png");
			background-size: cover;
		}

		.btn-text {
			color: $uni-color-primary;
		}
	}
</style>