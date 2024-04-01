<template>
	<el-form :model="form" label-width="auto" style="max-width: 600px" ref="formRef" :rules="formRules">
		<el-form-item label="菜单名称" prop="name">
			<el-input v-model="form.name" />
		</el-form-item>
		<el-form-item label="菜单" prop="desc">
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
		
	} from "@api/modules/menu";
	const formRef = ref(null);
	const formRules = ref({
		name: [{
			required: true,
			message: 'Please input menu name',
			trigger: 'blur'
		}]
	})
	// do not use same name with ref
	const form = reactive({
		name: '',
	})

	const onSubmit = async (formRef) => {
		await formRef?.validate((valid, fields) => {
			if (valid) {
				
			} else {
				console.log('error submit!', fields)
			}
		})
	}
</script>