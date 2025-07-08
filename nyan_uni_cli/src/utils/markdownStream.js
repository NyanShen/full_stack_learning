// utils/websocket.js
class MarkdownStream {
  constructor(url) {
    this.socketTask = null;
    this.renderCallback = () => { };

    this.socketTask = uni.connectSocket({
      url,
      complete: () => { }
    });

    this.socketTask.onMessage(msg => {
      this.renderCallback(msg.data);
    });

    this.socketTask.onOpen(() => {
      this.socketTask.send({
        data: JSON.stringify({ message: "简述全面深化改革开放"}),
        success: () => console.log("消息发送成功"),
      });
    });
  }

  throttleRender(fn, delay = 50) {
    let timer = null;
    return function (...args) {
      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(this, args);
          timer = null;
        }, delay);
      }
    };
  }
}

export default MarkdownStream;