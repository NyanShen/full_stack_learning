<template>
  <div class="app-sidebar">
    <div class="app-sidebar-header flex-column-cc">
      <p class="app-header-title">
        <font-awesome-icon size="xl" icon="fa-solid fa-registered" />
        <span class="title" v-if="!sidebarStore.isCollapse">NyanShen live</span>
      </p>
    </div>
    <el-scrollbar> </el-scrollbar>
    <el-menu
      :default-active="activeMenu"
      :collapse="sidebarStore.isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <sidebar-item
        v-for="(item, index) in menuTree"
        :key="item.path + '_' + index"
        :item="item"
      >
      </sidebar-item>
    </el-menu>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useSidebarStore } from "@store/siderbarStore";
import { useUserStore } from "@store/userStore";
import { formatTree } from "@common/utils";
import SidebarItem from "./SidebarItem.vue";
const sidebarStore = useSidebarStore();
const userStore = useUserStore();
const activeMenu = ref("/home");
const handleOpen = (key, keyPath) => {
  console.log("handleOpen>>>", key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log("handleOpen>>>", key, keyPath);
};
/**
 * 遍历用户缓存的菜单树, 去除详情类型菜单
 */
const menuData = userStore.menus.filter((item) => item.level !== 3);
const menuTree = formatTree(menuData, "id", "pid");
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
<style lang="scss" scoped>
.app-sidebar-header {
  height: $app-header-height;
  padding: 0 20px;
  background-color: $primary-dark-color;
  color: $white-color;
  .el-element {
    width: 200px;
  }
  .app-header-logo {
    font-size: $fs-lg;
    font-weight: bold;
  }
  .app-header-title {
    .title {
      margin-left: 10px;
    }
  }
}
</style>