<template>
  <div class="chat-message">
    <!-- 消息列表 -->
    <div ref="messagesContainer" class="messages-container" v-if="messages.length > 0">
      <transition-group name="message-fade">
        <div
          v-for="(message, index) in messages"
          :key="message.id"
          class="message-wrapper"
          :class="[
            message.senderType,
            { 'first-of-group': isFirstOfGroup(index) },
          ]"
        >
          <!-- 头像 -->
          <div v-if="showAvatar(message, index)" class="avatar">
            <img
              v-if="message.senderType === 'user'"
              :src="userAvatar"
              alt="User Avatar"
            />
            <div v-else class="bot-avatar">
              <font-awesome-icon icon="fa-solid fa-book" />
            </div>
          </div>

          <!-- 消息内容 -->
          <div class="message-content">
            <div class="message-bubble">
              <div v-if="message.contentType === 'text'">
                {{ message.content }}
              </div>
              <div
                v-else-if="message.contentType === 'markdown'"
                class="markdown-content"
                v-html="renderMarkdown(message.content)"
              ></div>
              <!-- 思考中.... -->
              <StreamLoader v-if="!message.content" />
              <!-- 可扩展其他内容类型 -->
            </div>
            <div class="message-time">
              {{ formatTime(message.timestamp) }}
            </div>
          </div>
        </div>
        
      </transition-group>
    </div>
    <div class="emptyContainer" v-else>
        <h4>我是 NyanShen，很高兴见到你！</h4>
        <p>我可以帮你写代码、读文件、写作各种创意内容，请把你的任务交给我吧~</p>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, watch, nextTick } from "vue";
import dayjs from "dayjs";
import MarkdownIt from "markdown-it";
import DOMPurify from "dompurify";
import StreamLoader from "./StreamLoader.vue";
import defaultAvatar from "@/assets/default_avatar.png"
/**
   * messages: [
  {
    id: 1,
    senderType: 'user', // 'user' 或 'assistant'
    contentType: 'text',
    content: '你好，DeepSeek！',
    timestamp: 1717020800000,
    status: 'sent'
  },
  {
    id: 2,
    senderType: 'assistant',
    contentType: 'text',
    content: '你好！我是DeepSeek，有什么可以帮您？',
    timestamp: 1717020800200,
    status: 'received'
  }
]
   */
const props = defineProps({
  messages: {
    type: Array,
    default: () => [],
  },
  userAvatar: {
    type: Object,
    default: defaultAvatar,
  },
});

const messagesContainer = ref(null);

// 自动滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTo({
        top: messagesContainer.value.scrollHeight,
        behavior: "smooth",
      });
    }
  });
};
const renderMarkdown = (raw) => {
  const md = new MarkdownIt({
    html: true, // 启用 HTML 标签
    linkify: true, // 自动识别链接
    typographer: true, // 优化排版
    breaks: true, // 自动换行
  });
  // 使用 DOMPurify 消毒
  return DOMPurify.sanitize(md.render(raw || ""));
};

// 格式化时间
const formatTime = (timestamp) => {
  return dayjs(timestamp).format("HH:mm");
};

// 判断是否显示头像
const showAvatar = (message, index) => {
  if (index === 0) return true;
  return message.senderType !== props.messages[index - 1].senderType;
};

// 判断是否是连续消息的第一条
const isFirstOfGroup = (index) => {
  if (index === 0) return true;
  return (
    props.messages[index].senderType !== props.messages[index - 1].senderType
  );
};

// 监听消息变化自动滚动
watch(
  () => [props.messages],
  () => {
    scrollToBottom();
  },
  { deep: true }
);
</script>
  
  <style lang="scss">
@import "@/styles/variables.scss";

.chat-message {
  width: 100%;
  flex-grow: 1;
  padding: 38px 0 40px;
  margin: auto;
  box-sizing: border-box;
  background: $background-color;

}
.emptyContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.messages-container {
  height: calc(100vh - 200px);
  padding: 1rem;
  overflow-y: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 0;
  }

  &::-webkit-scrollbar-track {
    background: $scrollbar-track;
  }

  &::-webkit-scrollbar-thumb {
    background: $scrollbar-thumb;
    border-radius: 4px;
  }
}

.message-wrapper {
  display: flex;
  margin: 0.5rem 0;
  transition: all 0.3s ease;

  &.user {
    flex-direction: row-reverse;

    .message-content {
      align-items: flex-end;
    }

    .message-bubble {
      background: $user-bubble-bg;
      color: $user-bubble-color;
      border-radius: 1rem 0.25rem 1rem 1rem;
    }
  }

  &.assistant {
    .message-bubble {
      background: $bot-bubble-bg;
      color: $bot-bubble-color;
      border-radius: 0.25rem 1rem 1rem 1rem;
    }
  }

  &.first-of-group {
    margin-top: 1.2rem;
  }
}

.avatar {
  width: 32px;
  height: 32px;
  margin: 0 0.75rem;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  .bot-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: $primary-color;
    color: white;

    svg {
      width: 18px;
      height: 18px;
    }
  }
}

.message-content {
  max-width: 75%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.message-bubble {
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  line-height: 1.5;
  word-break: break-word;
  white-space: pre-wrap;
  box-shadow: $bubble-shadow;
  transition: background 0.3s ease;
}

.message-time {
  font-size: 0.75rem;
  color: $text-secondary;
}

/* 消息进入动画 */
.message-fade-enter-active {
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(10px);
}

.message-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.markdown-content {
  line-height: 1.6;

  h1,
  h2,
  h3 {
    margin: 1em 0;
    font-weight: bold;
  }

  p {
    margin: 0.8em 0;
  }

  a {
    color: #0366d6;
    text-decoration: underline;
  }

  code {
    background-color: #f3f4f6;
    padding: 0.2em 0.4em;
    border-radius: 3px;
  }

  pre {
    background-color: #f6f8fa;
    padding: 1em;
    border-radius: 6px;
    overflow-x: auto;

    code {
      background-color: transparent;
      padding: 0;
    }
  }

  blockquote {
    border-left: 4px solid #dfe2e5;
    color: #6a737d;
    padding: 0 1em;
    margin: 1em 0;
  }
}
@media (max-width: 768px) {
  .message-content {
    max-width: 85%;
  }

  .avatar {
    width: 28px;
    height: 28px;
    margin: 0 0.5rem;
  }
}
</style>