<template>
  <div :class="['message-bubble', message.isBot ? 'bot' : 'user']">
    <div class="content" ref="contentRef"></div>
    <div class="timestamp">{{ formattedTime }}</div>
  </div>
</template>
  
  <script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

/**
    id: string
    content: string
    isBot: boolean
    timestamp?: number
   */
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});


const md = new MarkdownIt({
  html: true,
  linkify: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (_) {}
    }
    return "";
  },
});

const contentRef = ref();
const formattedTime = computed(() => {
  if (!props.message.timestamp) return "";
  return new Date(props.message.timestamp).toLocaleTimeString();
});

onMounted(() => {
  if (contentRef.value) {
    contentRef.value.innerHTML = md.render(props.message.content);
    contentRef.value.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  }
});
</script>
  
<style scoped>
/* 添加气泡样式 */
</style>
  