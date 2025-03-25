<template>
    <view class="container">
      <scroll-view scroll-y>
        <text>{{ streamingContent }}</text>
      </scroll-view>
      <button @click="connectWS">开始接收流</button>
    </view>
  </template>
  
  <script setup>
  import { ref, onBeforeUnmount } from 'vue';
  
  const streamingContent = ref('');
  let socketTask = null;
  
  const connectWS = () => {
    // 初始化WebSocket连接
    socketTask = uni.connectSocket({
      url: 'ws://localhost:8000/ws/v1/chats/question',
      complete: () => {}
    });
  
    // 监听连接打开
    socketTask.onOpen(() => {
      console.log('WS连接成功');
      socketTask.send({
        data: JSON.stringify({ message: "如何实现高质量发展" }),
        success: () => console.log('消息发送成功')
      });
    });
  
    // 监听消息接收
    socketTask.onMessage((res) => {
      if (typeof res.data === 'string') {
        streamingContent.value += res.data;
      }
    });
  
    // 错误处理
    socketTask.onError((err) => {
      console.error('WS错误:', err);
    });
  };
  
  // 页面卸载时关闭连接
  onBeforeUnmount(() => {
    if (socketTask) {
      socketTask.close({ reason: '页面关闭' });
    }
  });
  </script>