<!-- pages/markdown-page.vue -->
<template>
    <view class="container">
      <MarkdownRenderer ref="markdown" />
      <button @click="startStream">开始流式输出</button>
      
    </view>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import MarkdownRenderer from '@/components/MarkdownRenderer.vue'
  
  const markdown = ref()
  
  // 模拟流式数据
  const mockStream = () => {
    let count = 0
    const interval = setInterval(() => {
      const text = `这是第 ${++count} 段流式文本\n\n## 标题 ${count}\n- 列表项 ${count}\n`
      markdown.value.handleStreamData(text)
      if (count >= 20) clearInterval(interval)
    }, 500)
  }
  
  // 实际项目中使用 WebSocket/SSE
  const startStream = () => {
    // const ws = createWebSocket('wss://your-stream-api')
    // ws.onmessage = (e) => markdown.value.handleStreamData(e.data)
    mockStream()
  }
  </script>