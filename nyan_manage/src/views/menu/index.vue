<template>
	<div class="app-container menu">
		<!-- 查询 -->
		<div class="app-search-container mgb10">
			<el-form :model="state.queryParams" ref="queryForm" :inline="true">
				<el-form-item label="菜单名称" prop="title">
					<el-input v-model="state.queryParams.title" placeholder="请输入菜单名称" clearable
						@keyup.enter.native="handleQuery" />
				</el-form-item>
				<el-form-item>
					<el-button :icon="Search" type="primary" @click="handleQuery">
						搜索
					</el-button>
					<el-button :icon="Refresh" @click="resetQuery">重置</el-button>
					<el-button :icon="Plus" type="success" @click="handlePlus">
						新增
					</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- 列表 -->
		<div class="app-content-container">
			<el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all>
				<el-table-column prop="title" label="菜单名称" />
				<el-table-column prop="path" label="菜单路径" />
				<el-table-column prop="lever" label="菜单类型">
					<template #default="scope">
						<el-tag :type="menuLevel[scope.row.lever].type"
							disable-transitions>{{ menuLevel[scope.row.lever].label }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="icon" label="菜单图标" />
				<el-table-column prop="authority" label="操作标识" />
				<el-table-column label="操作" width="260">
					<template #default="scope">
						<el-button size="small" type="primary" :icon="Edit" @click="handleEdit(scope.row)">
							编辑
						</el-button>
						<el-button size="small" type="success" :icon="Plus" @click="handlePlus(scope.row)">
							新增
						</el-button>
						<el-button size="small" type="danger" :icon="Delete" @click="handleDelete(scope.row)">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 添加编辑菜弹窗-->
		<el-dialog v-model="state.dialogVisible" :title="state.form.id ? '编辑菜单':'新增菜单'" width="800" align-center
			draggable>
			<el-form :model="state.form" label-width="200" style="max-width: 650px" ref="formRef" :rules="formRules">
				<el-form-item label="上级菜单" prop="pid">
					<el-tree-select v-model="state.form.pid" :data="menuList" value-key="id"
						:render-after-expand="false" :props="{value: 'id', label: 'title', children: 'children'}"
						check-strictly show-checkbox check-on-click-node placeholder="请选择上级菜单" />
				</el-form-item>
				<el-form-item label="菜单名称" prop="title">
					<el-input v-model="state.form.title" />
				</el-form-item>
				<el-form-item label="菜单路径" prop="path">
					<el-input v-model="state.form.path" />
				</el-form-item>
				<el-form-item label="菜单类型" prop="lever">
					<el-radio-group v-model="state.form.lever">
						<el-radio value="1">目录</el-radio>
						<el-radio value="2">菜单</el-radio>
						<el-radio value="3">按钮</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="菜单图标" prop="icon">
					<el-input v-model="state.form.icon" />
				</el-form-item>
				<el-form-item label="操作标识" prop="authority">
					<el-input v-model="state.form.authority" />
				</el-form-item>
			</el-form>
			<template #footer>
				<div class="dialog-footer">
					<el-button @click="state.dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="onSubmit(formRef)">
						提交
					</el-button>
				</div>
			</template>
		</el-dialog>
	</div>

</template>

<script setup>
	import {
		Delete,
		Edit,
		Plus,
		Search,
		Refresh
	} from '@element-plus/icons-vue'
	import {
		ref,
		reactive,
		onMounted
	} from 'vue'
	import {
		ElMessage,
		ElMessageBox
	} from 'element-plus'
	import {
		fetchMenuList,
		createMenu,
		updateMenu,
		deleteMenu
	} from "@api/modules/menu";
	import {
		formatTree
	} from "@common/utils.js";
	import {
		menuLevel
	} from "@common/tags.js";
	let pmenu = {
		id: 0,
		title: "主目录",
		children: []
	}
	const menuList = ref([])
	const tableData = ref([])
	const formRef = ref(null);
	const formRules = ref({
		title: [{
			required: true,
			message: 'Please input menu title',
			trigger: 'blur'
		}]
	})
	const queryForm = ref(null)
	const initForm = {
		pid: 0,
		title: "",
		path: "",
		lever: "",
		icon: "",
		authority: ""
	}
	const initQuery = {
		title: ""
	}
	// do not use same name with ref
	const state = reactive({
		form: {
			...initForm
		},
		queryParams: {
			...initQuery
		},
		dialogVisible: false
	})
	/**
	 * 获取菜单列表
	 */
	const loadMenuList = () => {
		fetchMenuList(state.queryParams).then(res => {
			const menuTree = formatTree(res.data.data, 'id', 'pid');
			pmenu.children = menuTree;
			menuList.value.push(pmenu);
			tableData.value = menuTree;
		})
	}
	const onSubmit = async (formRef) => {
		await formRef?.validate((valid, fields) => {
			if (valid) {
				const reqPromise = state.form.id ? updateMenu : createMenu;
				reqPromise(state.form).then(res => {
					ElMessage({
						message: '保存成功.',
						type: 'success',
					});
					state.form = {
						...initForm
					};
					loadMenuList();
					state.dialogVisible = false;
				})
			} else {
				console.log('error submit!', fields)
			}
		})
	}
	const handleQuery = () => {
		tableData.value = [];
		loadMenuList();
	}
	const resetQuery = () => {
		state.queryParams = {
			...initQuery
		}
	}
	const handlePlus = (row) => {
		state.form = {
			...initForm
		}
		if (row) {
			state.form.pid = row.id;
		}
		state.dialogVisible = true;

	}
	const handleEdit = (row) => {
		state.form = {
			...row
		};
		state.dialogVisible = true;

	}
	const handleDelete = (row) => {
		ElMessageBox.confirm(
				'确定删除该条菜单信息吗？',
				'系统提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}
			)
			.then(() => {
				let data = {
					id: row.id
				}
				deleteMenu(data)
					.then(res => {
						ElMessage({
							message: '删除成功.',
							type: 'success',
						});
						loadMenuList();
					})
			})

	}
	onMounted(() => {
		loadMenuList()
	})
</script>