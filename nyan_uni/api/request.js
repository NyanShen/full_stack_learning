/**
 * 服务配置
 */
const urlMap = {
	"{hostUrl}": $constant.CONFIG.hostUrl,
	"{baseUrl}": $constant.CONFIG.baseUrl,
	"{testUrl}": $constant.CONFIG.testUrl
}
/**
 * 基础请求封装
 */
const baseReuest = ({
	baseUrl = "{baseUrl}"
	apiPath,
	method = "GET",
	data = {},
	responseType = "text",
	dataType = "json",
	header = {},
	timeout = 60000
}) => {
	header = {
		...header,
		"Content-Type": "application/json;charset=utf-8"
	}
	return uni.request({
			url: urlMap[baseUrl] + apiPath,
			method,
			data,
			header,
			dataType,
			responseType,
			timeout
		})
		.then(res => {
			/**
			 * 微信小程序状态吗200, 201, 400, 401等都走的是success回调, 只有状态码500走fail回调函数
			 * 支付宝小程序状态码200, 201是走success回调; 状态码400, 401, 500都走的是fail回调函数,
			 */
			if ([200, 201].includes(res.statusCode)) {
				return res
			} else {
				return Promise.reject(res);
			}
		})
		.catch(err => {
			return Promise.reject(err);
		})

}
/**
 * 携带token验证请求封装
 */
const authRequest = () => {
	
}