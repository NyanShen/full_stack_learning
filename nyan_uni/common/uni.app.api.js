/**
 * 对uniapp api 二次封装
 */
export default {
	showLoading: (title = "努力加载中") => {
		uni.showLoading({
			title,
			mask: true
		})
	},
	hideLoading: () => {
		uni.hideLoading();
	},
	navigateTo: (pageName, params) => {
		if (params) {
			params = JSON.stringify(params)
		}
		uni.navigateTo({
			url: `/pages/${pageName}/index?urlParams=${params}`
		})
	},
	alert: (content) => {
		return uni.showModal({
			content,
			showCancel: false,
			confirmText: "我知道了"
		})
	},
	showToastSuccess(title, duration = 2500) {
		uni.showToast({
			icon: "success",
			title,
			mask: true,
			duration
		})
	},
	showToastNone(title, duration = 2500) {
		uni.showToast({
			icon: "none",
			title,
			mask: true,
			duration
		})
	}
}