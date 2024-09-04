<template>
  <view class="container">
    <view class="msg-list">
      <view
        class="flex-csb msg-item"
        v-for="(item, index) in msgList"
        :key="index"
        @click="toChat(item)"
      >
        <image
          class="img"
          :src="item.receiver.avatar"
          mode="scaleToFill"
          v-if="item.receiver.avatar"
        />
        <image
          class="img"
          src="/static/images/default.png"
          mode="scaleToFill"
          v-else
        />
        <view class="content">
          <view class="name">{{ item.receiver.name }}</view>
          <view class="msg" v-if="item.latestMsgType === 'text'">{{
            item.latestContent
          }}</view>
          <view class="msg" v-if="item.latestMsgType === 'image'">[图片]</view>
        </view>
        <view class="time">{{ item.latestTime }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import $uniApi from "@/common/uni.app.api.js";
import { fetchChatRoom } from "@/api/chat.js";
export default {
  data() {
    return {
      msgList: [],
    };
  },
  onNavigationBarButtonTap(e) {
    this.setStyle(e.index, false);
  },
  onReady() {
    this.setStyle(0, true);
    this.setStyle(1, true, 9);
    this.loadChatRooms();
  },
  methods: {
    /**
     * 修改导航栏buttons
     * index[number] 修改的buttons 下标索引，最右边索引为0
     * show[boolean] 显示还是隐藏角标或者红点
     * text[string] 需要修改的角标的text 内容 ，
     * 如果定义redDot 此参数无效 ，如果定义badgeText请设置具体，如果不用输入
     */
    setStyle(index, show, text) {
      let pages = getCurrentPages();
      let page = pages[pages.length - 1]; // 获取当前页面对象
      // #ifdef APP-PLUS
      let currentWebview = page.$getAppWebview();
      const activeStrategy = {
        true_0: (index, text) =>
          currentWebview.showTitleNViewButtonRedDot({
            index: index,
            text: text,
          }),
        false_0: (index, text) =>
          currentWebview.hideTitleNViewButtonRedDot({
            index: index,
          }),
        true_1: (index, text) =>
          currentWebview.setTitleNViewButtonBadge({
            index: index,
            text: text,
          }),
        false_1: (index, text) =>
          currentWebview.removeTitleNViewButtonBadge({
            index: index,
          }),
      };
      activeStrategy[`${show}_${index}`](index, text);
      // #endif
    },
    loadChatRooms() {
      fetchChatRoom().then((res) => {
        this.msgList = res.data.data;
      });
    },
    toChat(item) {
      $uniApi.navigateTo("chat", { 
        chatId: item.id,
        receiverId: item.receiver.id,
        receiverName: item.receiver.name,
       });
    },
  },
};
</script>

<style lang="scss">
.msg-item {
  padding: 20rpx;
  margin-bottom: 20rpx;

  .img {
    width: 60px;
    height: 60px;
    border-radius: 10rpx;
    margin-right: 20rpx;
  }

  .content {
    flex: 1;

    .msg {
      font-size: 26rpx;
      color: #999;
    }
  }

  .time {
    font-size: 24rpx;
    color: #999;
  }
}
</style>