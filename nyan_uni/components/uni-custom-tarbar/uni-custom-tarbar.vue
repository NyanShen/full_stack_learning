<template>
	<view class="tabbar-box">
		<view class="container"></view>
		<view class="tabbar">
			<view class="li">tabar1</view>
			<view class="li">tabar2</view>
			<view class="li middle">tabar3</view>
			<view class="li">tabar4</view>
			<view class="li">tabar4</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "uni-custom-tarbar",
		data() {
			return {

			};
		}
	}
</script>

<style lang="stylus">
	.container {
		width: 200px;
		height: 200px;
		background:
			radial-gradient(circle at 50% 0, #000 0px, transparent 10px),
			radial-gradient(circle at 50% 100%, #000 0px, transparent 10px);
		background-repeat: no-repeat;
		background-size: 100px 100px;
	}

	.tabbar {
		display: flex;
		justify-content: space-between;
		align-items: end;

	}

	.li {
		flex: 1;
		height: 80rpx;
		background-color: #eee;
	}

	.middle {
		height: 120rpx;
		border-radius: 50% 50% 0 0;
	}
</style>