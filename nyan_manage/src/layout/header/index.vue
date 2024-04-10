<template>
  <div class="app-header-body flex-sbc">
    <el-icon @click="sidebarStore.toggleIsCollapse()">
      <font-awesome-icon size="md" icon="fa-solid fa-bars" />
    </el-icon>
    <div class="flex-cc">
      <div class="app-header-right flex-cc">
        <img class="user-avatar" :src="userStore.userAvatar" alt="" />
        <div class="user-name">{{ userStore.name }}</div>
        <ul class="dropdown-menu show">
          <li>
            <font-awesome-icon size="sm" icon="fa-solid fa-user" />
            个人中心
          </li>
          <li>
            <font-awesome-icon size="sm" icon="fa-solid fa-key" />
            修改密码
          </li>
          <li class="divider">
            <font-awesome-icon size="sm" icon="fa-solid fa-sign-out" />
            退出登录
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useSidebarStore } from "@store/siderbarStore";
import { useUserStore } from "@store/userStore";
const sidebarStore = useSidebarStore();
const userStore = useUserStore();
</script>
<style lang="scss" scoped>
.app-header-body {
  height: 100%;
  padding-left: 15px;
}
.app-header-right {
  position: relative;
  padding: 0 15px;
  .user-avatar {
    width: 45px;
    height: 45px;
    margin-right: 10px;
    border-radius: 50%;
    overflow: hidden;
  }
  .user-name {
    cursor: pointer;
  }
  .dropdown-menu {
    position: absolute;
    top: $app-header-height;
    right: 0;
    width: 148px;
    background-color: $white-color;
    color: #676a6c;
    z-index: 9999;
    li {
      padding: 10px 30px;
      cursor: pointer;
      &:hover {
        background-color: #f2f2f2;
        color: $primary-light-color;
      }
      &.divider {
        border-top: 1px solid #f2f2f2;
      }
    }
  }
}
</style>