/**
 * 实时消息监听
 */
import $miniApp from "@/utils/mini.app.api";

class RecipeSocket {
  /**
   * 当前咨询窗口id
   */
  consultId = null;
  /**
   * socket实例
   */
  ws = null;
  /**
   * 重连次数
   */
  count = 0;
  /**
   * 最大链接限制 
   */
  limit = 2;
  /**
   * 防止重连
   */
  reconnectLock = false;
  /**
   * 重连定时器
   */
  reconnectTimer = null;
  /**
   * 重连间隔时间
   */
  reconnectInterval = 5000;
  /**
   * 心跳定时器
   */
  heartTimer = null;
  /**
   * 心跳超时时间设置为60秒
   */
  heartTimeout = 60000;
  /**
   * 心跳定时器
   */
  heartIntervaler = null;
  /**
   * 监测心跳时间40s
   */
  heartInterval = 40000;
  /**
   * 是否正常关闭
   */
  closeNormal = false;
  /**
   * 初始化socket实例-登录后获取token建立socket链接
   */
  constructor() {
    this.url = null; // scoket url
    console.log('recipe flow socket初始化');
    this.token = $miniApp.getStorageSync('internet_login_token');
    // this.token && this.connect(); // 完成登录之后建立链接
  }
  /**
   * 建立连接时传入token
   */
  connect() {
    try {
      if (this.isConnected()) {
        console.log("socket已连接，无需再次连接")
        return;
      }
      this.token = this.token ? this.token : $miniApp.getStorageSync('internet_login_token');
      this.url = `${import.meta.env.VITE_KF_CHAT_SOCKET_URL}/1/mobile/zxyy?token=${this.token}`;
      this.ws = uni.connectSocket({
        url: this.url,
        success: (res) => {
          console.log('连接socket: connectSocket success', res)
        },
        fail: (error) => {
          console.log(error)
          this.reconnect(); // 连接失败，重新连接
        },
      });
      this.initSocketEvent();
    } catch (error) {
      this.reconnect();
      console.log("socket建立链接异常", error)
    }
  }
  /**
   * 重新链接
   */
  reconnect() {
    // 超过最大次数不进行重连
    if (this.count > this.limit) {
      return;
    }
    if (this.reconnectLock) {
      return;
    }
    this.reconnectLock = true;
    // 重连时需要清空定时器
    this.clearTimer();
    this.count += 1;
    this.reconnectTimer = setTimeout(() => {
      this.connect();
      this.reconnectLock = false;
      console.log('第' + this.count + '次重连')
    }, this.reconnectInterval);
  }
  /**
   * 初始化事件
   */
  initSocketEvent() {
    this.ws.onOpen(() => {
      console.log('连接成功')
      this.count = 0;
      this.startHeartBeat();
    })

    this.ws.onMessage((e) => {
      console.log('收到消息', e)
      this.receiveMsgHandler(e.data);
      // 收到任何数据，重新开始心跳
      clearTimeout(this.heartTimer);
    })

    this.ws.onClose(() => {
      // 是否正常关闭，正常关闭不用重连
      if (!this.closeNormal) {
        console.log('异常关闭，重新链接')
        this.reconnect();
        return
      }
      console.log('连接正常关闭')
    })

    this.ws.onError(() => {
      console.log('连接错误')
    })
  }
  /**
   * 监听事件
   */
  on(eventName, callback) {
    uni.$on(eventName, callback);
  }
  /**
   * 取消监听事件
   */
  off(eventName, callback) {
    callback ? uni.$off(eventName, callback) :  uni.$off(eventName);
  } 
  /**
   * 心跳
   */
  onHeartBeat() {
    // 清除上次心跳定时器
    this.clearHeartTimer();
    // 发送心跳PING消息
    this.sendMsg('ping');
    // 设置心跳超时
    this.heartTimer = setTimeout(() => {
      // 心跳超时, 设置异常关闭socket, 重新尝试连接
      this.reconnectLock = false;
      this.closeNormal = false;
      this.ws.close();
      console.log('心跳检测连接异常，关闭socket')
    }, this.heartTimeout)
  }
  /**
   * 检测心跳
   */
  startHeartBeat() {
    this.onHeartBeat();
    this.heartIntervaler = setInterval(() => {
      this.onHeartBeat();
    }, this.heartInterval)
  }
  /**
   * 发送消息
   */
  sendMsg(msg) {
    if (this.isConnected()) {
      this.ws.send({
        data: msg,
        success: () => { },
        fail: () => { }
      });
    }
  }
  /**
   * 关闭心跳定时器
   */
  clearHeartTimer() {
    if (this.heartIntervaler) {
      clearInterval(this.heartIntervaler)
    }
    if (this.heartTimer) {
      clearTimeout(this.heartTimer)
    }
  }
  /**
   * 关闭相关定时器
   */
  clearTimer() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
    }
    this.clearHeartTimer();
  }
  /***
   * 正常关闭socket
   */
  close() {
    this.count = 0;
    this.closeNormal = true;
    this.clearTimer();
    this.ws.close();
  }
  isConnected() {
    console.log('socket是否连接, 1为已连接:', this.ws?.readyState)
    return this.ws && this.ws.readyState === this.ws.OPEN
  }
  
  /**
   * 接收消息处理中转站
   */
  receiveMsgHandler(data) {
    try {
      let msg = JSON.parse(data.trim());
      console.log('接收到消息 receiveMsgHandler result:', msg)
      // 1. 根据消息内容类型
      if (msg.type) {
        switch (parseInt(msg.type)) {
          case 1: // 咨询消息
            // 医生端缓存患者端发送的消息，不在当前聊天窗口
            msg.source == 1 && msg.consultId != this.consultId && this.setMsgUnread(msg.consultId, msg);
            // 咨询消息监听
            uni.$emit('chat_msg', msg);
            // 结束咨询
            msg.msgType === '3' && msg.source == 1 && uni.$emit('chat_end_msg', msg);
            // 患者发送消息未接通消息
            msg.msgType === '11' && msg.source == 1 && uni.$emit('video_hangup_msg', msg);
            break;
          case 2: // 音视频消息
            uni.$emit('video_msg', msg);
            break;
          case 7: // 药店发消息通知医生当前视频通话占线
            uni.$emit('video_close_msg', msg);
            break;
          case 9: //新咨询单
            uni.$emit('new_consult_msg', msg);
            break;
          default: // 默认消息
            uni.$emit('default_msg', msg);
        }
      }
    } catch (error) {
      // 捕获不是JSON字符串格式的消息
      console.log("捕获不是JSON字符串格式的消息:", error)
    }
  }
  setMsgStorage(value) {
    uni.setStorageSync('msg_unread', value)
  }
  getMsgStorage() {
    return uni.getStorageSync('msg_unread')
  }
  /**
   * 缓存对方发送过来的未读消息
   * 先获取未读消息，再设置未读消息
   * msg_unread：{${consultId}: <msg>[]}
   */
  setMsgUnread(id, msg) {
    let tempMsg = this.getMsgStorage();
    if (tempMsg) {
      tempMsg = JSON.parse(tempMsg)
      tempMsg[id] ? tempMsg[id].push(msg) : tempMsg[id] = [msg]
    } else {
      tempMsg = {}
      tempMsg[id] = [msg]
    }
    this.setMsgStorage(JSON.stringify(tempMsg))
  }
  /**
   * 获取某个咨询记录的未读消息
   */
  getMsgUnread(id) {
    let tempMsg = this.getMsgStorage();
    if (tempMsg) {
      tempMsg = JSON.parse(tempMsg)
      return tempMsg[id] || []
    } else {
      return []
    }
  }
  /**
   * 获取所有未读消息
   * msg_unread：{${consultId}: <msg>[]}
   */
  getAllMsgUnread() {
    let tempMsg = this.getMsgStorage();
    if (tempMsg) {
      tempMsg = JSON.parse(tempMsg)
      return tempMsg
    } else {
      return {}
    }
  }
  /**
   * 更新未读消息
   * 设置消息已读移除未读消息
   */
  updateMsgUnread(id) {
    let tempMsg = this.getMsgStorage();
    if (tempMsg) {
      tempMsg = JSON.parse(tempMsg)
      delete tempMsg[id]
      this.setMsgStorage(JSON.stringify(tempMsg));
    }
  }
}
// 创建全局药店端shop websocket实例：clientType：2，TerminalType: pc，hospitalId：none
/**
 * hospitalId: zxyy （市中心医院）;zysdyrmyy  （枣阳市第一人民医院）;dyrmyy (市一医院) none 药店
 * TerminalType: pc | mobile
 * clientType:// 客户端类型 1:医生 2:shop 3:患者
 * 1 doctor connection : clientid=doctorId(token); hospitalId=(zysdyrmyy|zxyy|dyrmyy); 有pc,mobile 2端
 * 2 shop connection : clientid=deptId(token); hospitalId=none; 有pc 1端
 * 3 patient connection : clientid=openid(token); hospitalId=none;  有mobile 1端
 * wss://ip:port/ws/websocket/{3}/{mobile}/{none}?token=openid
 * wss://ip:port/ws/websocket/{clientType}/{TerminalType}/{hospitalId}?token=xxxxx
 */
export const chatSocket = new RecipeSocket()
