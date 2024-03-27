<template>
	<view>
		<view class="iconfont iconaddress">测试</view>
		<button class="btn btn-primary" @click="toHome">意见反馈</button>
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
	</view>
</template>

<script>
	import $request from "@/api/request";
	import $uniApi from "@/common/uni.app.api.js";
	export default {
		data() {
			return {
				form: {
					name: "",
					desc: ""
				}
			};
		},
		onLoad() {
			this.testServeice();
		},
		methods: {
			toHome() {
				$uniApi.navigateTo("services/feedback")
			},
			testServeice() {
				$request.baseRequest({
					baseUrl: "{testUrl}",
					apiPath: "/users",
				}).then(res => {
					console.log("testServeice", res)
				})

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

<style lang="stylus">

</style>