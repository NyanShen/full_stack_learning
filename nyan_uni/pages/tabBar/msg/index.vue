<template>
	<view>
		test msg page
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onNavigationBarButtonTap(e) {
			this.setStyle(e.index, false)
		},
		onReady() {
			this.setStyle(0, true);
			this.setStyle(1, true, 9);
		},
		methods: {
			/**
			 * 修改导航栏buttons
			 * index[number] 修改的buttons 下标索引，最右边索引为0
			 * show[boolean] 显示还是隐藏角标或者红点
			 * text[string] 需要修改的角标的text 内容 ，
			 * 如果定义redDot 此参数无效 ，如果定义badgeText请设置具体，如果不用输入
			 */
			setStyle(index, show, text) {
				let pages = getCurrentPages();
				let page = pages[pages.length - 1]; // 获取当前页面对象
				// #ifdef APP-PLUS
				let currentWebview = page.$getAppWebview();
				const activeStrategy = {
					true_0: (index, text) => currentWebview.showTitleNViewButtonRedDot({
						index: index,
						text: text
					}),
					false_0: (index, text) => currentWebview.hideTitleNViewButtonRedDot({
						index: index
					}),
					true_1: (index, text) => currentWebview.setTitleNViewButtonBadge({
						index: index,
						text: text
					}),
					false_1: (index, text) => currentWebview.removeTitleNViewButtonBadge({
						index: index
					}),
				}
				activeStrategy[`${show}_${index}`](index, text);
				// #endif
			}
		}
	}
</script>

<style lang="stylus">

</style>