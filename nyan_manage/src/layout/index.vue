<template>
  <el-container class="container">
    <el-aside>
      <AppSidebar />
    </el-aside>
    <el-container>
      <el-header>
        <div class="app-header-container">
          <AppHeader />
        </div>
        <div class="flx-row main-tabs">
          <AppTabs />
        </div>
      </el-header>
      <el-main>
        <div class="main-box">
          <router-view></router-view>
        </div>
      </el-main>
      <el-footer>
        <div class="copyright">NyanShen@2024</div>
      </el-footer>
    </el-container>
  </el-container>
</template>
<script setup>
import AppHeader from "./header/index.vue";
import AppTabs from "./tabs/index.vue";
import AppSidebar from "./sidebar/index.vue";
</script>
<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .el-aside {
    width: auto;
    overflow: inherit;
  }

  .el-header,
  .el-footer {
    height: auto;
    padding: 0;
  }
  .app-header-container {
    height: $app-header-height;
    background-color: $primary-light-color;
    color: $white-color;
  }

  .main-tabs {
    width: 100%;
    background-color: #fff;
    border: 0;
    box-shadow: none;
    overflow: hidden;
  }

  .el-main {
    background: #f0f2f5;
    padding: 10px 13px;
    box-sizing: border-box;
    // min-width: 1020px;
    // 防止切换出现横向滚动条
    overflow-x: hidden;

    .main-box {
      width: 100%;
      height: 100%;
      // background-color: #f5f5f5;
      // box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      // border-radius: 4px;
      // padding: 20px;
      box-sizing: border-box;
      overflow: auto;
      overflow-x: hidden !important;

      &::-webkit-scrollbar {
        background-color: white;
      }
    }
  }

  .el-footer {
    text-align: center;
    font-size: 12px;
  }
}

.shake {
  animation: shake 0.5s linear;
}

@keyframes shake {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}
</style>