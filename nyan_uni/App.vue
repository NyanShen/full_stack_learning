<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 每个页面公共css 如果工程下同时有vue和nvue文件，全局样式的所有css会应用于所有文件，而nvue支持的css有限 */
	/* #ifndef APP-PLUS-NVUE */
	@import './common/uni.css';
	/* #endif*/
	@import './common/iconfont.css';
	@import './common/index.css';
	@import './common/btn.scss';
</style>