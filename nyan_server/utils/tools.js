/**
 * @param {Object} fmt时间格式化
 */
Date.prototype.Format = function (fmt) { //author: meizz
	let o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (let k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((
			"00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}


// 格式化时间段
const toTimeSolt = (h) => {
	let bt = '';
	if (0 <= h && h <= 3)
		bt = '凌晨';
	if (4 <= h && h <= 8)
		bt = '早上';
	if (9 <= h && h <= 11)
		bt = '上午';
	if (12 == h)
		bt = '中午';
	if (13 <= h && h <= 17)
		bt = '下午';
	if (18 <= h && h <= 23)
		bt = '晚上';

	return bt;
}
// 格式星期
const toWeek = (w) => {
	let week = '';
	switch (w) {
		case 0:
			week = '星期日';
			break;
		case 1:
			week = '星期一';
			break;
		case 2:
			week = '星期二';
			break;
		case 3:
			week = '星期三';
			break;
		case 4:
			week = '星期四';
			break;
		case 5:
			week = '星期五';
			break;
		case 6:
			week = '星期六';
			break;
	}
	return week;
}

module.exports = {
	/**
	 * 对象参数为空就删除该属性
	 */
	deleteNullObj: (keywords) => {
		if (!keywords) {
			return {}
		}
		for (let key in keywords) {
			if (!keywords[key]) {
				delete keywords[key]
			}
		}
		return keywords
	},
	/**
	 * 聊天时间格式化
	 */
	formatChatListTime: (timestamp, type = 1) => {
		let oldtime = new Date(Number(timestamp) * 1000);
		let date = new Date();
		let today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(); //今天凌晨
		let yestday = new Date(today - 24 * 3600 * 1000).getTime();
		// let beforeYestday = new Date(today - 24 * 3600 * 1000 * 2).getTime();
		let beforeWeek = new Date(today - 24 * 3600 * 1000 * 7).getTime();
		let Y = oldtime.getFullYear(); //年份
		let M = oldtime.getMonth() + 1; //月份         
		let d = oldtime.getDate(); //日         
		// let h = oldtime.getHours() % 12 == 0 ? 12 : oldtime.getHours() % 12; //12小时         
		let H = oldtime.getHours(); //24小时         
		let m = oldtime.getMinutes(); //分 
		let w = toWeek(oldtime.getUTCDay()); //星期
		let timesolt = toTimeSolt(oldtime.getHours()); //时间段 

		let timeStr = '';
		let baseStr = `${H}:${m}`

		//当天
		if (oldtime.getTime() > yestday) {
			timeStr = baseStr;
		}
		//昨天
		if (oldtime.getTime() < today && yestday <= oldtime.getTime()) {
			timeStr = '昨天 ' + (type == 1 ? baseStr : '');
		}
		// 一周内
		if (oldtime.getTime() < yestday && beforeWeek <= oldtime.getTime()) {
			timeStr = w + (type == 1 ? ` ${baseStr}` : '');
		}
		// 一周前
		if (oldtime.getTime() < beforeWeek) {
			timeStr = type == 1 ? `${Y}年${M}月${d}日 ${timesolt} ${baseStr}` : `${Y}/${M}/${d}`;
		}
		// 比当前时间晚
		if (oldtime.getTime() > date.getTime()) {
			timeStr = '';
		}
		return timeStr;
	}
}