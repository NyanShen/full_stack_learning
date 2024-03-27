<template>
	<view class="feedback">
		<view class="form-item">
			<view class="label">意见和建议</view>
			<textarea name="feedback" id="feedback" cols="30" rows="10"
				placeholder="请描述您使用过程中遇到的意见和建议，若功能异常，上 传页面截图能更快解决呦！"></textarea>
		</view>
		<view class="form-item">
			<view class="label mgb20">上传图片
				<text>（提供异常页面的相关截图）</text>
			</view>
			<view class="form-image" v-if="form.imagePath">
				<image class="img" :src="form.imagePath" mode="aspectFit"></image>
				<view class="iconfont iconclose" @click="deleteImage"></view>
			</view>
			<view class="iconfont iconcus-add-image" @click="chooseImage" v-else>
			</view>
		</view>
		<view class="form-btn">
			<button class="btn btn-primary" @click="onSubmit">提交</button>
		</view>
	</view>
</template>

<script>
	import $image from "@/api/image.js";
	export default {
		data() {
			return {
				form: {
					feedback: "",
					imagePath: "http://localhost:3000/images/image_1711452034282.png"
				}
			}
		},
		methods: {
			/**
			 * 上传图片
			 */
			chooseImage() {
				let self = this;
				$image.chooseImageToUpload({
					maxCount: 1,
					success: res => {
						console.log("chooseImage>>>>", res)
						self.form.imagePath = res.data;
					}
				})
			},
			/**
			 * 删除图片
			 */
			deleteImage() {
				let self = this;
				$image.removeImage({ filePath: self.form.imagePath }).then(() => {
					self.form.imagePath = "";
				})
			},
			/**
			 * 提交一键反馈
			 */
			onSubmit() {
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form-item {
		.iconfont {
			&.iconcus-add-image {
				font-size: 200rpx;
				color: $uni-text-color-placeholder;
			}
		}

		.form-image {
			position: relative;
			width: 200rpx;
			height: 200rpx;

			.img {
				width: 100%;
				height: 100%;
			}

			.iconclose {
				position: absolute;
				top: -15rpx;
				right: -15rpx;
				font-size: 30rpx;

			}
		}
	}
</style>