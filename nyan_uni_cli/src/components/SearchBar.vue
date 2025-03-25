<!-- components/SearchBar.vue -->
<template>
    <view class="search-container">
      <view class="search-box" :style="{ borderRadius: radius + 'rpx' }">
        <input 
          class="search-input"
          type="text"
          :placeholder="placeholder"
          placeholder-class="placeholder-style"
          @input="onInput"
        />
        <image 
          class="search-icon" 
          src="/static/search-icon.png" 
          mode="aspectFit"
        />
      </view>
    </view>
  </template>
  
  <script setup>
  const props = defineProps({
    placeholder: { type: String, default: '输入关键词探索AI世界' },
    radius: { type: Number, default: 24 } // 圆角rpx值
  });
  
  const emit = defineEmits(['search']);
  let timer = null;
  
  const onInput = (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      emit('search', e.detail.value);
    }, 300); // 300ms防抖
  };
  </script>
  
  <style lang="scss">
  .search-container {
    padding: 32rpx;
    background: $bg-gray;
  
    .search-box {
      position: relative;
      height: 88rpx;
      background: #FFF;
      box-shadow: $shadow-default;
      
      .search-input {
        height: 100%;
        padding: 0 88rpx 0 32rpx;
        font-size: 30rpx;
        color: $text-primary;
      }
  
      .placeholder-style {
        color: #ADB5BD;
      }
  
      .search-icon {
        position: absolute;
        right: 32rpx;
        top: 50%;
        transform: translateY(-50%);
        width: 40rpx;
        height: 40rpx;
      }
    }
  }
  </style>
  