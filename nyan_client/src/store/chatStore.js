import { defineStore } from 'pinia'
import { SSEClient } from '@/common/sseClient'
import { reactive } from 'vue'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [],
    currentSessionId: Date.now().toString(),
    isStreaming: false,
    sseClient: new SSEClient()
  }),

  actions: {
    async sendMessage(content) {
      this.addMessage({content, isBot: false});
      this.addMessage({content: '正在思考中...', isBot: true});

      await this.sseClient.connect(
        '/api/v1/chats/streamtest',
        { message: content },
        {
          onMessage: (data) => {
            this.appendBotMessageChunk(data)
          },
          onDone: () => {
            this.endStreaming()
            console.log('SSE数据解析完成...')
          },
          onError: (err) => {
            this.addErrorMessage(err)
          }
        })
    },

    cancelStream() {
      this.sseClient.disconnect()
      this.isStreaming = false
    },
    addMessage(msg) {
      this.messages.push({
        ...msg,
        timestamp: Date.now()
      })
      this.persistMessages()
    },

    appendBotMessageChunk(chunk) {
      const lastMsg = this.messages[this.messages.length - 1]
      if (lastMsg?.isBot) {
        lastMsg.content += chunk
      } else {
        this.addMessage({
          id: Date.now().toString(),
          content: chunk,
          isBot: true
        })
      }
      this.persistMessages()
    },

    startNewStream() {
      this.isStreaming = true
      this.currentSessionId = Date.now().toString()
      console.log('start new stream:', this.currentSessionId)
    },

    endStreaming() {
      this.isStreaming = false
    },

    addErrorMessage(content) {
      this.addMessage({ id: Date.now().toString(), content, isBot: true })
      this.endStreaming()
    },

    persistMessages() {
      try {
        localStorage.setItem('chatMessages', JSON.stringify(this.messages))
      } catch (err) {
        console.error('LocalStorage 存储失败:', err)
      }
    },

    loadPersistedMessages() {
      const saved = localStorage.getItem('chatMessages')
      if (saved) {
        try {
          this.messages = JSON.parse(saved)
        } catch (err) {
          console.error('LocalStorage 读取失败:', err)
        }
      }
    }
  }
})
