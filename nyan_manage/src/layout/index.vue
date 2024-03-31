<template>
	<el-container class="container">
		<el-aside>
			sidebar
		</el-aside>
		<el-container>
			<el-header>
				header
			</el-header>
			<el-main>
				<div class="flx-row main-tabs">
					tabs
				</div>

				<div class="main-box">
					<router-view></router-view>
				</div>
			</el-main>
		</el-container>
	</el-container>
</template>
<style lang="scss" scoped>
	.el-container {
		width: 100%;
		height: 100vh;
		overflow: hidden;

		.el-aside {
			width: auto;
			overflow: inherit;
		}

		.el-header,
		.el-footer {
			height: auto;
			padding: 0;
		}

		.main-tabs {
			width: 100%;
			margin-bottom: 10px;
			background-color: #fff;
			border: 0;
			box-shadow: none;
			overflow: hidden;
			height: 30px;
		}

		.el-main {
			background: #f0f2f5;
			padding: 10px 13px;
			box-sizing: border-box;
			// min-width: 1020px;
			// 防止切换出现横向滚动条
			overflow-x: hidden;

			.main-box {
				width: 100%;
				height: 100%;
				// background-color: #f5f5f5;
				// box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
				// border-radius: 4px;
				// padding: 20px;
				box-sizing: border-box;
				overflow: auto;
				overflow-x: hidden !important;

				&::-webkit-scrollbar {
					background-color: white;
				}
			}
		}
	}

	.shake {
		animation: shake 0.5s linear;
	}

	@keyframes shake {
		from {
			transform: translateX(-100%);
		}

		to {
			transform: translateX(0);
		}
	}
</style>