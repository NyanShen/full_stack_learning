<template>
    <view class="chat">
      <view class="chat-header">
        <image src="../../static/chat/title.png" mode="scaleToFill" />
      </view>
      <view class="chat-body">
        <scroll-view
          class="chat-content"
          :scroll-top="state.scrollTop"
          :style="{ height: scrollContentH + 'px' }"
        >
          <view class="chat-list">
            <view
              class="chat-item"
              v-for="(chatItem, index) in state.chatList"
              :key="index"
            >
              <view
                class="chat-item-content"
                :class="{
                  doctor: chatItem.source === '1',
                  patient: chatItem.name === '0',
                }"
              >
                <view class="message">
                  <!-- 图片消息 -->
                  <view class="message-image" @click="onMsgClick(chatItem)">
                    <image
                      class="image"
                      mode="aspectFill"
                      :src="chatItem.content"
                    />
                  </view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
        <view class="chat-bottom" @longpress="onLongpress" @touchend="onTouchend">
          <image src="../../static/chat/bottom.png" mode="scaleToFill" />
        </view>
      </view>
      <view class="chat-popup">
        <view class="mask"></view>
        <image
          class="img-clear"
          src="../../static/chat/clear.png"
          mode="scaleToFill"
        />
        <image
          class="img-voice"
          src="../../static/chat/voice.gif"
          mode="scaleToFill"
        />
        <image
          class="img-bot2"
          src="../../static/chat/bottom2.png"
          mode="scaleToFill"
        />
      </view>
    </view>
  </template>
  <script setup>
  import { reactive, ref, onMounted } from "vue";
  import $uniApi from "@/common/uni.app.api.js";
  const preChatList = [
    {
      id: "1",
      content: "../../static/chat/1.png",
      source: 0,
    },
    {
      id: "2",
      content: "../../static/chat/2.png",
      source: 1,
    },
    {
      id: "3",
      content: "../../static/chat/3.png",
      source: 0,
    },
    {
      id: "4",
      content: "../../static/chat/4.png",
      source: 1,
    },
    {
      id: "5",
      content: "../../static/chat/5.png",
      source: 0,
    },
    {
      id: "6",
      content: "../../static/chat/6.png",
      source: 1,
    },
    {
      id: "7",
      content: "../../static/chat/7.png",
      source: 0,
    },
    {
      id: "8",
      content: "../../static/chat/8.png",
      source: 1,
    },
    {
      id: "9",
      content: "../../static/chat/9.png",
      source: 0,
    },
    {
      id: "10",
      content: "../../static/chat/10.png",
      source: 1,
    },
  ];
  const state = reactive({
    scrollTop: 0,
    scrollContentH: 0,
    chatList: [],
    loading: false,
    chatIndex: 0,
    systemInfo: {},
  });
  /**
   * 滚动可视区高度计算
   */
  const scrollContentH = computed(() => {
    state.systemInfo = $uniApi.loadSystemInfoSync();
    return state.systemInfo.windowHeight - uni.upx2px(200)
  });
  const onLongpress = () => {
    state.loading = true;
  };
  const onMsgClick = (chatItem) => {};
  const onTouchend = () => {
    state.loading = false;
    state.chatList.push(preChatList[state.chatIndex]);
    state.chatIndex += 1;
    setTimeout(() => {
      state.chatList.push(preChatList[state.chatIndex]);
      state.chatIndex += 1;
    }, 1000);
  };
  </script>
  <style lang="scss" scoped>
  .chat-body {
    background: url("../../static/chat/bg.png") no-repeat center;
  }
  .chat-content {
    position: relative;
    bottom: 0;
    width: 100%;
    transition: bottom 0.15s linear;
    .chat-list {
      padding: 20rpx;
      box-sizing: border-box;
      .chat-item {
        margin-bottom: 10px;
      }
    }
  }
  .chat-item-content {
    position: relative;
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
  
    .message {
      position: relative;
      display: flex;
      flex-direction: column;
      border-radius: 10rpx;
      max-width: 450rpx;
      .image {
        margin: 5px 0;
        max-width: 450rpx;
        border-radius: 10rpx;
        overflow: hidden;
        cursor: pointer;
        background-color: #f7f7f7;
      }
    }
    &.doctor {
      flex-direction: row-reverse;
    }
    &.patient {
      flex-direction: row;
    }
  }
  .chat-popup {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      background-color: RGBA(69, 70, 74, 0.9);
    }
    .img-bot2 {
      width: 100%;
      height: 200rpx;
    }
    .img-voice {
      width: 272rpx;
      height: 174rpx;
    }
    .img-clear {
      width: 88rpx;
      height: 88rpx;
    }
  }
  </style>