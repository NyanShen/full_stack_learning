<template>
  <div class="app-nav-container">
    <div class="menu-tabs">
      <ul class="menu-tabs-content">
        <li
          class="flex-cc menu-tabs-item"
          :class="{ actived: homeOpend.fullPath === current.fullPath }"
          @click="changeMenu(homeOpend)"
        >
          <router-link :to="homeOpend.fullPath">
            {{ homeOpend.meta.title }}
          </router-link>
        </li>
        <li
          class="flex-cc menu-tabs-item"
          :class="{ actived: item.fullPath === current.fullPath }"
          v-for="item in opened"
          :key="item.fullPath"
          @click="changeMenu(item)"
        >
          <router-link :to="item.fullPath">{{ item.meta.title }}</router-link>
          <font-awesome-icon
            class="font-icon"
            size="sm"
            icon="fa-solid fa-times-circle"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const homeOpend = {
  fullPath: "/home",
  meta: {
    title: "首页",
  },
};
const current = ref(homeOpend);

const opened = [
{
    fullPath: "/system/permission",
    meta: {
      title: "权限管理",
    },
  },
  {
    fullPath: "/system/department",
    meta: {
      title: "部门管理",
    },
  },
  {
    fullPath: "/system/user",
    meta: {
      title: "用户管理",
    },
  },
  {
    fullPath: "/system/role",
    meta: {
      title: "角色管理",
    },
  },
  {
    fullPath: "/system/menu",
    meta: {
      title: "菜单管理",
    },
  },
  {
    fullPath: "/system/operation",
    meta: {
      title: "操作管理",
    },
  },
];
const changeMenu = (item) => {
  current.value = item;
};
</script>

<style lang="scss" scoped>
.app-nav-container {
  height: 39px;
  border-bottom: 1px solid #e5e5e5;
  .menu-tabs-content {
    float: left;
    .menu-tabs-item {
      float: left;
      font-size: $fs-sm;
      font-weight: 500;
      line-height: 39px;
      padding: 0 15px;
      border-right: solid 1px $border-base-color;
      color: $text-desc-color;
      cursor: pointer;

      &:hover {
        background: $bg-color;
      }
      &.actived {
        background: $bg-active-color;
        a {
          color: $text-nav-active-color;
        }
        .font-icon {
          color: $text-desc-color;
          &:hover {
            color: $text-nav-active-color;
          }
        }
      }
      a {
        display: block;
        color: $text-desc-color;
      }
      .font-icon {
        margin-left: 8px;
        &:hover {
          color: $pink;
        }
      }
    }
  }
}
</style>