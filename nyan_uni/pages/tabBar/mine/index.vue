<template>
	<view class="uni-container">
		
	</view>
</template>

<script>
	import $uniApi from "@/common/uni.app.api.js"
	import $constant from "@/common/constants.js";
	export default {
		data() {
			return {
				title: ''
			}
		},
		onLoad() {


		},
		methods: {
			toLogin() {
				$uniApi.navigateTo("login")
			},
			handleText() {
				$uniApi.alert("hello" + $constant.CONFIG.testUrl)
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