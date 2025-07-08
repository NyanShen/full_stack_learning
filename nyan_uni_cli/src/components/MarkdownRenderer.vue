<!-- components/MarkdownRenderer.vue -->
<template>
    <view class="markdown-container">
      <rich-text :nodes="rendered" />
    </view>
  </template>
  
  <script setup>
  import MarkdownIt from 'markdown-it'
  import { ref, computed } from 'vue'
  
  const md = MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  })
  
  // 流式数据缓冲区
  const buffer = ref('')
  // 已渲染内容
  const rendered = ref('')
  
  // 动态计算渲染结果
  // const renderedNodes = computed(() => {
  //   return {
  //     type: 'html',
  //     content: rendered.value
  //   }
  // })
  
  // 流式数据处理函数
  const handleStreamData = (chunk) => {
    buffer.value += chunk
    // 每 500 字分段渲染
    const chunkSize = 500
    while (buffer.value.length > chunkSize) {
      const segment = buffer.value.slice(0, chunkSize)
      rendered.value += md.render(segment)
      buffer.value = buffer.value.slice(chunkSize)
    }
  }
  defineExpose({
    handleStreamData
  })
  </script>
  
  <style scoped>
  .markdown-container {
    padding: 20rpx;
    line-height: 2.5;
  }
  </style>