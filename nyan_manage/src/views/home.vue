<template>
	<el-form :model="form" label-width="auto" style="max-width: 600px" ref="formRef" :rules="formRules">
		<el-form-item label="角色名称" prop="name">
			<el-input v-model="form.name" />
		</el-form-item>
		<el-form-item label="角色描述" prop="desc">
			<el-input v-model="form.desc" type="textarea" />
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="onSubmit(formRef)">提交</el-button>
			<el-button>取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	import {
		createRole
	} from "@api/modules/user";
	const formRef = ref(null);
	const formRules = ref({
		name: [{
				required: true,
				message: 'Please input role name',
				trigger: 'blur'
			},
			{
				min: 3,
				max: 20,
				message: 'Length should be 3 to 20',
				trigger: 'blur'
			},
		],
		desc: [{
			required: true,
			message: 'Please input role desc',
			trigger: 'blur'
		}]
	})
	// do not use same name with ref
	const form = reactive({
		name: '',
		desc: '',
	})

	const onSubmit = async (formRef) => {
		await formRef?.validate((valid, fields) => {
			if (valid) {
				createRole(form).then(res => {
					console.log("crate role successful")
				})
			} else {
				console.log('error submit!', fields)
			}
		})
	}
</script>