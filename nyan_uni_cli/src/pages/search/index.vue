<!-- pages/search/index.vue -->
<template>
    <view class="page-container">
      <!-- 搜索框区域 -->
      <SearchBar @search="doSearch" />
      
      <!-- 结果展示区 -->
      <scroll-view 
        class="result-scroll"
        scroll-y
        refresher-enabled
        @refresherrefresh="onRefresh"
      >
        <ResultCard 
          v-for="item in results" 
          :key="item.id" 
          :data="item"
        />
        
        <!-- 加载状态 -->
        <view v-if="loading" class="loading-text">
          <text>AI正在深度思考中...</text>
        </view>
      </scroll-view>
    </view>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import SearchBar from '@/components/SearchBar.vue';
  import ResultCard from '@/components/ResultCard.vue';
  
  const results = ref([
    {
      id: 1,
      title: '搜索结果1',
      content: '这是搜索结果1的内容',
      source: "百度",
      time: "2025-01-01"
    }
  ]);
  const loading = ref(false);
  
  const doSearch = async (keyword) => {
    loading.value = true;
  
  };
  
  const onRefresh = () => {
    // 下拉刷新逻辑
  };
  </script>
  
  <style lang="scss">
  .page-container {
    background: $bg-gray;
    min-height: 100vh;
    
    .result-scroll {
      height: calc(100vh - 176rpx); // 动态高度计算
    }
  
    .loading-text {
      padding: 32rpx;
      text-align: center;
      color: #868E96;
      font-size: 28rpx;
    }
  }
  
  </style>
  