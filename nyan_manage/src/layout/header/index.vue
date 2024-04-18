<template>
  <div class="app-header-body flex-sbc">
    <el-icon @click="sidebarStore.toggleIsCollapse()">
      <font-awesome-icon size="sm" icon="fa-solid fa-bars" />
    </el-icon>
    <div class="flex-cc">
      <div class="app-header-right-item flex-cc" @click="fullscreenStore.toggle">
        <font-awesome-icon size="sm" icon="fa-solid fa-expand-arrows-alt" />
        <span>全屏</span>
      </div>
      <div class="app-header-right-item flex-cc">
        <img class="user-avatar" :src="userStore.userAvatar" alt="" />
        <div class="user-name">{{ userStore.name }}</div>
        <ul class="dropdown-menu">
          <li @click="toProfile">
            <font-awesome-icon size="sm" icon="fa-solid fa-user" />
            个人中心
          </li>
          <li>
            <font-awesome-icon size="sm" icon="fa-solid fa-key" />
            修改密码
          </li>
          <li class="divider" @click="logout">
            <font-awesome-icon size="sm" icon="fa-solid fa-sign-out" />
            退出登录
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useSidebarStore } from "@store/siderbarStore";
import { useUserStore } from "@store/userStore";
import { useFullscreenStore } from "@store/fullscreenStore";
import $message from "@common/message";
const router = useRouter();
const sidebarStore = useSidebarStore();
const userStore = useUserStore();
const fullscreenStore = useFullscreenStore();
/**
 * 登录记录日志后退出登录
 */
const logout = () => {
  $message
    .warnConfirm("确定注销并退出系统吗？")
    .then(() => {
      userStore.logout();
      location.href = "/";
    })
    .catch(() => {});
};
/**
 * personal center
 */
const toProfile = () => {
  router.push('/user/profile');
}
onMounted(() => {
  fullscreenStore.init();
})
onUnmounted(() => {
  fullscreenStore.destroy();
})
</script>
<style lang="scss" scoped>
.app-header-body {
  height: 100%;
  padding-left: 15px;
}
.app-header-right-item {
  position: relative;
  height: $app-header-height;
  font-size: $fs-md;
  padding: 0 15px;
  cursor: pointer;
 
  &:hover {
    background-color: $primary-dark-color;
    .dropdown-menu {
      visibility: visible;
    }
  }
  .user-avatar {
    width: 45px;
    height: 45px;
    margin-right: 10px;
    border-radius: 50%;
    overflow: hidden;
  }
  .user-name {
    font-weight: 500;
  }
  .dropdown-menu {
    visibility: hidden;
    position: absolute;
    top: $app-header-height;
    right: 0;
    width: 148px;
    background-color: $white-color;
    color: #676a6c;
    z-index: 9999;
    li {
      padding: 15px 30px;
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