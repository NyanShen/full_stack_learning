<!-- components/ResultCard.vue -->
<template>
    <view class="card-container" @click="handleClick">
      <text class="title">{{ data.title }}</text>
      <text class="content">{{ data.content }}</text>
      <view class="meta-info">
        <text class="source">{{ data.source }}</text>
        <text class="time">{{ data.time }}</text>
      </view>
    </view>
  </template>
  <script setup>
  defineProps({
      data: {
        type: Object,
        required: true
      }
  })
</script>
  
  <style lang="scss">

  // 全局文本截断混合
  @mixin text-ellipsis($lines) {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: $lines;
    overflow: hidden;
  }
  
  // 弹性布局混合
  @mixin flex($direction: row, $justify: flex-start) {
    display: flex;
    flex-direction: $direction;
    justify-content: $justify;
    align-items: center;
  }
  .card-container {
    margin: 24rpx 32rpx;
    padding: 32rpx;
    background: #FFF;
    border-radius: 16rpx;
    box-shadow: $shadow-default;
  
    .title {
      display: block;
      font-size: 34rpx;
      font-weight: 500;
      color: $deepseek-blue;
      margin-bottom: 16rpx;
    }
  
    .content {
      font-size: 28rpx;
      color: $text-primary;
      line-height: 1.6;
      @include text-ellipsis(3); // SCSS混合实现多行省略
    }
  
    .meta-info {
      margin-top: 24rpx;
      @include flex(row, space-between);
      font-size: 24rpx;
      color: #868E96;
  
      .time::before {
        content: '·';
        margin: 0 8rpx;
      }
    }
  }
  </style>
  