<template>
  <div class="app-container role">
    <!-- 查询 -->
    <div class="app-search-container mgb10">
      <el-form :model="state.queryParams" ref="queryForm" :inline="true">
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="state.queryParams.name"
            placeholder="请输入角色名称"
            clearable
            @keyup.enter.native="handleQuery"
          />
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
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
      >
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="desc" label="角色描述" />

        <el-table-column label="操作" width="260">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              :icon="Edit"
              @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              :icon="Delete"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-model="state.dialogVisible"
      :title="state.form.id ? '编辑菜单' : '新增菜单'"
      width="800"
      align-center
      draggable
    >
      <el-form
        :model="state.form"
        label-width="auto"
        style="max-width: 600px"
        ref="formRef"
        :rules="formRules"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="state.form.name" />
        </el-form-item>
        <el-form-item label="角色描述" prop="desc">
          <el-input v-model="state.form.desc" type="textarea" />
        </el-form-item>
        <el-form-item label="是否激活" prop="isActive">
          <el-switch v-model="state.form.isActive" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(formRef)">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { Delete, Edit, Plus, Search, Refresh } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchRoleList, createRole, updateRole, removeRole } from "@api/modules/role";
const tableData = ref([]);
const formRef = ref(null);
const formRules = ref({
  name: [
    {
      required: true,
      message: "Please input role name",
      trigger: "blur",
    },
  ],
});
const queryForm = ref(null);
const initForm = {
  name: "",
  desc: "",
  isActive: true,
};
const initQuery = {
  name: "",
};
// do not use same name with ref
const state = reactive({
  form: {
    ...initForm,
  },
  queryParams: {
    ...initQuery,
  },
  dialogVisible: false,
});
/**
 * 获取菜单列表
 */
const loadList = () => {
  fetchRoleList(state.queryParams).then((res) => {
    tableData.value = res.data.data;
  });
};
const onSubmit = async (formRef) => {
  await formRef?.validate((valid, fields) => {
    if (valid) {
      const reqPromise = state.form.id ? updateRole : createRole;
      reqPromise(state.form).then((res) => {
        ElMessage({
          message: "保存成功.",
          type: "success",
        });
        state.form = {
          ...initForm,
        };
        loadList();
        state.dialogVisible = false;
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
const handleQuery = () => {
  tableData.value = [];
  loadList();
};
const resetQuery = () => {
  state.queryParams = {
    ...initQuery,
  };
};
const handlePlus = () => {
  state.form = {
    ...initForm,
  };
  state.dialogVisible = true;
};
const handleEdit = (row) => {
  state.form = {
    ...row,
  };
  state.dialogVisible = true;
};
const handleDelete = (row) => {
  ElMessageBox.confirm("确定删除该条角色信息吗？", "系统提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    let data = {
      id: row.id,
    };
    removeRole(data).then((res) => {
      ElMessage({
        message: "删除成功.",
        type: "success",
      });
      loadList();
    });
  });
};
onMounted(() => {
  loadList();
});
</script>