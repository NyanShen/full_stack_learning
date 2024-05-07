<template>
  <view class="uni-container">
    <!-- 水印覆盖层 -->
    <view class="watermark"> Sample Watermark </view>
    <!-- 页面元素层 -->
    <view class="uni-content"> 页面元素内容 </view>
  </view>
</template>
  
  <script setup>
</script>
  
  <style lang="scss" scoped>
.uni-container {
  height: 100%;
  background-color: #f8f8f8;
  font-family: Arial, sans-serif;
  overflow-x: hidden; /* 防止滚动条影响水印 */
}
.watermark {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 100px;
  color: rgba(0, 0, 0, 0.1);
  user-select: none; /* 阻止文本选择 */
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.1); /* 透明阴影效果 */
  pointer-events: none; /* 禁止水印响应鼠标事件 */
  z-index: 999;
  mix-blend-mode: multiply; /* 混合模式，让水印和背景融合 */
  transform-origin: center center;
  transform: rotate(30deg); /* 缩放和旋转水印 */
  -webkit-font-smoothing: antialiased; /* 提高抗锯齿效果 */
  -moz-osx-font-smoothing: grayscale;
}
.uni-content {
  height: 100%;
  margin-top: 100px; /* 调整内容区域以避开水印 */
  text-align: justify;
  overflow: auto;
}
</style>