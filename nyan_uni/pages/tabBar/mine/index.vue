<template>
	<view class="uni-container">
		<image class="logo" src="/static/images/logo.png"></image>
		<view class="text-area mgb30" @click="toLogin">
			<text class="title">{{title}}</text>
		</view>
		<view class="text-area">
			<text class="title">我是描述文字测试</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '登录'
			}
		},
		onLoad() {


		},
		methods: {
			toLogin() {
				uni.navigateTo({
					url: "/pages/login/index"
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: $uni-text-color-placeholder;
	}
</style>