<template>
	<div class="app-nav-container">
		<el-tabs :value="current" type="card" @tab-click="handleClick" @tab-remove="handleTabRemove"
			@contextmenu.native="handleContextmenu">
			<el-tab-pane v-for="page in opened" :key="page.fullPath" :label="page.meta.title || '未命名'" :name="page.fullPath"
				:closable="isTabClosable(page)" />
		</el-tabs>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	
	const current = ref(0)
	const opened = [{
			fullPath: "用户管理",
			meta: {
				title: "用户管理"
			}
		},
		{
			fullPath: "菜单管理",
			meta: {
				title: "菜单管理"
			}
		}
	]
	const handleClick = (e) => {

	}
	const handleTabRemove = (e) => {

	}
	const handleContextmenu = (e) => {

	}
	const isTabClosable = (page) => {

	}
</script>

<style lang="scss" scoped>
	.app-nav-container {}
</style>