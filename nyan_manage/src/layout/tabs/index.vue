<template>
  <div class="app-nav-container">
    <div class="menu-tabs">
      <ul class="menu-tabs-content">
        <li
          class="flex-cc menu-tabs-item"
          v-for="item in opened"
          :key="item.fullPath"
        >
          <router-link to="/home">{{ item.meta.title }}</router-link>
          <font-awesome-icon class="font-icon" size="sm" icon="fa-solid fa-times-circle" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const current = ref(0);
const opened = [
  {
    fullPath: "/user",
    meta: {
      title: "用户管理",
    },
  },
  {
    fullPath: "/menu",
    meta: {
      title: "菜单管理",
    },
  },
];
const handleClick = (e) => {};
const handleTabRemove = (e) => {};
const handleContextmenu = (e) => {};
const isTabClosable = (page) => {};
</script>

<style lang="scss" scoped>
.app-nav-container {
  height: 39px;
  border-bottom: 1px solid #e5e5e5;
  .menu-tabs-content {
    float: left;
    .menu-tabs-item {
      float: left;
      line-height: 39px;
      padding: 0 15px;
      border-right: solid 1px $border-base-color;
      color: $text-desc-color;
      cursor: pointer;
      a {
		margin-right: 8px;
        display: block;
        color: $text-desc-color;
      }
	  .font-icon:hover {
		color: $pink;
	  }
    }
  }
}
</style>