//sseClient.ts
import { fetchEventSource } from '@microsoft/fetch-event-source'

export class SSEClient {
  // controller: AbortController | null
  controller = null

  async connect(url, body, callback) {
    //  创建一个AbortController实例，用于控制fetch请求的取消
    this.controller = new AbortController()
    try {
      // 使用fetchEventSource函数发起一个POST请求
      await fetchEventSource(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body),
        signal: this.controller.signal,
        openWhenHidden: true, // 允许后台保持连接

        onopen: async (response) => {
          if (response.status !== 200) {
            throw new Error(`SSE连接失败: ${response.statusText}`)
          }
          console.log('SSE连接成功...')
        },
        onmessage: (event) => {
          try {
            if (event.data === '[DONE]') {
              callback.onDone();
              return
            };
            callback.onMessage(event.data)
          } catch (err) {
            console.error('SSE数据解析失败:', err)
          }
        },
        onerror: (err) => {
          callback.onError?.(err)
          this.disconnect()
        }
      })
    } catch (err) {
      console.error('SSE连接异常:', err)
    }
  }

  disconnect() {
    this.controller?.abort()
  }
}
