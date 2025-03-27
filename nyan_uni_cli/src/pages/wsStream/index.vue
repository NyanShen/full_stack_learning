<template>
  <view class="container">
    <scroll-view scroll-y>
      <text>{{ streamingContent }}</text>
      <text>{{ reasoningContent }}</text>
      <view v-html="answerContent"></view>
    </scroll-view>
    <button @click="connectWS">开始接收流</button>
  </view>
</template>
  
  <script setup>
import { ref, onBeforeUnmount } from "vue";
import MarkdownStream from "@/utils/markdownStream";
import marked from "marked";
import xss from "xss";

const streamingContent = ref("");
const reasoningContent = ref("推理过程：");
const answerContent = ref("最终答案：");
let socketTask = null;

streamInstance = new MarkdownStream(
  "ws://localhost:8000/ws/v1/chats/callchain"
);
streamInstance.renderCallback = streamInstance.throttleRender((raw) => {
  const result = JSON.parse(raw);
  if (result.type === "reasoning") {
    reasoningContent.value += result.content;
  }
  if (result.type === "answer") {
    // 安全过滤与解析
    const cleanMd = xss(result.content);
    answerContent.value = marked(cleanMd, {
      breaks: true,
      gfm: true,
    });
  }
  if (result.type === "done") {
        console.log("[结束]");
      }
}, 300);
const connectWS = () => {
  // 初始化WebSocket连接
  socketTask = uni.connectSocket({
    url: "ws://localhost:8000/ws/v1/chats/callchain",
    complete: () => {},
  });

  // 监听连接打开
  socketTask.onOpen(() => {
    console.log("WS连接成功");
    socketTask.send({
      data: JSON.stringify({ message: "如何实现高质量发展" }),
      success: () => console.log("消息发送成功"),
    });
  });

  // 监听消息接收
  socketTask.onMessage((res) => {
    if (typeof res.data === "string") {
      const result = JSON.parse(res.data);
      if (result.type === "reasoning") {
        reasoningContent.value += result.content;
      }
      if (result.type === "answer") {
        answerContent.value += result.content;
      }
      if (result.type === "done") {
        console.log("[结束]");
      }
    } else {
      streamingContent.value += res.data;
    }
  });

  // 错误处理
  socketTask.onError((err) => {
    console.error("WS错误:", err);
  });
};

// 页面卸载时关闭连接
onBeforeUnmount(() => {
  if (socketTask) {
    socketTask.close({ reason: "页面关闭" });
  }
  streamInstance?.socketTask.close(); // 关闭MarkdownStream的WebSocket连接
});
</script>