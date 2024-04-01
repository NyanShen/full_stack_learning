<template>
	<div class="user">
		<el-form :model="form" label-width="auto" style="max-width: 600px" ref="formRef" :rules="formRules">
			<el-form-item label="用户名称" prop="username">
				<el-input v-model="form.username" />
			</el-form-item>
			<el-form-item label="用户密码" prop="password">
				<el-input v-model="form.password" type="password" />
			</el-form-item>
			<el-form-item label="用户昵称" prop="nickName">
				<el-input v-model="form.nickName" />
			</el-form-item>
			<el-form-item label="关联角色" prop="roleId">
				<el-select v-model="form.roleId" placeholder="关联角色">
					<el-option :label="item.desc" :value="item.id"  v-for="(item, index) in roleList" :key="item.id"/>
				</el-select>
			</el-form-item>
			<el-form-item label="状态" prop="state">
				<el-switch v-model="form.state" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit(formRef)">提交</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>


<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from 'vue'
	import {
		createUser,
		fetchRoles
	} from "@api/modules/user";
	const roleList = ref([]);
	const formRef = ref(null);
	const formRules = ref({
		username: [{
				required: true,
				message: 'Please input username',
				trigger: 'blur'
			},
			{
				min: 3,
				max: 20,
				message: 'Length should be 3 to 20',
				trigger: 'blur'
			},
		],
		password: [{
			required: true,
			message: 'Please input user password',
			trigger: 'blur'
		}],
		roleId: [{
			required: true,
			message: 'Please select user role',
			trigger: 'blur'
		}]
	})
	// do not use same name with ref
	const form = reactive({
		username: '',
		password: '',
		nickName: '',
		state: true,
		roleId: ''
	})
	const loadRoles = () => {
		fetchRoles().then(res => {
			roleList.value = res.data.data;
		})
	}

	const onSubmit = async (formRef) => {
		await formRef?.validate((valid, fields) => {
			if (valid) {
				console.log("form>>>",form);
				createUser(form).then(res => {
					if (res.data.code != 200) {
						alert(res.data.msg);
					}
					console.log("crate user successful")
				})
			} else {
				console.log('error submit!', fields)
			}
		})
	}
	onMounted(() => {
		loadRoles();
	});
</script>

<style>
</style>