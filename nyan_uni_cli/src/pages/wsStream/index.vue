<template>
  <view class="container">
    <scroll-view scroll-y>
      <text>{{ streamingContent }}</text>
      <text>{{ reasoningContent }}</text>
      <!-- <div v-html="answerContent"></div> -->
      <rich-text :nodes="answerContent" />
    </scroll-view>
    <button @click="connectWS">开始接收流</button>
  </view>
</template>
  
  <script setup>
import { ref, onBeforeUnmount } from "vue";
import MarkdownStream from "@/utils/markdownStream";
import { marked } from 'marked';

// 配置 Markdown 解析规则
marked.setOptions({
  breaks: true,      // 自动换行
  gfm: true,         // 支持 GitHub Flavored Markdown
  highlight: (code, lang) => {
    return hljs.highlightAuto(code).value; // 自动检测语言
  }
});

const streamingContent = ref("");
const reasoningContent = ref("推理过程：");
const answerContent = ref("");
let socketTask = null;
let updateTimer = null;
let rawBuffer = '';
// 流式输入处理方法
const appendChunk = (chunk) => {
  rawBuffer += chunk;
  // 防抖处理（每200ms更新一次）
  clearTimeout(updateTimer);
  updateTimer = setTimeout(() => {
    answerContent.value = marked.parse(rawBuffer);
  }, 100);
};
const connectWS = () => {
  // 初始化WebSocket连接
  // socketTask = uni.connectSocket({
  //   url: "ws://localhost:8000/ws/v1/chats/callchain",
  //   complete: () => {},
  // });

  // 监听连接打开
  // socketTask.onOpen(() => {
  //   console.log("WS连接成功");
  //   socketTask.send({
  //     data: JSON.stringify({ message: "如何实现高质量发展" }),
  //     success: () => console.log("消息发送成功"),
  //   });
  // });
  const streamInstance = new MarkdownStream(
    "ws://localhost:8000/ws/v1/chats/callchain"
  );
  streamInstance.renderCallback = (raw) => {
    const result = JSON.parse(raw);
    if (result.type === "reasoning") {
      reasoningContent.value += result.content;
    }
    if (result.type === "answer") {
      // 安全过滤与解析
      // const cleanMd = xss(result.content);
      answerContent.value += marked.parse(result.content);
    }
    if (result.type === "done") {
      console.log("[结束]");
    }
  };
  

  // 监听消息接收
  // socketTask.onMessage((res) => {
  //   if (typeof res.data === "string") {
  //     const result = JSON.parse(res.data);
  //     if (result.type === "reasoning") {
  //       reasoningContent.value += result.content;
  //     }
  //     if (result.type === "answer") {
  //       answerContent.value += result.content;
  //     }
  //     if (result.type === "done") {
  //       console.log("[结束]");
  //     }
  //   } else {
  //     streamingContent.value += res.data;
  //   }
  // });

  // // 错误处理
  // socketTask.onError((err) => {
  //   console.error("WS错误:", err);
  // });
};

// 页面卸载时关闭连接
onBeforeUnmount(() => {
  if (socketTask) {
    socketTask.close({ reason: "页面关闭" });
  }
  streamInstance?.socketTask.close(); // 关闭MarkdownStream的WebSocket连接
});
</script>