import $request from "@/api/request.js";
import $constant from "@/common/constants.js";
import $uniApi from "@/common/uni.app.api.js";

/**
 * 选择图片
 * @returns {tempFilePaths, tempFiles}
 */
const chooseImageToUpload = ({
	maxCount,
	count = 0,
	sourceType = ["album", "camera"],
	success,
	fail
}) => {
	uni.chooseImage({
			count: maxCount - count,
			sizeType: ['compressed'], // compressed|original
			sourceType
		})
		.then(res => {
			res.tempFilePaths.forEach(filePath => {
				uploadImage({
						filePath
					})
					.then(resp => {
						success && success(resp.data);
					})
					.catch(err => {
						fail && fail(err);
					})
			})
		})
		.catch(err => {
			fail && fail(err);
		})
}
/**
 * 上传图片
 */
const uploadImage = ({
	filePath,
	fileName = "image",
}) => {
	return uni.uploadFile({
		url: `${$constant.CONFIG.fileUrl}/file/upload/image`,
		name: fileName,
		filePath,
		formData: {},
	})
}
/**
 * 删除图片
 */
const removeImage = ({
	filePath
}) => {
	return $request.baseRequest({
		baseUrl: "{fileUrl}",
		apiPath: `/file/delete/filePath`,
		method: "DELETE",
		data: {
			filePath
		}
	}).then(res => {
		$uniApi.showToastSuccess("删除成功");
		return res
	})
}

export default {
	chooseImageToUpload,
	removeImage
}