<template>
	<view>
		<view class="iconfont iconaddress">测试</view>
		<button @click="toHome">to home</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			toHome() {
				uni.navigateTo({
					url: "/pages/home/index"
				})
			}
		}
	}
</script>

<style lang="stylus">

</style>
