<template>
  <view class="chat">
    <!-- 聊天记录box -->
    <scroll-view
      class="chat-body"
      :scroll-y="state.isScrolling"
      :scroll-top="state.scrollTop"
      :style="{ height: scrollContentH + 'px' }"
    >
      <view
        class="chat-list"
        @click="toggleBotMenu(false)"
        @touchstart="touchChatList()"
      >
        <view
          class="chat-item"
          v-for="(chatItem, index) in state.chatList"
          :key="index"
        >
          <view class="chat-item-time" v-if="shouldShowTime(chatItem, index)">
            {{ formatTime(chatItem.time) }}
          </view>
          <view
            class="chat-item-content"
            :class="{
              doctor: chatItem.name === 'doctor',
              patient: chatItem.name === 'patient',
            }"
          >
            <!-- 头像 -->
            <view class="avatar">
              <image
                class="img"
                v-if="chatItem.name === 'doctor'"
                src="/static/images/default.png"
                mode="aspectFill"
              />
              <image
                class="img"
                v-if="chatItem.name === 'patient'"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
                mode="aspectFill"
              />
            </view>
            <!-- 聊天具体内容展示 -->
            <view class="message">
              <!-- 文本消息 -->
              <view
                v-if="chatItem.type === 'text'"
                selectable
                class="text"
                :id="'chat_item_message_' + index"
                @longtap.stop="(e) => messageLongTap(e, chatItem, index)"
                @click.stop
              >
                {{ chatItem.content }}
                <view class="arrow"></view>
              </view>
              <!-- 图片消息 -->
              <image
                v-if="chatItem.type === 'image'"
                class="image"
                mode="aspectFill"
                :src="chatItem.content"
                @click.stop="showImage(chatItem.content)"
              />

              <!-- 每条消息按钮组 -->
              <view
                class="chat-item-btn-group"
                :class="chatItem.bottom ? 'bottom' : 'top'"
                v-show="chatItem.showBtn"
              >
                <view class="btn-arrow"></view>
                <view class="flex-c btn-list">
                  <view
                    class="flex-column btn-item"
                    @click.stop="(e) => onCopy(e, chatItem)"
                  >
                    <text class="iconfont iconcopy"></text>
                    <text class="btn-text">复制</text>
                  </view>
                  <view
                    class="flex-column btn-item"
                    @click.stop="(e) => onEdit(e, chatItem)"
                  >
                    <text class="iconfont iconbianji"></text>
                    <text class="btn-text">重新编辑</text>
                  </view>
                  <view
                    v-if="showWithdraw(chatItem.time)"
                    class="flex-column btn-item"
                    @click.stop="(e) => onWithdraw(e, index)"
                  >
                    <text class="iconfont iconchehui"></text>
                    <text class="btn-text">撤回</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <!-- 底部聊天输入框box -->
    <view class="chat-bot-input-box" :style="{ bottom: inputBoxB + 'px' }">
      <!-- 左边按钮 -->
      <view class="btn-group">
        <image
          class="btn-img show mr20"
          src="/static/images/voice.png"
          mode="aspectFill"
        />
      </view>
      <!-- 中间输入框 -->
      <scroll-view
        scroll-y
        class="input-wrap"
        :show-scrollbar="false"
        :enhanced="true"
      >
        <textarea
          v-model="message"
          name="chatmsginput"
          id="chatmsginput"
          :maxlength="500"
          :auto-height="true"
          :cursor-spacing="20"
          :show-confirm-bar="false"
          :adjust-position="false"
          @focus="toggleBotMenu(false)"
          @input="onInput"
          @keyboardheightchange="onKeyboardHeightChange"
        ></textarea>
      </scroll-view>
      <!-- 右边按钮 -->
      <view class="btn-group">
        <image
          :class="{ show: !message }"
          class="btn-img ml20"
          src="/static/images/plus.png"
          mode="aspectFill"
          @tap="toggleBotMenu(!showBotMenu)"
        />
        <button
          :class="{ show: message }"
          class="btn btn-primary btn-send"
          @click="sendTextMsg()"
        >
          发送
        </button>
      </view>
    </view>
    <!-- 底部按钮组跟输入框分离解决页面一上一下的闪动问题 -->
    <view class="chat-bot-menu-box" :class="{ show: showBotMenu }">
      <view class="menu-ul">
        <view class="menu-item flex-column">
          <view class="icon flex-column">
            <text class="iconfont iconphoto"></text>
          </view>
          <text>相册</text>
        </view>
        <view class="menu-item flex-column">
          <view class="icon flex-column">
            <text class="iconfont iconphotograph"></text>
          </view>
          <text>拍照</text>
        </view>
        <view class="menu-item flex-column">
          <view class="icon flex-column">
            <text class="iconfont iconcall"></text>
          </view>
          <text>语音</text>
        </view>
        <view class="menu-item flex-column">
          <view class="icon flex-column">
            <text class="iconfont iconmap"></text>
          </view>
          <text>位置</text>
        </view>
        <view class="menu-item flex-column">
          <view class="icon flex-column">
            <text class="iconfont iconstarfill"></text>
          </view>
          <text>收藏</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
import { ref, watch, reactive, nextTick, onBeforeUnmount, computed } from "vue";
import { onReady, onLoad } from "@dcloudio/uni-app";
import { formatChatListTime, debounce } from "@/common/index";
import $uniApi from "@/common/uni.app.api.js";
// import { socket } from "@/common/socket";
// import { useSocketStore } from "@/stores/socket.js";
// import { sendChatMsg, fetchChatList } from "@/api/chat";
// const socketStore = useSocketStore(); // socket
/**
 * 需要监听的变量
 */
const message = ref(""); // 发送信息内容
const kbHeight = ref(0); // 键盘高度
const showBotMenu = ref(false); // 其他聊天功能按钮, 底部按钮组的显示隐藏
const state = reactive({
  sendBoxH: 0, // 输入框动态高度
  scrollTop: 0, // 滚动内容的高度
  systemInfo: {}, // 系统信息
  isScrolling: true,
  // 聊天信息
  chatList: [
    {
      id: 1,
      type: "text",
      name: "doctor",
      content: "您好! 很开心为您提供服务, 请您开始您的咨询.",
      time: "2024-05-21 15:14:12",
    },
    {
      id: 2,
      type: "text",
      name: "patient",
      content:
        "绝对定位position: sticky; 滚动到具体点固定并且占据高度, flex-direction: row-reverse; 聊天显示反转, caret-color设置光标的颜色; 监听键盘高度, 底部按钮组显示, 输入内容的变化进行重新计算渲染",
      time: "2024-05-22 16:18:00",
    },
    {
      id: 3,
      type: "text",
      name: "doctor",
      content:
        "由于高度或位置的变化总会导致页面出现闪定问题, 主要是按钮组的显示隐藏导致次闪动",
      time: "2024-05-23 19:12:15",
    },
    {
      id: 4,
      type: "text",
      name: "doctor",
      content: "因此解决闪动的问题最终的解决办法就是将底部按钮组和输入框分离.",
      time: "2024-05-23 19:12:15",
    },
    {
      id: 5,
      type: "image",
      name: "doctor",
      content: "/static/bg-wall.png",
      time: "2024-05-23 19:12:15",
    },
    {
      id: 6,
      type: "text",
      name: "patient",
      content:
        "由于滚动可视区的最大高度减去了底部输入框的高度, 所以滚动可视区离底部的距离是键盘的高度或按钮组的高度",
      time: "2024-05-28 19:12:15",
    },
    {
      id: 7,
      type: "text",
      name: "doctor",
      content: "二期模仿微信APP聊天输入框结束",
      time: "2024-05-31 16:15:14",
    },
    {
      id: 8,
      type: "text",
      name: "doctor",
      content: "短消息样式",
      time: "2024-05-31 16:15:14",
    },
  ],
});
/**
 * 键盘的高度或底部按钮组的高度
 * 先发生隐藏页面元素, 再计算滚动可视区里底部的距离值
 * 由于滚动可视区的最大高度减去了底部输入框的高度, 所以滚动可视区离底部的距离是键盘的高度或按钮组的高度
 */
const inputBoxB = computed(() => {
  // 双事件触发不进行计算
  if (showBotMenu.value && kbHeight.value > 0) {
    return inputBoxB.value;
  }
  if (kbHeight.value > 0) {
    return kbHeight.value;
  }
  return showBotMenu.value ? uni.upx2px(450) : 0;
});
/**
 * 滚动可视区高度计算
 */
const scrollContentH = computed(() => {
  // 双事件触发不进行计算
  if (showBotMenu.value && kbHeight.value > 0) {
    return scrollContentH.value;
  }
  let navHeight = 0;
  // #ifdef H5
  navHeight = state.systemInfo.statusBarHeight;
  // #endif
  const basicContent =
    state.systemInfo.windowHeight - state.sendBoxH - navHeight;
  if (kbHeight.value > 0) {
    return basicContent - kbHeight.value;
  }
  return showBotMenu.value ? basicContent - uni.upx2px(450) : basicContent;
});

/**
 * 判断该条信息时间是否显示
 * @param {*} message
 * @param {*} index
 */
const shouldShowTime = computed(() => {
  return (chatItem, index) => {
    if (index === 0) return true; // 总是显示第一条消息的时间
    const prevChatItem = state.chatList[index - 1];
    return (
      new Date(chatItem.time?.replace(/-/g, "/")).getTime() -
        new Date(prevChatItem.time?.replace(/-/g, "/")).getTime() >=
      30 * 1000
    );
  };
});
/**
 * 判断该条信息是否显示撤回消息按钮
 * 两分钟之内显示
 */
const showWithdraw = computed(() => {
  return (time) => {
    const chatTime = new Date(time?.replace(/-/g, "/")).getTime();
    return Date.now() - chatTime < 2 * 60 * 1000;
  };
});
/**
 * 格式化显示时间
 * @param {*} time
 */
const formatTime = computed(() => {
  return (time) => {
    const date = new Date(time.replace(/-/g, "/"));
    return `${formatChatListTime(date.getTime() / 1000)}`;
  };
});
/**
 * 监听键盘高度+底部按钮组+输入内容发生变化时, 重新计算并渲染
 * watch监听ref对象, 或整个state, 或state的某个属性
 * 监听多个属性,只能使用ref对象了
 */
watch([showBotMenu, kbHeight, message], () => {
  calcScorllContentMaxHeight();
  console.log("监听键盘高度变化情况:", showBotMenu.value);
  console.log("监听按钮组显示隐藏情况:", kbHeight.value);
  console.log("监听输入内容变化情况:", message.value);
});
/**
 * 获取聊天消息
 */
// const loadChatList = () => {
//   fetchChatList().then((res) => {
//     state.chatList = res.data.data.list;
//     toScrollBottom();
//   });
// };
const toScrollBottom = () => {
  nextTick(() => {
    uni
      .createSelectorQuery()
      .select(".chat-list")
      .boundingClientRect((res) => {
        state.scrollTop = res.height + Math.random() * 100;
        console.log("scrollTop>>>", state.scrollTop);
      })
      .exec();
  });
};
/**
 * 只有输入框发生高度变化才需要重新计算滚动可视区的最大高度
 */
const calcScorllContentMaxHeight = () => {
  nextTick(() => {
    uni
      .createSelectorQuery()
      .select(".chat-bot-input-box")
      .boundingClientRect((rect) => {
        state.sendBoxH = rect.height;
        toScrollBottom();
      })
      .exec();
  });
};
/**
 * 输入换行之后重新计算底部高度
 * IOS系统不兼容
 */
const onInput = debounce((e) => {
  message.value = e.detail.value;
}, 100);
/**
 * 展示、隐藏底部按钮组
 * 如果点击前是弹起键盘的, 那么就是双事件
 * 先隐藏键盘, 滚动可视区里底部的距离不做计算, 弹起按钮组再进行计算滚动可视区里底部的距离
 */
const toggleBotMenu = (value) => {
  showBotMenu.value = value;
  if (state.systemInfo.platfrom === "ios") {
    state.isScrolling = false;
    setTimeout(() => {
      state.isScrolling = true;
    }, 0);
  }
  console.log("toggleBotMenu click>>>");
};
/**
 * 键盘弹起滚动时,苹果手机兼容问题
 */
const touchChatList = () => {
  state.chatList = state.chatList.map((item) => {
    item.showBtn = false;
    return item;
  });
  if (state.systemInfo.platfrom === "ios" && kbHeight.value) {
    state.isScrolling = false;
    setTimeout(() => {
      state.isScrolling = true;
    }, 0);
  }
  console.log("touchChatList touch>>>");
};
/**
 * 发送文本消息
 */
const sendTextMsg = () => {
  if (!message.value) return;
  const chatMsg = {
    id: state.chatList.length + 1,
    type: "text",
    name: "doctor",
    content: message.value,
    time: new Date().Format("yyyy-MM-dd hh:mm:ss"),
  };
  state.chatList.push(chatMsg);
  showBotMenu.value = false;
  message.value = "";
  console.log("send message success!", state.chatList);
  // 实时发送socket消息
  // socket.emit("chat:msg", chatMsg, () => {
  //   console.log("socket发送消息成功");
  // });
  // sendChatMsg(chatMsg)
  //   .then((res) => {

  //   })
  //   .catch((err) => {
  //     console.log("发送消息失败", err);
  //   });
};

/**
 * 预览聊天图片
 * @param {*} url
 */
const showImage = (url) => {
  uni.previewImage({
    urls: [url],
    current: url,
  });
};
/**
 * 长按显示按钮组
 * todo: 图片只显示消息撤回, 时间过了, 图片长按没有反应
 */
const messageLongTap = (e, chatItem, index) => {
  uni
    .createSelectorQuery()
    .select(`#chat_item_message_${index}`)
    .boundingClientRect((rect) => {
      chatItem.bottom = rect.top < 68;
      chatItem.showBtn = true;
    })
    .exec();
  console.log("messageLongTap longtap>>>");
};
/**
 * 复制文本消息
 */
const onCopy = (event, chatItem) => {
  uni.setClipboardData({
    data: chatItem.content,
    success: function () {
      $uniApi.showToastNone("内容已复制");
      chatItem.showBtn = false;
    },
  });
  console.log("oncopy click>>>");
};
/**
 * 重新编辑
 */
const onEdit = (e, chatItem) => {
  message.value = chatItem.content;
  chatItem.showBtn = false;
  console.log("onEdit click>>>");
};
/**
 * 撤回消息
 */
const onWithdraw = (e, index) => {
  state.chatList.splice(index, 1);
  console.log("onWithdraw click>>>");
};
const onKeyboardHeightChange = (e) => {
  // #ifdef H5
  if (kbHeight.value === e.detail.height) {
    return;
  }
  kbHeight.value = e.detail.height;
  // #endif
};
onLoad(() => {
  // loadChatList(); // 接口获取聊天记录
});
onReady(() => {
  // 获取窗口可视高度 - 底部固定高度
  state.systemInfo = $uniApi.loadSystemInfoSync();
  setTimeout(() => {
    calcScorllContentMaxHeight();
  }, 0);
  // remove any existing listeners (in case of hot reload)
  // socket.off();
  // socketStore.bindEvents();
  // socketStore.connect();
  // #ifdef MP-WEIXIN
  uni.onKeyboardHeightChange((res) => {
    if (kbHeight.value === res.height) {
      return;
    }
    kbHeight.value = res.height;
  });
  // #endif
});
onBeforeUnmount(() => {
  // socket.disconnect();
  // console.log("onBeforeUnmount socket isConnected", socketStore.isConnected);
});
</script>
<style lang="scss" scoped>
// 聊天总体布局(聊天记录BOX + 底部输入框BOX)
.chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
}
// 聊天内容滚动区域, 高度通过计算设置
.chat-body {
  position: relative;
  bottom: 0;
  width: 100%;
  transition: bottom 0.15s linear;
  // 用于聊天内容总高度计算, scrollTop滚动到最底部
  .chat-list {
    padding: 20rpx;
    box-sizing: border-box;
    // 每一天聊天记录
    .chat-item {
      margin-bottom: 10px;
    }
  }
}
// 消息功能按钮-消息复制、撤回、转发...
.chat-item-btn-group {
  position: absolute;
  min-width: 90rpx;
  padding: 10rpx 20rpx;
  border-radius: 20rpx;
  background-color: #343434;
  color: #ffffff;
  z-index: 3333;
  .btn-item {
    margin: 20rpx;
  }
  &.top {
    top: -160rpx;
    .btn-arrow {
      bottom: -8rpx;
      border-width: 10rpx 10rpx 0;
      border-color: #343434 transparent transparent;
    }
  }
  &.bottom {
    bottom: -160rpx;
    .btn-arrow {
      top: -8rpx;
      border-width: 0 10rpx 10rpx;
      border-color: transparent transparent #343434;
    }
  }
  .btn-arrow {
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    border-style: solid;
  }
  .btn-text {
    line-height: 1.5;
    font-size: 24rpx;
    white-space: nowrap;
  }
}
// 聊天对象(头像 + 聊天具体内容)
.chat-item-content {
  position: relative;
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
    display: flex;
    flex-direction: column;
    border-radius: 10rpx;
    max-width: 450rpx;

    .text {
      font-size: 30rpx;
      padding: 20rpx;
      line-height: 1.5;
      word-break: break-all;
      background-color: aliceblue;
      // user-select: text; 默认长按复制
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
      .chat-item-btn-group {
        left: 50%;
        transform: translateX(-50%);
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
      .chat-item-btn-group {
        right: 50%;
      }
    }
  }
}
// 每条聊天时间
.chat-item-time {
  font-size: 12px;
  margin: 20rpx;
  text-align: center;
  color: #999;
}

// 聊天输入框(操作按钮 + 输入 + 操作按钮)
.chat-bot-input-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: flex-end;
  padding: 20rpx;
  border-top: 2rpx solid #eee;
  border-bottom: 2rpx solid #eee;
  box-sizing: border-box;
  background-color: #f7f7f7;
  transition: bottom 0.15s linear;
  // 不能使用box-sizing:border-box; 否则会出现textarea滚动条?
  .input-wrap {
    flex: 1;
    max-height: 250rpx;
    padding: 15rpx;
    border-radius: 10rpx;
    background-color: #fff;
    overflow: auto;
    textarea {
      width: 100%;
      font-size: 28rpx;
      line-height: 40rpx;
      caret-color: #2279ea;
    }
  }

  .btn-group {
    display: flex;
    align-items: center;
    height: 70rpx;
    .btn-img {
      width: 0;
      height: 46rpx;
      border-radius: 50%;
      &.show {
        width: 46rpx;
      }
    }
    .btn-send {
      // 不显示的时候覆盖原始按钮样式
      width: 0;
      height: 0;
      padding: 0;
      font-size: 0;
      transition: width 0.15s ease;
      &.show {
        width: 120rpx;
        height: 60rpx;
        line-height: 60rpx;
        font-size: 28rpx;
        padding: 0 10rpx;
        border-radius: 10rpx;
      }
    }
  }
}
// 隐藏操作按钮组
.chat-bot-menu-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  box-sizing: border-box;
  background-color: #f7f7f7;
  transition: height 0.15s linear;
  &.show {
    height: 450rpx;
  }
  .menu-ul {
    display: flex;
    flex-wrap: wrap;
    padding: 30rpx 0;
  }
  .menu-item {
    font-size: 24rpx;
    line-height: 56rpx;
    margin: 20rpx 42rpx;
    color: #666666;

    .icon {
      width: 100rpx;
      height: 100rpx;
      border-radius: 20rpx;
      background-color: #ffffff;

      .iconfont {
        font-size: 40rpx;
        color: #333333;
      }
    }
  }
}
</style>