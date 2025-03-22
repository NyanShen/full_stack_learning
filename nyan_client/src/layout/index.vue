<template>
  <el-container class="container">
    <el-aside width="60px">
      <AppAside />
    </el-aside>
    <router-view></router-view>
  </el-container>
</template>
<script setup>
import AppAside from "./appAside/index.vue";
</script>
<style lang="scss" scoped>
</style>