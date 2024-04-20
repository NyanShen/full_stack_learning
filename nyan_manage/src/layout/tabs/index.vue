<template>
  <div class="app-nav-container flex-csb">
    <el-icon class="icon-left" @click="handleScrollLeft"
      ><DArrowLeft
    /></el-icon>
    <div
      ref="scrollbarRef"
      class="app-nav-scroll"
      :style="{ width: scrollbarWidth }"
    >
      <ul
        class="menu-tabs-content"
        ref="menuTabRef"
        :style="{ width: menuTabWidth, left: menuTabLeft + 'px' }"
      >
        <li
          class="menu-tabs-item"
          :class="{ actived: homeOpend.fullPath === current.fullPath }"
          @click="changeMenu(homeOpend)"
        >
          <router-link :to="homeOpend.fullPath">
            {{ homeOpend.meta.title }}
          </router-link>
        </li>
        <li
          class="menu-tabs-item"
          :class="{ actived: item.fullPath === current.fullPath }"
          v-for="item in opened"
          :key="item.fullPath"
          @click="changeMenu(item)"
        >
          <div class="flex-cc">
            <router-link :to="item.fullPath">{{ item.meta.title }}</router-link>
            <font-awesome-icon
              class="font-icon"
              size="sm"
              icon="fa-solid fa-times-circle"
            />
          </div>
        </li>
      </ul>
    </div>
    <el-icon class="icon-right" @click="handleScrollRight"
      ><DArrowRight
    /></el-icon>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from "vue";
const homeOpend = {
  fullPath: "/home",
  meta: {
    title: "首页",
  },
};
const current = ref(homeOpend);
const scrollbarRef = ref(null);
const menuTabRef = ref(null);
const menuTabLeft = ref(0);
const scrollbarWidth = computed(() => {
  if (!scrollbarRef.value) return "100%";
  return scrollbarRef.value.offsetWidth + "px";
});
const menuTabWidth = computed(() => {
  if (menuTabRef.value) {
    const liWidths = Array.from(menuTabRef.value.children).map(
      (li) => li.offsetWidth
    );
    return liWidths.reduce((a, b) => a + b, 0) + "px";
  }
  return "100%";
});
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
  }
];
/**
 * @description 点击往左滚动
 *
 */
const handleScrollLeft = () => {
  if (menuTabLeft.value < 0) {
    menuTabLeft.value = menuTabLeft.value + scrollbarRef.value.offsetWidth;
  }
};
/**
 * @description 点击往右滚动
 * menuTabLeft 为负数
 */
const handleScrollRight = () => {
  if (-menuTabLeft.value + scrollbarRef.value.offsetWidth < menuTabRef.value.scrollWidth) {
    menuTabLeft.value = menuTabLeft.value - scrollbarRef.value.offsetWidth;
  }
};
const changeMenu = (item) => {
  current.value = item;
};
onMounted(() => {
  nextTick(() => {});
});
</script>

<style lang="scss" scoped>
.app-nav-container {
  height: 39px;
  border-bottom: 1px solid #e5e5e5;
  .el-icon {
    cursor: pointer;
    height: 100%;
    padding: 0 5px;
    color: $text-desc-color;
    &:hover {
      background-color: #f2f2f2;
    }
    &.icon-left {
      border-right: 1px solid $border-base-color;
    }
    &.icon-right {
      border-left: 1px solid $border-base-color;
    }
  }
  .app-nav-scroll {
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .menu-tabs-content {
    position: absolute;
    bottom: 0;
    transition: all .4s cubic-bezier(.645, .045, .355, 1); // 滚动动画
    .menu-tabs-item {
      display: inline-block;
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