<template>
    <div class="app-container option">
      <!-- 菜品选项 -->
      <div class="app-search-container mgb10">
        <el-form :model="state.queryParams" ref="queryForm" :inline="true">
          <el-form-item label="菜品选项名称" prop="name">
            <el-input
              v-model="state.queryParams.name"
              placeholder="请输入菜品选项名称"
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
          <el-table-column prop="name" label="菜品选项名称" />
          <el-table-column prop="priceAddition" label="菜品选项价格" />
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <dict-tag dictType="status" :dictKey="scope.row.status" />
            </template>
          </el-table-column>
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
        :title="state.form.id ? '编辑操作' : '新增操作'"
        width="600"
        align-center
        draggable
      >
        <el-form
          :inline="false"
          :model="state.form"
          label-width="115"
          ref="formRef"
          :rules="formRules"
          class="dialog-form-inline"
        >
          <el-form-item label="菜品选项名称" prop="name">
            <el-input v-model="state.form.name" />
          </el-form-item>
          <el-form-item label="菜品选项价格" prop="priceAddition">
            <el-input v-model="state.form.priceAddition" />
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
    fetchOptionList,
    createOption,
    updateOption,
    removeOption,
  } from "@api/modules/onlineOrder";
  const tableData = ref([]);
  const formRef = ref(null);
  const formRules = ref({
    name: [
      {
        required: true,
        message: "Please input option name",
        trigger: "blur",
      },
    ],
    priceAddition: [
      {
        required: true,
        message: "Please input priceAddition",
        trigger: "blur",
      },
    ],
  });
  const queryForm = ref(null);
  const initForm = {
    name: "",
    priceAddition: "",
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
    // 权限选择
    checkAll: false,
    isIndeterminate: false,
    permissions: [],
    permissionIds: [],
  });
  /**
   * 获取菜品选项列表
   */
  const loadList = () => {
    fetchOptionList(state.queryParams).then((res) => {
      tableData.value = res.data.data;
    });
  };
  /**
   * 提交新增/编辑数据
   */
  const onSubmit = async (formRef) => {
    await formRef?.validate((valid, fields) => {
      if (valid) {
        const reqPromise = state.form.id ? updateOption : createOption;
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
  };
  /**
   * 删除
   * @param {*} row
   */
  const handleDelete = (row) => {
    ElMessageBox.confirm("确定删除该条操作信息吗？", "系统提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      let data = {
        id: row.id,
      };
      removeOption(data).then((res) => {
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
  <style lang="scss" scoped>
  .el-checkbox {
    display: flex;
    align-items: flex-start;
    width: 100%;
  }
  </style>