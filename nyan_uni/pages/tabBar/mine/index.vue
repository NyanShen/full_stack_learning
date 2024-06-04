<template>
  <view class="uni-container">
    <view class="menu-list">
      <view class="flex-column menu-item" @click="createChatRoom">
        <image
          class="menu-item-icon"
          src="/static/images/icon_msg.png"
          mode="scaleToFill"
        />
        <view class="menu-item-text">聊天测试</view>
      </view>
    </view>
  </view>
</template>

<script>
import $uniApi from "@/common/uni.app.api.js";
import $constant from "@/common/constants.js";
import { createChatRoom } from "@/api/chat";
export default {
  data() {
    return {
      title: "",
    };
  },
  onLoad() {},
  methods: {
    toLogin() {
      $uniApi.navigateTo("login");
    },
    handleText() {
      $uniApi.alert("hello" + $constant.CONFIG.testUrl);
    },
    createChatRoom() {
      let roomData = {
        senderId: 3,
        receiverId: 2,
      };
      createChatRoom(roomData).then((res) => {
		if (res.data.code !== 200) {
			$uniApi.showToastNone(res.data.msg)
			return
		}
        $uniApi.navigateTo("chat");
      });
    },
  },
};
</script>

<style lang="scss">
.menu-list {
  display: flex;
  flex-wrap: wrap;
  padding: 30rpx;
  .menu-item {
    width: 25%;
    .menu-item-icon {
      width: 100rpx;
      height: 100rpx;
    }
    .menu-item-text {
      font-size: 28rpx;
      color: #333;
    }
  }
}
</style>