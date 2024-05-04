<template>
  <view class="chat">
    <!-- 聊天内容 -->
    <scroll-view
      scroll-y
      class="chat_box"
	  :reverse="true"
	  :scroll-top="state.scrollTop"
      :style="{ height: state.scrollContentH + 'px' }"
    >
      <view
        v-for="(message, index) in state.chatList"
        :key="index"
        :id="'messageItem' + index"
        class="message"
      >
        <view
          class="message-box"
          :class="{
            'doctor-message': message.from === 'doctor',
            'patient-message': message.from === 'patient',
          }"
        >
          <view class="message-avatar">
            <image
              class="img"
              v-if="message.from === 'doctor'"
              src="https://zxyy.alipayxy.com:1502/wenxinmp/images/public/doctor_icon.png"
              mode="aspectFill"
            />
            <image
              class="img"
              v-if="message.from === 'patient'"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
              mode="aspectFill"
            />
          </view>
          <view class="message-content">
            <view v-if="message.type === 'text'" class="message-text">
              {{ message.content }}
              <view class="message-arrow"></view>
            </view>
            <view v-if="message.type === 'image'" class="message-image">
              <image
                class="img"
                :src="message.content"
                mode="aspectFit"
                @tap="showImage(message.content)"
              />
            </view>
          </view>
        </view>

        <view class="message-time" v-if="shouldShowTime(message, index)">
          {{ formatTime(message.time) }}
        </view>
      </view>
    </scroll-view>
    <!-- 发送按钮 -->
    <view class="chat_send_box">
      <scroll-view
        scroll-y
        class="chat_input_box"
        :show-scrollbar="false"
        :enhanced="true"
      >
        <textarea
          v-model="state.msg"
          name="chat_input"
          id="chat_input"
          :auto-height="true"
          :cursor-spacing="20"
          :show-confirm-bar="false"
        ></textarea>
      </scroll-view>
      <view class="btn_group">
        <button class="btn btn-primary send_btn">发送</button>
      </view>

      <!-- 其他弹窗 -->
      <view class="bot_menu" v-show="state.showBotMenu"> 按钮组 </view>
    </view>
  </view>
</template>
<script setup>
import { reactive } from "vue";
import { onReady } from "@dcloudio/uni-app";
import { formatChatListTime } from "@/common/index";
const state = reactive({
  sendBoxH: 60,
  scrollContentH: 0,
  msg: "",
  kbHeight: 0,
  showBotMenu: false,
  intoView: "",
  scrollTop: 300, // 滚动内容的高度
  chatList: [
    {
      id: 1,
      type: "text",
      from: "patient",
      content: "你好,请问医疗卫生站怎么走, 请问你的志向是什么",
      time: "2024-02-01 15:14:12",
    },
    {
      id: 2,
      type: "text",
      from: "doctor",
      content:
        "了解了position: sticky; 的作用, flex-direction: row-reverse;聊天显示反转",
      time: "2024-05-02 16:18:00",
    },
    {
      id: 3,
      type: "text",
      from: "doctor",
      content: "你好,测试文案",
      time: "2024-05-02 16:18:02",
    },
    {
      id: 4,
      type: "text",
      from: "patient",
      content:
        "咏柳, 碧玉妆成一树高, 万条垂下绿丝绦, 不知细叶谁裁出,二月春风似剪刀",
      time: "2024-05-02 17:12:13",
    },
    {
      id: 4,
      type: "text",
      from: "patient",
      content:
        "游子吟, 慈母手中线,游子身上衣,临行密密缝,意恐迟迟归,谁言寸草心,报得三春晖.",
      time: "2024-05-02 17:12:15",
    },
    {
      id: 5,
      type: "image",
      from: "doctor",
      content:
        "https://zxyy.alipayxy.com:1502/wenxinmp/images/public/medicare_bg.png",
      time: "2024-05-03 19:12:15",
    },
  ],
});
const shouldShowTime = (message, index) => {
  if (index === 0) return true; // 总是显示第一条消息的时间
  const prevMessage = state.chatList[index - 1];
  return (
    new Date(message.time).getTime() - new Date(prevMessage.time).getTime() >=
    10 * 1000
  );
};

const formatTime = (time) => {
  const date = new Date(time);
  return `${formatChatListTime(date.getTime() / 1000)}`;
};
// 打开图片预览，这里只是示例，实际需要实现图片预览功能
const showImage = (url) => {
  console.log("打开图片预览:", url);
};
onReady(() => {
  // 获取系统可视高度 - 底部固定高度
  uni.getSystemInfo({
    success: (res) => {
      state.scrollContentH = res.windowHeight - state.sendBoxH;
      state.intoView = `messageItem${state.chatList.length - 1}`;
    },
  });
});
</script>
<style lang="scss" scoped>
.chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .chat_box {
    width: 100%;
  }
}

.chat_send_box {
  display: flex;
  align-items: flex-end;
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  padding: 20rpx;
  box-sizing: border-box;
  background-color: #f7f7f7;

  .chat_input_box {
    flex: 1;
    max-height: 250rpx;
    min-height: 70rpx;
    padding: 15rpx 0 15rpx 15rpx;
    border-radius: 10rpx;
    box-sizing: border-box;
    background-color: #fff;
    overflow: auto;
    textarea {
      width: 100%;
      font-size: 28rpx;
    }
  }

  .btn_group {
    display: flex;
    align-items: center;
    margin-left: 20rpx;
    height: 70rpx;
  }

  .send_btn {
    width: 120rpx;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 10rpx;
  }

  .bot_menu {
    width: 100%;
    height: 320rpx;
  }
}

.message {
  padding: 20rpx;
}

.message-box {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;

  &.doctor-message {
    flex-direction: row-reverse;

    .message-avatar {
      margin-left: 10px;
      margin-right: 0;
    }

    .message-text {
      background-color: ghostwhite;
      .message-arrow {
        right: -16px;
        border-left-color: ghostwhite;
      }
    }
  }
  &.patient-message {
    .message-text {
      .message-arrow {
        left: -30rpx;
        border-right-color: aliceblue;
      }
    }
  }

  .message-avatar {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 50%;
    overflow: hidden;

    .img {
      width: 100%;
      height: 100%;
    }
  }

  .message-content {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 480rpx;
  }

  .message-text {
    background-color: aliceblue;
    font-size: 30rpx;
    padding: 20rpx;
    border-radius: 10rpx;
    line-height: 1.5;
    word-break: break-all;
    // 三角形样式
    .message-arrow {
      position: absolute;
      top: 20rpx;
      width: 0;
      height: 0;
      border: 10px solid transparent;
      z-index: 1;
    }
  }

  .message-image {
    margin-top: 5px;
    margin-bottom: 5px;
    cursor: pointer;

    .img {
      width: 100%;
      background-color: #f7f7f7;
    }
  }
}

.message-time {
  font-size: 12px;
  text-align: center;
  color: #999;
}
</style>