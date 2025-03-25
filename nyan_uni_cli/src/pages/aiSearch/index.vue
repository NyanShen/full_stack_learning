<template>
    <view class="search-container">
      <!-- 搜索栏 -->
      <view class="search-bar">
        <view class="search-icon" @click="handleSearch">🔍</view>
        <input
          class="search-input"
          v-model="searchKeyword"
          placeholder="请输入您想了解的内容"
          placeholder-class="placeholder-style"
          @confirm="handleSearch"
          @input="handleInput"
        />
        <view v-if="searchKeyword" class="clear-icon" @click="clearKeyword">×</view>
      </view>
  
      <!-- 历史搜索 -->
      <view v-if="showHistory" class="history-section">
        <view class="section-header">
          <text>历史记录</text>
          <text class="clear-btn" @click="clearHistory">清空</text>
        </view>
        <view class="tag-container">
          <view
            v-for="(item, index) in historyList"
            :key="index"
            class="history-tag"
            @click="quickSearch(item)"
          >
            {{ item }}
          </view>
        </view>
      </view>
  
      <!-- 热门推荐 -->
      <view class="hot-section">
        <view class="section-header">
          <text>热门推荐</text>
        </view>
        <view class="tag-container">
          <view
            v-for="(item, index) in hotList"
            :key="index"
            class="hot-tag"
            @click="quickSearch(item)"
          >
            # {{ item }}
          </view>
        </view>
      </view>
  
      <!-- 搜索结果 -->
      <scroll-view
        v-if="showResults"
        class="result-list"
        scroll-y
        :show-scrollbar="false"
      >
        <view
          v-for="(item, index) in resultList"
          :key="index"
          class="result-item"
        >
          <text class="result-icon">✦</text>
          <view class="result-content">
            <rich-text :nodes="highlightText(item.content)" />
            <view class="result-footer">
              <text class="source-tag">{{ item.source }}</text>
              <text class="time-text">{{ item.time }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const searchKeyword = ref('');
  const historyList = ref(['人工智能发展', '机器学习基础', '深度学习框架']);
  const hotList = ref(['神经网络', '大模型应用', '计算机视觉', '自然语言处理']);
  const resultList = ref([]);
  
  const showHistory = computed(() => !searchKeyword.value && historyList.value.length > 0);
  const showResults = computed(() => searchKeyword.value && resultList.value.length > 0);
  
  const handleSearch = () => {
    if (!searchKeyword.value) return;
    
    // 模拟搜索逻辑
    resultList.value = [
      {
        content: `关于"${searchKeyword.value}"的最新研究显示...`,
        source: '学术论文',
        time: '2023-12-20'
      },
      // 更多模拟数据...
    ];
  
    addToHistory(searchKeyword.value);
  };
  
  const quickSearch = (keyword) => {
    searchKeyword.value = keyword;
    handleSearch();
  };
  
  const clearKeyword = () => {
    searchKeyword.value = '';
    resultList.value = [];
  };
  
  const addToHistory = (keyword) => {
    if (!historyList.value.includes(keyword)) {
      historyList.value = [keyword, ...historyList.value].slice(0, 8);
    }
  };
  
  const clearHistory = () => {
    historyList.value = [];
  };
  
  const highlightText = (text) => {
    const keyword = searchKeyword.value;
    return text.replace(new RegExp(keyword, 'gi'), '<span style="color: #1890ff">$&</span>');
  };
  </script>
  
  <style lang="scss">
  $primary-color: #1890ff;
  $bg-color: #f5f7fa;
  $text-color: #1a1a1a;
  $border-color: #e8e8e8;
  
  .search-container {
    padding: 20rpx 32rpx;
    background-color: white;
    min-height: 100vh;
  }
  
  .search-bar {
    display: flex;
    align-items: center;
    background: $bg-color;
    border-radius: 48rpx;
    padding: 16rpx 32rpx;
    margin-bottom: 40rpx;
    position: relative;
  
    .search-icon {
      font-size: 36rpx;
      margin-right: 20rpx;
      color: #666;
    }
  
    .search-input {
      flex: 1;
      font-size: 32rpx;
      color: $text-color;
      padding-right: 60rpx;
    }
  
    .clear-icon {
      position: absolute;
      right: 32rpx;
      font-size: 48rpx;
      color: #999;
      line-height: 1;
      padding: 10rpx;
    }
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32rpx;
    font-size: 34rpx;
    color: #666;
  
    .clear-btn {
      color: #999;
      font-size: 28rpx;
    }
  }
  
  .tag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 24rpx;
  
    .history-tag, .hot-tag {
      padding: 12rpx 32rpx;
      border-radius: 40rpx;
      font-size: 28rpx;
    }
  
    .history-tag {
      background: $bg-color;
      color: #666;
    }
  
    .hot-tag {
      background: rgba($primary-color, 0.1);
      color: $primary-color;
    }
  }
  
  .result-list {
    max-height: 80vh;
    margin-top: 40rpx;
  
    .result-item {
      display: flex;
      padding: 32rpx 0;
      border-bottom: 1rpx solid $border-color;
  
      .result-icon {
        font-size: 36rpx;
        color: $primary-color;
        margin-right: 24rpx;
      }
  
      .result-content {
        flex: 1;
        font-size: 32rpx;
        color: $text-color;
  
        .result-footer {
          margin-top: 20rpx;
          display: flex;
          align-items: center;
          font-size: 24rpx;
          color: #999;
  
          .source-tag {
            background: rgba($primary-color, 0.1);
            color: $primary-color;
            padding: 4rpx 12rpx;
            border-radius: 8rpx;
            margin-right: 16rpx;
          }
        }
      }
    }
  }
  
  .placeholder-style {
    color: #bfbfbf;
  }
  </style>