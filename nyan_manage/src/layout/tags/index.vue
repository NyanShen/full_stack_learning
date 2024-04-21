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
        class="menu-tags-content"
        ref="menuTagRef"
        :style="{ width: menuTagWidth, left: menuTagLeft + 'px' }"
      >
        <li
          class="menu-tags-item"
          :class="{ actived: defaultTag.fullPath === current.fullPath }"
          @click="changeTag(defaultTag)"
        >
          <router-link :to="defaultTag.fullPath">
            {{ defaultTag.meta.title }}
          </router-link>
        </li>
        <li
          class="menu-tags-item"
          :class="{ actived: item.fullPath === current.fullPath }"
          v-for="item in opened"
          :key="item.fullPath"
        >
          <div class="flex-cc">
            <router-link @click="changeTag(item)" :to="item.fullPath">
              {{ item.meta.title }}
            </router-link>
            <font-awesome-icon
              class="font-icon"
              size="sm"
              icon="fa-solid fa-times-circle"
              @click="closeTag(item)"
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
import { useRoute, useRouter } from "vue-router";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useTagStore } from "@store/tagStore";

const route = useRoute();
const router = useRouter();
const tagStore = useTagStore();
const scrollbarRef = ref(null); // 滚动bar页面ref
const menuTagRef = ref(null); // 滚动content页面ref
const menuTagLeft = ref(0); // 滚动距离
const menuTagWidth = ref("100%"); // 滚动content页面宽度
const current = ref({}); // 当前tag
const opened = computed(() => tagStore.opened); // 打开的tag
const defaultTag = computed(() => tagStore.defaultTag); // 默认tag
// 滚动
const scrollbarWidth = computed(() => {
  if (!scrollbarRef.value) return "100%";
  return scrollbarRef.value.offsetWidth + "px";
});

/**
 * 重新计算menuTag的宽度
 */
const getMenuTagWidth = () => {
  nextTick(() => {
    if (menuTagRef.value?.children) {
      const liWidths = Array.from(menuTagRef.value.children).map(
        (li) => li.offsetWidth
      );
      return liWidths.reduce((a, b) => a + b, 0) + "px";
    }
    return "100%";
  });
};
/**
 * 监听路由变化, 新增及处理当前tag
 */
watch(route, (newRoute) => {
  // 如果不是当前路由则切换
  if (newRoute.fullPath !== current.value.fullPath) {
    const target = {
      fullPath: newRoute.fullPath,
      meta: newRoute.meta,
    };
    target.fullPath !== defaultTag.value.fullPath && tagStore.setOpened(target);
    current.value = target;
    menuTagWidth.value = getMenuTagWidth();
  }
});
/**
 * @description 点击往左滚动
 *
 */
const handleScrollLeft = () => {
  if (menuTagLeft.value < 0) {
    menuTagLeft.value = menuTagLeft.value + scrollbarRef.value.offsetWidth;
  }
};
/**
 * @description 点击往右滚动
 * menuTagLeft 为负数
 */
const handleScrollRight = () => {
  if (
    -menuTagLeft.value + scrollbarRef.value.offsetWidth <
    menuTagRef.value.scrollWidth
  ) {
    menuTagLeft.value = menuTagLeft.value - scrollbarRef.value.offsetWidth;
  }
};
/**
 * 切换Tag
 * @param {*} item
 */
const changeTag = (item) => {
  current.value = item;
};
/**
 * @description 关闭Tag
 * @param {*} item
 * 如果关闭是当前页面,则往后找tag, 往后没有tag,则往前找, 如果往前找没有了,直接定位到首页
 */
const closeTag = (item) => {
  if (current.value.fullPath === item.fullPath) {
    const nextTag = tagStore.getNextTag(item);
    router.push(nextTag.fullPath);
  }
  tagStore.removeTag(item);
};

onMounted(() => {
  // 重新加载时设置当前路由
  if (route.fullPath === defaultTag.value.fullPath) {
    current.value = defaultTag.value;
  } else {
    current.value = {
      fullPath: route.fullPath,
      meta: route.meta,
    };
    tagStore.setOpened(current.value);
    menuTagWidth.value = getMenuTagWidth();
  }
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
  .menu-tags-content {
    position: absolute;
    bottom: 0;
    transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1); // 滚动动画
    .menu-tags-item {
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