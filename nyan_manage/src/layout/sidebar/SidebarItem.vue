<template>
  <div>
    <el-sub-menu :index="resolvePath(item.path)" v-if="item.children?.length > 0">
      <template #title>
        <el-icon v-if="item.icon">
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.name }}</span>
      </template>
      <sidebar-item
        v-for="(subitem, subindex) in item.children"
        :key="subitem.path + '_' + subindex"
        :item="subitem"
        :base-path="resolvePath(item.path)"
      >
      </sidebar-item>
    </el-sub-menu>
    <router-link :to="resolvePath(item.path)" v-else>
      <el-menu-item :index="resolvePath(item.path)">
        <template #title>
          <el-icon v-if="item.icon">
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
      </el-menu-item>
    </router-link>
  </div>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  basePath: {
    type: String,
    default: "",
  },
});
const resolvePath = (routePath) => {
  if (props.basePath) {
    return `${props.basePath}/${routePath}`;
  } else {
    return `/${routePath}`;
  }
};
</script>