/**
 * Created by NyanShen on 24/05/07.
 * https://www.canvasapi.cn/
 * https://www.runoob.com/w3cnote/html5-canvas-intro.html
 */
function addWatermark(el, config) {
    // 创建一个canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // 获取设备像素比
    const devicePixelRatio = window.devicePixelRatio || 1;
    // 设置字体
    const font = config.fs * devicePixelRatio + 'px Arial';
    ctx.font = font; // 字体大小1, 这是在计算文字宽度之前进行的。
    // 获取文字宽度,
    const { width } = ctx.measureText(config.text);
    // 计算一个canvas pattern画布的宽高, 最小100 + 间隔距离 * 设备像素比
    const canvasSize = Math.max(100, width) + config.gap * devicePixelRatio;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    // 画布画笔平移至画布中间开始绘制
    ctx.translate(canvas.width / 2, canvas.height / 2);
    // 旋转 30 度让文字变倾斜
    ctx.rotate((Math.PI / 180) * -30);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // 文字颜色
    /**
     * 这次设置是在一系列的图形操作之后，包括画布平移、旋转和设置文字颜色、对齐方式、基线和阴影。
     * 在这里再次设置 ctx.font 是为了确保在实际绘制文字时使用的是之前计算好的字体大小和类型。
     * 由于在旋转和平移之后，可能会影响到文字的绘制，所以这里再次确认字体属性，确保文字按照预期的方式显示在canvas上。
     */
    ctx.font = font; // 文字大小2, 这里设置又是为了什么
    ctx.textAlign = 'center'; // 文字水平居中
    ctx.textBaseline = 'middle';
    // 文字阴影 text-shadow: 0 0 10px rgba(0, 166, 90, .2)
    ctx.shadowColor = 'rgba(0, 166, 90, .2)'; 
    ctx.shadowOffsetY = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowBlur = 10;
    // 将文字画出来
    ctx.fillText(config.text, 0, 0);

    const styleSize = canvasSize / devicePixelRatio;  // 如: 实际图片200 * 200, 显示图片大小100 * 100
    const base64 = canvas.toDataURL();
    // 元素添加水印
    el.style.backgroundImage = `url('${base64}')`;
    el.style.backgroundSize = `${styleSize}px ${styleSize}px`;
    el.style.backgroundRepeat = 'repeat';
    el.style.zIndex = 9999;
    el.style.position = 'absolute';
    el.style.inset = 0;
    // 元素不会接收鼠标事件，鼠标事件会透过元素传递到下层的元素上
    el.style.pointerEvents = 'none';
  }
   // 移除水印
  function removeWatermark(el) {
    el.style.backgroundImage = 'none';
  }
export default {
    mounted(el, binding) {
        const watermarkConfig = binding.value; // 元素传入的参数
        watermarkConfig.gap = watermarkConfig.gap || 40; // 水印间距
        watermarkConfig.fs = watermarkConfig.fontSize || 30; // 字体大小
        watermarkConfig.text = watermarkConfig.text || "simple watermark"; // 水印文字
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