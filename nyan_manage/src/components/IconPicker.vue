<!-- IconPicker.vue -->
<template>
  <div class="icon-picker">
    <!-- 选择图标按钮及图标显示 -->
    <el-input
      v-model="selectedIcon"
      placeholder="Please select an icon"
      
    >
      <template #prepend>
        <el-icon size="large">
          <component :is="selectedIcon || 'ElIcon'"></component>
        </el-icon>
      </template>
      <template #append>
        <el-button @click="togglePopover"> 选择图标 </el-button>
      </template>
    </el-input>
    <!-- 图标选择面板 -->
    <div class="icon-wrapper" :class="{ show: popoverVisible }">
      <div class="icon-grid">
        <el-icon
          v-for="(iconComponent, iconName) in icons"
          :key="iconName"
          size="small"
          :class="{ active: selectedIcon === iconName }"
          @click="selectIcon(iconName)"
        >
          <component :is="iconName" />
        </el-icon>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { defineComponent, ref } from "vue";
import * as allIcons from "@element-plus/icons-vue";

export default defineComponent({
  props: {
    // 绑定的图标名称(图标组件名称)
    // 默认为空，表示未选择任何图标
    modelValue: String,
    // 可以传入自定义的图标列表，如果没有则使用所有Element Plus图标
    customIcons: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["updateIcon"],
  watch: {
    modelValue(val) {
      this.selectedIcon = val;
    },
  },
  setup(props, conext) {
    const popoverVisible = ref(false); // 弹出框是否可见
    const selectedIcon = ref(props.modelValue); // 当前选中的图标名称

    function togglePopover() {
      popoverVisible.value = !popoverVisible.value;
    }
    /**
     * 选择图标
     */
    function selectIcon(iconName) {
      selectedIcon.value = iconName;
      conext.emit("updateIcon", selectedIcon.value);
      togglePopover();
    }

    return {
      popoverVisible,
      selectedIcon,
      icons: { ...allIcons, ...props.customIcons },
      togglePopover,
      selectIcon,
    };
  },
});
</script>
  
  <style lang="scss" scoped>
.icon-picker {
  width: 100%;
}
.icon-wrapper {
  padding: 15px 5px;
  height: 300px;
  overflow: auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: none;
  z-index: 999;
  background: #fff;
  &.show {
    display: block;
  }
}
.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
  grid-gap: 20px;
  justify-items: center;
  background: #fff;
  cursor: pointer;
  .el-icon {
    &:hover {
      scale: 2.5;
    }
  }
}

.icon-grid .el-button.active {
  background-color: #f2f6fc;
  border-color: #dcdfe6;
}
</style>