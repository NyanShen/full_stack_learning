<template>
  <view class="chat">
    <!-- 聊天内容 -->
    <scroll-view
      scroll-y
      class="chat-body"
      :scroll-top="state.scrollTop"
      :style="{ height: state.scrollContentH + 'px' }"
    >
      <view class="chat-list">
        <view
          class="chat-item"
          v-for="(message, index) in state.chatList"
          :key="index"
        >
          <view
            class="chat-item-content"
            :class="{
              doctor: message.from === 'doctor',
              patient: message.from === 'patient',
            }"
          >
            <!-- 头像 -->
            <view class="avatar">
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
            <!-- 聊天具体内容展示 -->
            <view class="message">
              <view v-if="message.type === 'text'" class="text">
                {{ message.content }}
                <view class="arrow"></view>
              </view>
              <view v-if="message.type === 'image'" class="image">
                <image
                  class="img"
                  :src="message.content"
                  mode="aspectFill"
                  @tap="showImage(message.content)"
                />
              </view>
            </view>
          </view>
          <view class="chat-item-time" v-if="shouldShowTime(message, index)">
            {{ formatTime(message.time) }}
          </view>
        </view>
      </view>
    </scroll-view>
    <!-- 发送按钮 h5不生效show-scrollbar enhanced-->
    <view class="chat-bot" :style="{ bottom: state.kbHeight + 'px' }">
      <scroll-view
        scroll-y
        class="chat-input-wrap"
        :show-scrollbar="false"
        :enhanced="true"
      >
        <textarea
          v-model="state.msg"
          name="chat-input"
          id="chat-input"
          :maxlength="500"
          :auto-height="true"
          :cursor-spacing="20"
          :show-confirm-bar="false"
          :adjust-position="false"
          cursor-color="#2279ea"
          @input="onInput"
        ></textarea>
      </scroll-view>

      <view class="chat-btn-group">
        <button class="btn btn-primary btn-send" @click="sendTextMsg()">
          发送
        </button>
      </view>

      <!-- 其他弹窗 -->
      <view class="chat-bot-menu" v-show="state.showBotMenu"> 按钮组 </view>
    </view>
  </view>
</template>
<script setup>
import { reactive, nextTick } from "vue";
import { onReady } from "@dcloudio/uni-app";
import { formatChatListTime, debounce } from "@/common/index";
import $uniApi from "@/common/uni.app.api.js";
const state = reactive({
  sendBoxH: 0,
  scrollContentH: 0,
  msg: "",
  kbHeight: 0,
  showBotMenu: false,
  scrollTop: 0, // 滚动内容的高度
  windowHeight: 0,
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
/**
 * 判断该条信息时间是否显示
 * @param {*} message
 * @param {*} index
 */
const shouldShowTime = (message, index) => {
  if (index === 0) return true; // 总是显示第一条消息的时间
  const prevMessage = state.chatList[index - 1];
  return (
    new Date(message.time.replace(/-/g, "/")).getTime() -
      new Date(prevMessage.time.replace(/-/g, "/")).getTime() >=
    30 * 1000
  );
};
/**
 * 格式化显示时间
 * @param {*} time
 */
const formatTime = (time) => {
  const date = new Date(time.replace(/-/g, "/"));
  return `${formatChatListTime(date.getTime() / 1000)}`;
};
// 打开图片预览，这里只是示例，实际需要实现图片预览功能
const showImage = (url) => {
  console.log("打开图片预览:", url);
};
/**
 * 获取聊天内容总高度
 */
const toScrollBottom = () => {
  // nextTick确保最后发的消息能获取到对应的高度
  uni
    .createSelectorQuery()
    .select(".chat-list")
    .boundingClientRect((res) => {
      state.scrollTop = res.height;
      console.log("scrollTop>>>", state.scrollTop);
    })
    .exec();
};
/**
 * 获取底部高度
 */
const calcBottomHeight = () => {
  nextTick(() => {
    uni
      .createSelectorQuery()
      .select(".chat-bot")
      .boundingClientRect((res) => {
        state.sendBoxH = res.height;
        state.scrollContentH = state.windowHeight - state.sendBoxH;
        console.log("chat-bot>>>", state.sendBoxH, res);
        toScrollBottom();
      })
      .exec();
  });
};
/**
 * 输入换行之后重新计算底部高度
 */
const onInput = debounce((e) => {
  console.log("onInput>>>", e.detail.value);
  state.msg = e.detail.value;
  calcBottomHeight();
}, 500);
/**
 * 发送文本消息
 */
const sendTextMsg = () => {
  if (!state.msg) return;
  state.chatList.push({
    id: state.chatList.length + 1,
    type: "text",
    from: "patient",
    content: state.msg,
    time: new Date().toLocaleString(),
  });
  state.msg = "";
  calcBottomHeight();
};
onReady(() => {
  // 获取系统可视高度 - 底部固定高度
  let result = $uniApi.loadSystemInfoSync();
  state.windowHeight = result.windowHeight;
  calcBottomHeight();

  uni.onKeyboardHeightChange((res) => {
    state.kbHeight = res.height;
  });
});
</script>
<style lang="scss" scoped>
.chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
// 聊天内容滚动区域, 高度通过计算设置
.chat-body {
  width: 100%;
  // 用于聊天内容总高度计算, scrollTop滚动到最底部
  .chat-list {
    padding: 20rpx;
    box-sizing: border-box;
  }
}
// 每一天聊天记录
.chat-item {
  margin-bottom: 10px;
  // 聊天对象(头像 + 聊天具体内容)
  .chat-item-content {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
    // 头像
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;

      .img {
        width: 100%;
        height: 100%;
      }
    }
    // 聊天具体内容(文本 + 图片 + 其他待定)
    .message {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      max-width: 480rpx;
      .text {
        font-size: 30rpx;
        padding: 20rpx;
        border-radius: 10rpx;
        line-height: 1.5;
        word-break: break-all;
        background-color: aliceblue;
        // 三角形样式
        .arrow {
          position: absolute;
          top: 20rpx;
          width: 0;
          height: 0;
          border: 10px solid transparent;
          z-index: 1;
        }
      }
      .image {
        margin-top: 5px;
        margin-bottom: 5px;
        max-width: 500rpx;
        overflow: hidden;
        cursor: pointer;

        .img {
          width: 100%;
          border-radius: 10rpx;
          background-color: #f7f7f7;
        }
      }
    }

    &.doctor {
      flex-direction: row-reverse;
      .avatar {
        margin-left: 10px;
      }
      .message {
        .text {
          background-color: ghostwhite;
          .arrow {
            right: -16px;
            border-left-color: ghostwhite;
          }
        }
      }
    }
    &.patient {
      flex-direction: row;
      .avatar {
        margin-right: 10px;
      }
      .message {
        .text {
          background-color: aliceblue;
          .arrow {
            left: -30rpx;
            border-right-color: aliceblue;
          }
        }
      }
    }
  }
  // 每条聊天时间
  .chat-item-time {
    font-size: 12px;
    text-align: center;
    color: #999;
  }
}
// 聊天输入框(输入 + 操作按钮)
.chat-bot {
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

  .chat-input-wrap {
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

  .chat-btn-group {
    display: flex;
    align-items: center;
    margin-left: 20rpx;
    height: 70rpx;

    .btn-send {
      width: 120rpx;
      height: 60rpx;
      line-height: 60rpx;
      border-radius: 10rpx;
    }
  }

  .chat-bot-menu {
    width: 100%;
    height: 320rpx;
  }
}
</style>