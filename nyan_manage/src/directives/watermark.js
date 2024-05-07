/**
 * Created by NyanShen on 24/05/07.
 */
function addWatermark(el, config) {
    // 创建一个canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // 获取设备像素比
    const devicePixelRatio = window.devicePixelRatio || 1;
    // 设置字体
    const font = config.fs * devicePixelRatio + 'px Arial';
    ctx.font = font; // 字体大小1
    // 获取文字宽度,
    const { width } = ctx.measureText(config.text);
    // 计算一个canvas pattern的宽高, 最小100 + 间隔距离 * 设备像素比
    const canvasSize = Math.max(100, width) + config.gap * devicePixelRatio;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    // 画布平移
    ctx.translate(canvas.width / 2, canvas.height / 2);
    // 旋转 30 度让文字变倾斜
    ctx.rotate((Math.PI / 180) * -30);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // 文字颜色
    ctx.font = font; // 文字大小2
    ctx.textAlign = 'center'; // 文字水平居中
    ctx.textBaseline = 'middle';
    ctx.textShadow = '0 0 5px rgba(0, 0, 0, 0.1)'; // 文字阴影
    // 将文字画出来
    ctx.fillText(config.text, 0, 0);

    const styleSize = canvasSize / devicePixelRatio;
    const base64 = canvas.toDataURL('image/png');
    console.log("canvasSize>>>", canvasSize)
   
    el.style.backgroundImage = `url('${base64}')`;
    el.style.backgroundSize = `${styleSize}px ${styleSize}px`;
    el.style.backgroundRepeat = 'repeat';
    el.style.zIndex = 9999;
    el.style.position = 'absolute';
    el.style.inset = 0;
    // 元素不会接收鼠标事件，鼠标事件会透过元素传递到下层的元素上
    el.style.pointerEvents = 'none';
  }
   // 
  function removeWatermark(el) {
    el.style.backgroundImage = 'none';
  }
export default {
    mounted(el, binding) {
        const watermarkConfig = binding.value;
        watermarkConfig.gap = watermarkConfig.gap || 40
        watermarkConfig.fs = watermarkConfig.fontSize || 30
        watermarkConfig.text = watermarkConfig.text || "simple watermark"
        addWatermark(el, watermarkConfig);
        // 监听窗口大小变化，重新添加水印
        window.addEventListener('resize', () => {
          removeWatermark(el);
          addWatermark(el, watermarkConfig);
        });
      },
      unmounted(el) {
        removeWatermark(el);
      }
  };