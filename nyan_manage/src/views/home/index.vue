<template>
  <div class="home">
    <div v-watermark="{text: 'NyanShen'}"></div>
    hello home
    <font-awesome-icon icon="fa-solid fa-coffee" />
    permission test: 
    <el-button v-hasPermi="['default']">
      测试权限
    </el-button>
  </div>
</template>

<script setup>
</script>
<style scoped>
.home {
  position: relative;
  height: 100%;
}
</style>