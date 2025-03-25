<template>
  <view class="content">
    <view class="text-area">
      <text class="title">{{ title }}</text>
      <text class="test">{{ 'nyan test scss title' }}</text>
    </view>
    <button class="btn btn-primary" @click="toAiSearch">AI search</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello',
    }
  },
  onLoad() {},
  methods: {
    toAiSearch() {
      uni.navigateTo({
        url: '/pages/wsStream/index',
      })
    }
  },
}
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: $uni-color-success;
}
</style>
