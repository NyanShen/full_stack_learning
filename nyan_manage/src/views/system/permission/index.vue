<template>
  <div class="app-container common-table">
    <!-- 查询 -->
    <div class="app-search-container mgb10">
      <el-form :model="state.queryParams" ref="queryForm" :inline="true">
        <el-form-item label="权限名称" prop="name">
          <el-input
            v-model="state.queryParams.name"
            placeholder="请输入权限名称"
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
        <el-table-column prop="code" label="权限编码" />
        <el-table-column prop="name" label="权限名称" />
        <el-table-column prop="desc" label="权限描述" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <dict-tag dictType="status" :dictKey="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
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
            <el-dropdown
              size="small"
              @command="(e) => handleCommand(e, scope.row)"
            >
              <el-button style="margin-left: 10px" size="small" type="primary">
                <font-awesome-icon
                  style="margin-right: 5px"
                  size="sm"
                  icon="fa-solid fa-angle-double-right"
                />
                更多
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="menu">菜单权限</el-dropdown-item>
                  <el-dropdown-item command="data">数据权限</el-dropdown-item>
                  <el-dropdown-item command="page">页面权限</el-dropdown-item>
                  <el-dropdown-item command="oper">操作权限</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加编辑菜弹窗-->
    <el-dialog
      v-model="state.dialogVisible"
      :title="state.form.id ? '编辑权限' : '新增权限'"
      width="800"
      align-center
      draggable
    >
      <el-form
        :model="state.form"
        label-width="200"
        style="max-width: 650px"
        ref="formRef"
        :rules="formRules"
      >
        <el-form-item label="权限编码" prop="name">
          <el-input v-model="state.form.code" />
        </el-form-item>
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="state.form.name" />
        </el-form-item>
        <el-form-item label="权限描述" prop="path">
          <el-input v-model="state.form.desc" :rows="2" type="textarea" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="state.form.status">
            <el-radio :value="1">启用</el-radio>
            <el-radio :value="0">禁用</el-radio>
          </el-radio-group>
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
    <!-- 分配菜单 -->
    <el-dialog
      v-model="state.menuDialogVisible"
      title="分配菜单"
      width="800"
      align-center
      draggable
    >
      <el-form :model="state.form" label-width="200" style="max-width: 650px">
        <el-form-item label="权限编码" prop="code">
          <el-input v-model="state.form.code" disabled />
        </el-form-item>
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="state.form.name" disabled />
        </el-form-item>
        <el-form-item label="菜单" prop="menuIds">
          <el-tree-select
            v-model="state.menuIds"
            :data="state.menuList"
            value-key="id"
            :render-after-expand="false"
            :props="{ value: 'id', label: 'name', children: 'children' }"
            multiple
            check-strictly
            show-checkbox
            check-on-click-node
            placeholder="请选择菜单"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="state.menuDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmitPermissionMenu()">
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
  fetchPermissionList,
  createPermission,
  updatePermission,
  deletePermission,
  assignMenus,
  fetchPermissionMenus,
} from "@api/modules/permission";
// 菜单依赖
import { fetchMenuList } from "@api/modules/menu";
import { formatTree } from "@common/utils.js";

const tableData = ref([]); // 表格数据
const formRef = ref(null); // 表单
const formRules = ref({
  // 表单限制
  code: [
    {
      required: true,
      message: "Please input permission code",
      trigger: "blur",
    },
  ],
  name: [
    {
      required: true,
      message: "Please input permission name",
      trigger: "blur",
    },
  ],
});
const queryForm = ref(null); // 查询条件
const initForm = {
  code: "",
  name: "",
  desc: "",
  status: 1,
  menuIds: "",
}; // 新增编辑初始化
const initQuery = {
  name: "",
}; // 查询初始化
// do not use same name with ref
const state = reactive({
  form: {
    ...initForm,
  },
  queryParams: {
    ...initQuery,
  },
  dialogVisible: false, // 是否打开新增修改弹窗
  menuIds: [],
  menuList: [], // 菜单列表
  menuDialogVisible: false, // 菜单权限设置弹窗
});
/**
 * 获取权限列表
 */
const loadTableData = () => {
  tableData.value = [];
  fetchPermissionList(state.queryParams)
    .then((res) => {
      tableData.value = res.data.data || [];
    })
    .catch(() => {});
};
/**
 * 新增编辑保存
 * @param {*} formRef
 */
const onSubmit = async (formRef) => {
  await formRef?.validate((valid, fields) => {
    if (valid) {
      const reqPromise = state.form.id ? updatePermission : createPermission;
      reqPromise(state.form)
        .then((res) => {
          if (res.data.code !== 0) {
            ElMessage.error(res.data.msg);
            return;
          }
          ElMessage.success("保存成功.");
          state.form = {
            ...initForm,
          };
          loadTableData();
          state.dialogVisible = false;
        })
        .catch((err) => {});
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
  loadTableData();
};
/**
 * 重置查询条件
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
const handlePlus = (row) => {
  state.form = {
    ...initForm,
  };
  if (row) {
    state.form.id = row.id;
  }
  state.dialogVisible = true;
};
/**
 * 编辑
 * @param {*} row
 */
const handleEdit = (row) => {
  state.form = {
    ...row,
  };
  state.dialogVisible = true;
};
/**
 * 删除
 * @param {*} row
 */
const handleDelete = (row) => {
  ElMessageBox.confirm("确定删除该条权限信息吗？", "系统提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    let data = {
      id: row.id,
    };
    deletePermission(data).then((res) => {
      ElMessage({
        message: "删除成功.",
        type: "success",
      });
      loadTableData();
    });
  });
};
/**
 * 权限设置
 */
const handleCommand = (command, row) => {
  state.form = row;
  switch (command) {
    case "menu":
      loadMenuList();
      break;
    case "data":
      break;
    case "page":
      break;
    case "oper":
      break;
    default:
      throw new Error("无效指令");
  }
};
/**
 * 获取菜单列表
 */
const loadMenuList = () => {
  state.menuList = [];
  fetchMenuList()
    .then((res) => {
      state.menuList = formatTree(res.data.data, "id", "pid");
      state.menuDialogVisible = true;
      return fetchPermissionMenus({ id: state.form.id });
    })
    .then((res) => {
      state.menuIds = res.data.data;
    })
    .catch(() => {});
};
const onSubmitPermissionMenu = () => {
  let menuIds = [...state.menuIds];
  let data = {
    id: state.form.id,
    menuIds: menuIds.join(","),
  };
  assignMenus(data)
    .then((res) => {
      if (res.data.code !== 0) {
        ElMessage.error(res.data.msg);
        return;
      }
      ElMessage.success("保存成功.");
      state.form = {
        ...initForm,
      };
      loadTableData();
      state.menuDialogVisible = false;
    })
    .catch(() => {});
};
onMounted(() => {
  loadTableData();
});
</script>