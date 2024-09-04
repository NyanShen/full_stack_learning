<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="video-wrapper">
				<video id="myVideo" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"
					:duration="duration" @loadedmetadata="onloadedmetadata" @error="videoErrorCallback" @play="onplay"
					@ended="onended" @pause="onpause" @timeupdate="ontimeupdate" :danmu-list="danmuList" enable-danmu
					danmu-btn controls></video>
			</view>
			<view class="play">
				<view>总时长{{duration}}</view>
				<view>观看时长{{watchTime}}</view>
				<view>观看进度{{watchPercentage}}%</view>
			</view>
			<!-- #ifndef MP-ALIPAY -->
			<view class="uni-list uni-common-mt">
				<view class="uni-list-cell">
					<view>
						<view class="uni-label">弹幕内容</view>
					</view>
					<view class="uni-list-cell-db">
						<input v-model="danmuValue" class="uni-input" type="text" placeholder="在此处输入弹幕内容" />
					</view>
				</view>
			</view>
			<view class="uni-btn-v">
				<button @click="sendDanmu" class="page-body-button">发送弹幕</button>
			</view>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '',
				danmuList: [{
						text: '第 1s 出现的弹幕',
						color: '#ff0000',
						time: 1
					},
					{
						text: '第 3s 出现的弹幕',
						color: '#ff00ff',
						time: 3
					}
				],
				danmuValue: '',
				duration: 0,
				timer: null,
				watchTime: 0,
				lastCurrentTime: 0
			}
		},
		computed: {
			watchPercentage() {
				if (this.duration === 0) {
					return 0;
				}
				return parseInt((this.watchTime / this.duration) * 100)
			}
		},

		onReady: function(res) {
			// #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
		},
		methods: {
			sendDanmu: function() {
				this.videoContext.sendDanmu({
					text: this.danmuValue,
					color: this.getRandomColor()
				});
				this.danmuValue = '';
			},
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			onloadedmetadata: function(e) {
				this.duration = parseInt(e.detail.duration);
			},
			onplay: function(e) {
				this.timer = setInterval(() => {
					if (this.watchPercentage > 100) {
						this.onpause();
						return
					}
					this.watchTime += 1;
				}, 1000)
			},
			onpause: function(e) {
				clearInterval(this.timer);
				this.timer = null;
			},
			ontimeupdate: function(e) {
				// const currentTime = e.detail.currentTime;
				// if (Math.abs(currentTime - this.lastCurrentTime) > 1) { // 跳跃超过1秒认为是拖动
				// 	this.onpause(); // 停止计时
				// 	this.watchTime -= (currentTime - this.lastCurrentTime)
				// 	console.log("ontimeupdate cal", this.watchTime)
				// }
				// this.lastCurrentTime = currentTime;
			},
			onended: function(e) {
				this.onpause()
				console.log("watchTime>>>>", this.watchTime)
			},

			getRandomColor: function() {
				const rgb = []
				for (let i = 0; i < 3; ++i) {
					let color = Math.floor(Math.random() * 256).toString(16)
					color = color.length == 1 ? '0' + color : color
					rgb.push(color)
				}
				return '#' + rgb.join('')
			}
		}
	}
</script>

<style lang="scss">
	.video-wrapper {
		width: 100%;

		video {
			width: 100%;
		}
	}
</style>