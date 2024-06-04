/**
 * 对uniapp api 二次封装
 */
import { nextTick } from "vue";
import {
	useSystemInfoStore
} from "@/stores/systemInfo";
export default {
	/**
	 * 加载动画
	 */
	showLoading: (title = "努力加载中") => {
		uni.showLoading({
			title,
			mask: true
		})
	},
	/**
	 * 隐藏加载动画
	 */
	hideLoading: () => {
		uni.hideLoading();
	},
	/**
	 * 跳转
	 */
	navigateTo: (pageName, params) => {
		if (params) {
			params = JSON.stringify(params)
		}
		uni.navigateTo({
			url: `/pages/${pageName}/index?urlParams=${params}`
		})
	},
	/**
	 * 获取小程序url参数
	 */
	getUrlParams() {
		let pages = getCurrentPages();
		let options = pages[pages.length - 1].options;
		if (options.urlParams) {
			return JSON.parse(options.urlParams)
		}
		return {}
	},
	/**
	 * 提示需要确认
	 */
	alert: (content) => {
		return uni.showModal({
			content,
			showCancel: false,
			confirmText: "我知道了"
		})
	},
	/**
	 * 定时成功提示
	 */
	showToastSuccess(title, duration = 2500) {
		nextTick(() => {
			uni.showToast({
				icon: "success",
				title,
				mask: true,
				duration
			})
		})
	},
	/**
	 * 加载动画
	 */
	showToastNone(title, duration = 2500) {
		nextTick(() => {
			uni.showToast({
				icon: "none",
				title,
				mask: true,
				duration
			})
		})
	},
	/**
	 * 加载系统信息
	 */
	loadSystemInfoSync() {
		let systemInfoStore = useSystemInfoStore();
		if (systemInfoStore.systemInfo) {
			return systemInfoStore.systemInfo
		}
		let result = uni.getSystemInfoSync();
		systemInfoStore.setSystemInfo(result);
		console.log("init systemInfo>>>", result);
		return result;
	}
}