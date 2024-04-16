<template>
  <div class="app-container user">
    <!-- 查询 -->
    <div class="app-search-container mgb10">
      <el-form :model="state.queryParams" ref="queryForm" :inline="true">
        <el-form-item label="用户名称" prop="name">
          <el-input
            v-model="state.queryParams.name"
            placeholder="请输入用户名称"
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
        <el-table-column prop="avatar" label="头像" />
        <el-table-column prop="account" label="登录账号" />
        <el-table-column prop="name" label="用户名称" />
        <el-table-column prop="sex" label="性别">
          <template #default="scope">
            <dict-tag dictType="sex" :dictKey="scope.row.sex" />
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号码" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <dict-tag dictType="status" :dictKey="scope.row.status" />
          </template>
        </el-table-column>
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
      :title="state.form.id ? '编辑用户' : '新增用户'"
      width="800"
      align-center
      draggable
    >
      <el-form
        :model="state.form"
        label-width="200"
        style="max-width: 600px"
        ref="formRef"
        :rules="formRules"
      >
        <el-form-item label="登录账户" prop="code">
          <el-input v-model="state.form.account" />
        </el-form-item>
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="state.form.name" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="state.form.sex">
            <el-radio :value="1">男</el-radio>
            <el-radio :value="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="state.form.email" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="state.form.phone" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="state.form.status">
            <el-radio :value="1">启用</el-radio>
            <el-radio :value="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户角色" prop="roleIds">
          <el-checkbox
            v-model="state.checkAll"
            :indeterminate="state.isIndeterminate"
            @change="handleCheckAllChange"
          >
            全部
          </el-checkbox>
          <el-checkbox-group
            v-model="state.roleIds"
            @change="handleCheckedRolesChange"
          >
            <el-checkbox
              v-for="item in state.roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
              {{ item.name
              }}<span style="font-size: 12px; color: #999999"
                >({{ item.desc }})</span
              >
            </el-checkbox>
          </el-checkbox-group>
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
import { Delete, Edit, Plus, Search, Refresh } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  fetchUserList,
  createUser,
  updateUser,
  removeUser,
  fetchUserRoleList,
} from "@api/modules/user";
import { fetchRoleList } from "@api/modules/role";
const tableData = ref([]);
const formRef = ref(null);
const formRules = ref({
  code: [
    {
      required: true,
      message: "Please input user code",
      trigger: "blur",
    },
  ],
  name: [
    {
      required: true,
      message: "Please input user name",
      trigger: "blur",
    },
  ],
});
const queryForm = ref(null);
const initForm = {
  code: "",
  name: "",
  desc: "",
  status: 1,
  roleIds: "",
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
  // 角色选择
  checkAll: false,
  isIndeterminate: false,
  roles: [],
  roleIds: [],
});
/**
 * 获取菜单列表
 */
const loadList = () => {
  fetchUserList(state.queryParams).then((res) => {
    tableData.value = res.data.data;
  });
};
/**
 * 提交新增/编辑数据
 */
const onSubmit = async (formRef) => {
  await formRef?.validate((valid, fields) => {
    if (valid) {
      state.form.roleIds = state.roleIds.join(",");
      const reqPromise = state.form.id ? updateUser : createUser;
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
/**
 * 查询
 */
const handleQuery = () => {
  tableData.value = [];
  loadList();
};
/**
 * 重置查询
 */
const resetQuery = () => {
  state.queryParams = {
    ...initQuery,
  };
};
/**
 * 新增
 * @param {*} row
 */
const handlePlus = () => {
  state.form = {
    ...initForm,
  };
  state.isIndeterminate = false;
  state.dialogVisible = true;
  loadPermissionList();
};
/**
 * 编辑
 * @param {*} row
 */
const handleEdit = (row) => {
  state.form = {
    ...row,
  };
  state.isIndeterminate = false;
  state.dialogVisible = true;
  loadPermissionList();
};
/**
 * 删除
 * @param {*} row
 */
const handleDelete = (row) => {
  ElMessageBox.confirm("确定删除该条用户信息吗？", "系统提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    let data = {
      id: row.id,
    };
    removeUser(data).then((res) => {
      ElMessage({
        message: "删除成功.",
        type: "success",
      });
      loadList();
    });
  });
};
/**
 * 关联角色-获取角色列表
 */
const loadPermissionList = () => {
  fetchPermissionList()
    .then((res) => {
      state.roles = res.data.data || [];
      loadUserRoles();
    })
    .catch(() => {});
};
/**
 * 查询已关联角色
 */
const loadUserRoles = () => {
  // 新增不需要查询
  if (!state.form.id) {
    return;
  }
  fetchUserRoleList({ id: state.form.id })
    .then((res) => {
      state.roleIds = res.data.data || [];
      handleCheckedRolesChange(state.roleIds);
    })
    .catch(() => {});
};
/**
 * 关联角色-全选
 */
const handleCheckAllChange = (val) => {
  state.roleIds = val ? state.roles.map((item) => item.id) : [];
  state.isIndeterminate = false;
};
/**
 * 显示是否全选逻辑
 * @param {*} value
 */
const handleCheckedRolesChange = (value) => {
  const checkedCount = value.length;
  state.checkAll = checkedCount === state.roles.length;
  state.isIndeterminate = checkedCount > 0 && checkedCount < state.roles.length;
};

onMounted(() => {
  loadList();
});
</script>
<style lang="scss" scoped>
.el-checkbox {
  display: flex;
  align-items: flex-start;
  width: 100%;
}
</style>