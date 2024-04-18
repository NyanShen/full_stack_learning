<template>
  <div class="app-container menu">
    <!-- 查询 -->
    <div class="app-search-container mgb10">
      <el-form :model="state.queryParams" ref="queryForm" :inline="true">
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="state.queryParams.name"
            placeholder="请输入名称"
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
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="path" label="当前路径" />
        <el-table-column prop="level" label="类型">
          <template #default="scope">
            <dict-tag dictType="menu" :dictKey="scope.row.level"></dict-tag>
          </template>
        </el-table-column>
        <el-table-column prop="icon" label="图标" />
        <el-table-column prop="sort" label="排序" />
        <el-table-column prop="createdAt" label="创建时间" />
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
              type="success"
              :icon="Plus"
              @click="handlePlus(scope.row)"
            >
              新增
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
    <!-- 添加编辑菜弹窗-->
    <el-dialog
      v-model="state.dialogVisible"
      :title="state.form.id ? '编辑菜单' : '新增菜单'"
      width="800"
      align-center
      draggable
    >
      <el-form
        :model="state.form"
        label-width="160"
        style="max-width: 680px"
        ref="formRef"
        :rules="formRules"
        class="dialog-form"
      >
        <el-form-item label="上级菜单" prop="pid">
          <el-tree-select
            v-model="state.form.pid"
            :data="menuList"
            value-key="id"
            :render-after-expand="false"
            :props="{ value: 'id', label: 'name', children: 'children' }"
            check-strictly
            show-checkbox
            check-on-click-node
            placeholder="请选择上级菜单"
          />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="state.form.name" />
        </el-form-item>
        <el-form-item label="类型" prop="level">
          <el-radio-group
            v-model="state.form.level"
            class="el-radio-group_whole"
          >
            <el-radio :value="1">目录</el-radio>
            <el-radio :value="2">菜单</el-radio>
            <el-radio :value="3">详情</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前路径" prop="path">
          <el-input
            v-model="state.form.path"
            placeholder="填写访问路径的当前路径,按层级模块填写"
          />
        </el-form-item>
        <template v-if="state.form.level === 2 || state.form.level === 3">
          <el-form-item label="路径参数" prop="params">
            <el-input v-model="state.form.params" placeholder="格式:?id=xxx" />
          </el-form-item>
          <el-form-item label="组件路径" prop="component">
            <el-input
              v-model="state.form.component"
              placeholder="格式:/system/user/index"
            />
          </el-form-item>
          <div class="flex-c">
            <el-form-item label="打开方式" prop="outlink">
              <el-radio-group v-model="state.form.outlink">
                <el-radio value="tag">标签</el-radio>
                <el-radio value="_blank">新窗口</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="使用缓存" prop="noCache">
              <el-radio-group v-model="state.form.noCache">
                <el-radio :value="true">使用</el-radio>
                <el-radio :value="false">不使用</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </template>

        <el-form-item label="图标" prop="icon">
          <el-input v-model="state.form.icon" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="state.form.sort" type="number" />
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
  </div>
</template>

<script setup>
import { Delete, Edit, Plus, Search, Refresh } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  fetchMenuList,
  createMenu,
  updateMenu,
  deleteMenu,
} from "@api/modules/menu";
import { formatTree } from "@common/utils.js";
let pmenu = {
  id: 0,
  name: "主目录",
  children: [],
};
const menuList = ref([]);
const tableData = ref([]);
const formRef = ref(null);
const formRules = ref({
  pid: [
    {
      required: true,
      message: "Please input menu pid",
      trigger: "blur",
    },
  ],
  name: [
    {
      required: true,
      message: "Please input menu name",
      trigger: "blur",
    },
  ],
  level: [
    {
      required: true,
      message: "Please input menu type",
      trigger: "blur",
    },
  ],
  sort: [
    {
      required: true,
      message: "Please input menu sort",
      trigger: "blur",
    },
  ],
});
const queryForm = ref(null);
const initForm = {
  pid: 0,
  code: "",
  name: "",
  path: "",
  level: "",
  icon: "",
  params: "",
  component: "",
  outlink: "tag",
  noCache: false,
  status: 1,
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
const loadMenuList = () => {
  tableData.value = [];
  menuList.value = [];
  fetchMenuList(state.queryParams).then((res) => {
    const menuTree = formatTree(res.data.data, "id", "pid");
    pmenu.children = menuTree;
    menuList.value.push(pmenu);
    tableData.value = menuTree;
  });
};
/**
 * 新增修改数据
 */
const onSubmit = async (formRef) => {
  await formRef?.validate((valid, fields) => {
    if (valid) {
      const reqPromise = state.form.id ? updateMenu : createMenu;
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
          loadMenuList();
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
  loadMenuList();
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
  if (row?.id) {
    state.form.pid = row.id;
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
  ElMessageBox.confirm(`确定删除[${row.name}]菜单信息吗？`, "系统提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    let data = {
      id: row.id,
    };
    deleteMenu(data).then((res) => {
      ElMessage({
        message: "删除成功.",
        type: "success",
      });
      loadMenuList();
    });
  });
};
onMounted(() => {
  loadMenuList();
});
</script>