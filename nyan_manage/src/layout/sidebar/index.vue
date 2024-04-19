<template>
  <div class="app-sidebar">
    <div class="app-sidebar-header flex-column-cc">
      <p class="app-header-title">
        <font-awesome-icon size="xl" icon="fa-solid fa-registered" />
        <span class="title" v-if="!sidebarStore.isCollapse">NyanShen live</span>
      </p>
    </div>
    <el-menu
      default-active="2"
      :collapse="sidebarStore.isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <template v-for="(item, index) in menuTree">
        <el-sub-menu
          :index="item.path"
          :key="index"
          v-if="item.children?.length > 0"
        >
          <template #title>
            <el-icon v-if="item.icon">
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            :index="subitem.path"
            v-for="(subitem, subindex) in item.children"
            :key="subindex"
          >
            <template #title>
              <el-icon v-if="subitem.icon">
                <component :is="subitem.icon"></component>
              </el-icon>
              <span>{{ subitem.name }}</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item :index="item.path" :key="item.path + index" v-else>
          <template #title>
            <el-icon v-if="item.icon">
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useSidebarStore } from "@store/siderbarStore";
import { useUserStore } from "@store/userStore";
import { formatTree } from "@common/utils";
const sidebarStore = useSidebarStore();
const userStore = useUserStore();
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