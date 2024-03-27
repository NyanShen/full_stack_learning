/**
 * 服务配置
 */
import $uniApi from "../common/uni.app.api.js"
import $constant from "../common/constants.js"

const urlMap = {
	"{hostUrl}": $constant.CONFIG.hostUrl,
	"{baseUrl}": $constant.CONFIG.baseUrl,
	"{testUrl}": $constant.CONFIG.testUrl,
	"{fileUrl}": $constant.CONFIG.testUrl
}
/**
 * 基础请求封装
 */
const baseRequest = ({
	apiPath = "",
	baseUrl = "baseUrl",
	method = "GET",
	responseType = "text",
	dataType = "json",
	data = {},
	header = {},
	timeout = 60000
}) => {
	header = {
		"Content-Type": "application/json;charset=utf-8",
		...header,
	}
	const options = {
		url: urlMap[baseUrl] + apiPath,
		method,
		data,
		header,
		dataType,
		responseType,
		timeout
	};
	return uni.request(options).then(res => {
		/**
		 * 微信小程序状态吗200, 201, 400, 401等都走的是success回调, 只有状态码500走fail回调函数
		 * 支付宝小程序状态码200, 201是走success回调; 状态码400, 401, 500都走的是fail回调函数,
		 */
		if ([200, 201].includes(res.statusCode)) {
			return res
		}
		return Promise.reject(res);
	});

}
/**
 * 基础请求统一错误各式处理
 * api
 * {baseUrl:{baseUrl}, path: '/uri', method: "GET", responseType: "text", dataType: "json", requestHeader: {})}
 */
const commonRequest = ({
	api,
	data,
	showLoading = true
}) => {
	if (showLoading) {
		loadingTimes++;
		$uniApi.showLoading();
	}
}
/**
 * 携带token验证请求封装
 */
const authRequest = ({
	api,
	data,
	showLoading = true
}) => {

}

export default {
	baseRequest
}