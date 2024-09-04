<template>
	<view class="home">
		<!-- 水平文字跑马灯  -->
		<view class="flex-c notify">
			<img class="img" src="/static/images/alert.png" />
			<view class="marquee">
				<text class="text" :style="{left: `${left}px`, fontSize: `${size}px`}">
					{{ text }}
				</text>
			</view>
		</view>

	</view>
</template>

<script>
	import $uniApi from "@/common/uni.app.api.js";
	export default {
		data() {
			return {
				// 跑马灯变量
				timer: null,
				text: "测试环境, 非测试人员请勿操作",
				left: 0,
				marqueeSpace: 0.8, // 每次移动长度
				marqueeInterval: 20, // 文字移动间隔时间
				textLen: 0, // 轮播文字的长度,
				size: 14, // 字体大小
			};
		},
		onLoad() {
			// uniCloud.callFunction({
			// 	name: 'userpass', // 你的云函数名称
			// 	data: {
			// 		user:"username"
			// 	}
			// }).then(resp => {
			// 	// 登录成功，可以关闭一键登录授权界面了
			// 	console.log("uniCloud succ>>>", resp)
			// }).catch(err => {
			// 	// 处理错误
			// 	console.log("uniCloud err>>>", err)
			// })
			// 连接到 WebSocket
			uni.connectSocket({
				url: 'ws://localhost:8888',
				success: function(res) {
					console.log('WebSocket connected');
				}
			});
		},
		onShow() {
			// 文字长度 = 文字个数 * 文字大小
			this.length = this.text.length * this.size;
			this.scorllingText();
		},
		onHide() {
			clearInterval(this.timer);
		},
		onUnload() {
			clearInterval(this.timer);
		},
		methods: {
			/**
			 * 跑马灯文字原理
			 * 文字绝对定位, 按一定的时间和位移进行移动位置,移完后文字在轮播框的最右边开始移动
			 */
			scorllingText() {
				let self = this;
				self.timer = setInterval(() => {
					if (-self.left < self.length) {
						self.left = self.left - self.marqueeSpace;
					} else {
						clearInterval(self.timer);
						let result = $uniApi.loadSystemInfoSync();
						self.left = result.windowWidth - 40; // 轮播宽度约等于系统宽度, 两边留20
						self.scorllingText();
					}
				}, self.marqueeInterval)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.notify {
		width: 690rpx;
		height: 60rpx;
		margin: 0 auto 20rpx;
		background-color: rgba(255, 231, 206, 0.5);
		border-radius: 30rpx;

		.img {
			width: 35rpx;
			height: 36rpx;
			margin: 0 20rpx 0 30rpx;
		}

		.marquee {
			position: relative;
			flex: 1;
			height: 60rpx;
			line-height: 60rpx;
			overflow: hidden;

			.text {
				position: absolute;
				top: 0;
				white-space: nowrap;
				color: #EA8B28;
			}
		}
	}
</style>