// utils/websocket.js
class MarkdownStream {
    constructor(url) {
      this.socketTask = null;
      this.renderCallback = () => {};
      
      this.socketTask = uni.connectSocket({
        url,
        complete: () => {}
      });
      
      this.socketTask.onMessage(msg => {
        this.renderCallback(msg.data); 
      });
    }
  
    throttleRender(fn, delay = 300) {
      let timer = null;
      return function(...args) {
        if(!timer) {
          timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
          }, delay);
        }
      };
    }
  }
  
  export default MarkdownStream;