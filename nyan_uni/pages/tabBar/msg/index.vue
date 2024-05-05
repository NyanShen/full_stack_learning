<template>
  <view class="container">
    <view class="msg-list">
      <view
        class="flex-c msg-item"
        v-for="(item, index) in msgList"
        :key="index"
		@click="toChat(item)"
      >
        <image class="img" :src="item.avatar" mode="scaleToFill" />
        <view class="content">
          <view class="name">{{ item.sendName }}</view>
          <view class="msg">{{ item.lastContent }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import $uniApi from "@/common/uni.app.api.js";
export default {
  data() {
    return {
      msgList: [
        {
          type: "text",
          sendName: "沈医生",
          lastContent: "测试环境, 非测试人员请勿操作",
          avatar:
            "https://zxyy.alipayxy.com:1502/wenxinmp/images/public/doctor_icon.png",
          time: "2020-01-01 12:12:12",
          readed: false,
        },
      ],
    };
  },
  onNavigationBarButtonTap(e) {
    this.setStyle(e.index, false);
  },
  onReady() {
    this.setStyle(0, true);
    this.setStyle(1, true, 9);
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
	toChat(item) {
		$uniApi.navigateTo("chat", item)
	}
  },
};
</script>

<style lang="stylus">
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
    .msg {
      color: #999;
    }
  }
}
</style>