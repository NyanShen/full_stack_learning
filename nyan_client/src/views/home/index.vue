<template>
  <div class="chat-container" :class="{ 'has-messages': messages.length }">
    <ChatMessage :messages="messages" :loading="isStreaming" />
    <ChatInput placeholder="请输入您的问题..." :loading="isStreaming" @send="handleSubmit" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import MessageBubble from "@/components/MessageBubble.vue";
import StreamLoader from "@/components/StreamLoader.vue";
import ChatInput from "@/components/ChatInput.vue";
import ChatMessage from "@/components/ChatMessage.vue";
import { SSEClient } from "@/common/sseClient";
import { useStream } from "@/hooks/useStream";
const { messages, appendMessage, startStreamMessage, appendStreamMessage } =
  useStream();
const isStreaming = ref(false);
const sseClient = new SSEClient();

const contentRef = ref();
const handleSubmit = async (message) => {
  appendMessage(message);
  startStreamMessage();
  isStreaming.value = true;
  await sseClient.connect(
    "/api/v1/chats/streamtest",
    { message },
    {
      onMessage: (data) => {
        // 流式数据循环更新
        appendStreamMessage(data);
      },
      onDone: () => {
        console.log("SSE数据解析完成...");
        isStreaming.value = false;
      },
      onError: (err) => {
        // 错误处理（可选：更新消息为错误状态）
        isStreaming.value = false;
      },
    }
  );
};

onMounted(() => {});
</script>
<style lang="scss" scoped>
.chat-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 760px;
  height: 100%;
  margin: 0 auto;
  &.has-messages {
    .chat-input-container {
      position: sticky;
      bottom: 0;
      background: #fff;
      padding: 1rem 0;
    }
  }

  &:not(.has-messages) {
    justify-content: center;
    align-items: center;
  }
}
</style>