<template>
  <div class="app-container dish">
    <!-- 菜品分类 -->
    <div class="app-search-container mgb10">
      <el-form :model="state.queryParams" ref="queryForm" :inline="true">
        <el-form-item label="菜品名称" prop="name">
          <el-input
            v-model="state.queryParams.name"
            placeholder="请输入菜品名称"
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
    <div class="flx app-content-container">
      <ul class="ul-list">
        <li class="li-title mgb10">选择菜品分类查询</li>
        <li
          class="li-item"
          v-for="(item, index) in state.categories"
          :key="index"
          :class="{
            actived: item.id === state.queryParams.categoryId,
          }"
          @click="handleSelectCategory(item)"
        >
          <span>
            {{ item.name }}
          </span>
        </li>
      </ul>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
      >
        <el-table-column prop="imageUrl" label="菜品图片">
          <template #default="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.imageUrl"
              fit="fill"
            />
          </template>
        </el-table-column>
        <el-table-column prop="category.name" label="菜品类别" />
        <el-table-column prop="name" label="菜品名称" />
        <el-table-column prop="price" label="菜品价格" />
        <el-table-column prop="description" label="菜品描述" />
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
                  <el-dropdown-item command="option">菜品选项</el-dropdown-item>
                  <el-dropdown-item command="specification"
                    >菜品规格</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 菜品新增编辑 -->
    <el-dialog
      v-model="state.dialogVisible"
      :title="state.form.id ? '编辑操作' : '新增操作'"
      width="800"
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
        <el-form-item label="菜品图片" prop="imageUrl">
          <el-upload
            class="uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
          >
            <img
              v-if="state.form.imageUrl"
              :src="state.form.imageUrl"
              class="img"
            />
            <el-icon v-else class="uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="菜品名称" prop="name">
          <el-input v-model="state.form.name" />
        </el-form-item>
        <el-form-item label="菜品价格" prop="price">
          <el-input v-model="state.form.price" />
        </el-form-item>
        <el-form-item label="菜品分类" prop="categoryId">
          <el-select v-model="state.form.categoryId" style="width: 240px">
            <el-option
              v-for="item in state.categories"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="state.form.status">
            <el-radio :value="1">启用</el-radio>
            <el-radio :value="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜品描述" prop="description">
          <el-input v-model="state.form.description" type="textarea" />
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
    <!-- 菜品选项新增删除 -->
    <el-dialog
      v-model="optionDialogVisible"
      title="菜品选项管理"
      width="800"
      align-center
      draggable
    >
      <div class="dish-option-form mb-20">
        <div class="flx">
          <div class="mr-15">
            <el-select
              v-model="optionIds"
              multiple
              placeholder="请选择需要新增的菜品选项(多选)"
              style="width: 260px"
            >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :disabled="item.disabled"
              />
            </el-select>
          </div>
          <el-button type="primary" @click="bindDishOptions(state.form.id)">
            批量新增
          </el-button>
          <el-button type="danger" @click="deleteDishOptions(state.form.id)">
            批量删除
          </el-button>
        </div>
      </div>
      <el-table
        ref="multipleTableRef"
        :data="dishOptions"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="80" />
        <el-table-column property="name" label="名称" />
        <el-table-column property="priceAddition" label="价格" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button
              link
              type="danger"
              size="small"
              @click.prevent="deleteOptionRow(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
  
  <script setup>
import { Delete, Edit, Plus, Search, Refresh } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  fetchCategoryOptions,
  fetchDishList,
  createDish,
  updateDish,
  removeDish,
} from "@api/modules/onlineOrder";
import { useDishOption } from "./optionMixin";
const {
  options,
  dishOptions,
  optionIds,
  delOptionIds,
  optionDialogVisible,
  loadDishOptionList,
  bindDishOptions,
  deleteDishOptions,
  handleSelectionChange,
} = useDishOption();
const uploadUrl = `${import.meta.env.VITE_FILE_URL}/file/upload`;
const tableData = ref([]);
const formRef = ref(null);
const formRules = ref({
  imageUrl: [
    {
      required: true,
      message: "Please upload image",
      trigger: "blur",
    },
  ],
  price: [
    {
      required: true,
      message: "Please input dish rpice",
      trigger: "blur",
    },
  ],
  name: [
    {
      required: true,
      message: "Please input dish name",
      trigger: "blur",
    },
  ],
});
const queryForm = ref(null);
const initForm = {
  categoryId: null,
  imageUrl: "",
  name: "",
  price: "",
  description: "",
  status: 1,
};
const initQuery = {
  name: "",
  categoryId: null,
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
  categories: [], // 选择分类
});

/**
 * 获取菜品列表
 */
const loadList = () => {
  fetchDishList(state.queryParams).then((res) => {
    tableData.value = res.data.data;
  });
};
/**
 * 获取菜品类别列表用于查询新增修改
 */
const loadCategoryList = () => {
  fetchCategoryOptions().then((res) => {
    state.categories = res.data.data;
  });
};
/**
 * 提交新增/编辑数据
 */
const onSubmit = async (formRef) => {
  await formRef?.validate((valid, fields) => {
    if (valid) {
      const reqPromise = state.form.id ? updateDish : createDish;
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
  handleQuery();
};
/**
 * 根据类别查询
 */
const handleSelectCategory = (item) => {
  state.queryParams.categoryId = item.id;
  loadList();
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
    removeDish(data).then((res) => {
      ElMessage({
        message: "删除成功.",
        type: "success",
      });
      loadList();
    });
  });
};
/**
 * 更多操作
 */
const handleCommand = (command, row) => {
  state.form = row;
  switch (command) {
    case "option":
      loadDishOptionList(state.form.id);
      optionDialogVisible.value = true;
      break;
    case "specification":
      break;
    default:
      throw new Error("无效指令");
  }
};

/**
 * 菜单选项 - 删除单项
 */
const deleteOptionRow = (optionId) => {
  delOptionIds.value = [optionId];
  deleteDishOptions(state.form.id);
};
/**
 * 图片上传成功
 */
const handleUploadSuccess = (res) => {
  state.form.imageUrl = res.data;
};
onMounted(() => {
  loadList();
  loadCategoryList();
});
</script>
<style>
.uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
</style>
<style lang="scss" scoped>
.ul-list {
  width: 180px;
  font-size: 14px;
  margin-right: 20px;
  border-radius: 2px;
  padding: 15px;
  color: #333;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  .li-title {
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  .li-item {
    padding: 6px 5px;
    cursor: pointer;
    &:hover {
      color: var(--el-color-primary);
    }
    &.actived {
      font-weight: 500;
      color: var(--el-color-primary);
    }
  }
}
.uploader {
  .img {
    width: 100px;
    height: 100px;
  }
  .uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
}
</style>