<template>
	<view class="home">
		<view class="flex-c notify">
			<img class="img" src="/static/images/alert.png" />
			<view class="marquee">
				<text class="text" :style="{left: `${left}px`, fontSize: `${size}px`}">
					{{ text }}
				</text>
			</view>
		</view>
		<view class="iconfont iconaddress">测试</view>
		<button class="btn btn-primary" @click="toHome">意见反馈</button>
		<button class="btn btn-primary" @click="toChat">聊天主页</button>
		<view class="form">
			<view class="flex-c form-item">
				<label for="name">角色名称</label>
				<input type="text" placeholder="请输入角色名称" v-model="form.name" />
			</view>
			<view class="flex-c  form-item">
				<label for="name">角色描述</label>
				<textarea type="text" placeholder="请输入角色描述" v-model="form.desc" />
			</view>
			<button class="btn btn-primary" @click="onSubmit">提交</button>
		</view>
		<ua-input class="flex1" v-model="editorText" type="textarea" :autosize="{maxRows: 3}" clearable
			placeholder="Prompt..." @clear="handleClear" style="width: 60%;" >
		</ua-input>
	</view>
</template>

<script>
	import $request from "@/api/request";
	import $uniApi from "@/common/uni.app.api.js";
	import UaInput from "@/components/ua-input/ua-input"
	export default {
		components: {
			UaInput
		},
		data() {
			return {
				form: {
					name: "",
					desc: ""
				},
				// 跑马灯变量
				timer: null,
				text: "测试环境, 非测试人员请勿操作",
				left: 0,
				marqueeSpace: 0.8, // 每次移动长度
				marqueeInterval: 20, // 文字移动间隔时间
				textLen: 0, // 轮播文字的长度,
				size: 14, // 字体大小

				editorText: "",

			};
		},
		onLoad() {
			this.testServeice();
		},
		onShow() {
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
			handleClear() {},
			toHome() {
				$uniApi.navigateTo("services/feedback")
			},
			toChat() {
				$uniApi.navigateTo("chat")
			},
			testServeice() {
				$request.baseRequest({
					baseUrl: "{testUrl}",
					apiPath: "/users",
				}).then(res => {
					console.log("testServeice", res)
				})
			},
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
						self.left = result.windowWidth - 40;
						self.scorllingText();
					}
				}, self.marqueeInterval)
			},

			onSubmit() {
				let self = this;
				$request.baseRequest({
					data: {
						...self.form
					},
					baseUrl: "{testUrl}",
					apiPath: "/roles/create",
					method: "POST"
				}).then(res => {
					console.log("roles create >>>>", res)
				})
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