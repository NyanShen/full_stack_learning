<template>
  <!--  -->
  <view class="page-container">
    <canvas class="barcode" canvas-id="barcode" id="barcode"></canvas>
    <view class="canvas-container">
      <canvas
        id="patient_card_poster"
        canvas-id="patient_card_poster"
        :style="{
          width: canvasConfig.width + 'px',
          height: canvasConfig.height + 'px',
        }"
      ></canvas>
    </view>
    <view class="btn-container">
      <button class="btn btn-plain" @click="drawPatientCard">
        生成就诊卡条形码
      </button>
      <button class="btn btn-primary" @click="savePosterCard">
        分享就诊卡条形码
      </button>
    </view>
  </view>
</template>
<script setup>
import { ref, getCurrentInstance, nextTick } from "vue";
import { onReady } from "@dcloudio/uni-app";
import { tobarcode } from "@/common/js/tobarcode";
import canvasTools from "@/common/js/canvasTools";
const canvasCtx = ref(null);

const topx = (len) => {
  return uni.upx2px(len);
};
const canvasConfig = {
  width: topx(690),
  height: topx(1000),
};
const businessConfig = {
  name: "CITA",
  floor: "门诊楼3楼",
  deptName: "神经内科",
  doctorName: "王德财",
  doctorTitle: "主任医师",
  time: "2021.08.12 8:00-8:30",
  patientName: "王大伟",
  patientId: "2551110266",
  patientAge: "31",
  patientGender: "女",
};

/**
 * 绘制患者卡片
 */
const drawPatientCard = async () => {
  // 先获取条码临时路径用于绘制到目标canvas
  tobarcode(
    "barcode",
    getCurrentInstance(),
    businessConfig.patientId,
    300,
    125
  );
  const result = await uni.canvasToTempFilePath({
    canvasId: "barcode",
  });
  // 绘制卡片海报背景图片
  canvasCtx.value.drawImage(
    "/static/images/posterbg.png",
    0,
    0,
    canvasConfig.width,
    canvasConfig.height
  );
  canvasCtx.value.setGlobalAlpha(0.5);
  // 绘制中间条码卡片
  canvasTools.drawRoundedRect(
    canvasCtx.value,
    topx(30),
    topx(376),
    topx(630),
    topx(340),
    15,
    "#FFFFFF"
  );
  canvasCtx.value.setGlobalAlpha(1);
  canvasCtx.value.drawImage(
    result.tempFilePath,
    topx(330),
    topx(538),
    300,
    125
  );
  // 绘制标题-设置颜色、字体,然后绘制, 位置中间
  canvasCtx.value.setFillStyle("#274B7A");
  canvasCtx.value.setFontSize(topx(36));
  // 获取字的宽度
  const titleWidth = canvasCtx.value.measureText("就医时请出示").width;
  canvasCtx.value.fillText(
    "就医时请出示",
    (canvasConfig.width - titleWidth) / 2,
    topx(80)
  );
  // 绘制卡片患者预约信息
  canvasCtx.value.setFillStyle("#989EA7");
  canvasCtx.value.setFontSize(topx(30));
  canvasCtx.value.fillText("就诊时间：", topx(60), topx(170));
  canvasCtx.value.fillText("就诊位置：", topx(60), topx(230));
  canvasCtx.value.fillText("挂号医生：", topx(60), topx(288));
  canvasCtx.value.fillText(
    `${businessConfig.patientGender} | ${businessConfig.patientAge}岁`,
    topx(60),
    topx(560)
  );
  canvasCtx.value.fillText(
    `卡号：${businessConfig.patientId}`,
    topx(60),
    topx(627)
  );
  canvasCtx.value.setFillStyle("#EA9822");
  canvasCtx.value.fillText(`${businessConfig.time}`, topx(208), topx(170));
  canvasCtx.value.fillText(`${businessConfig.floor}`, topx(208), topx(230));
  // 获取字的宽度
  const textW1 = canvasCtx.value.measureText(`${businessConfig.floor}`).width;
  canvasCtx.value.fillText(
    `${businessConfig.deptName}`,
    topx(228) + textW1,
    topx(230)
  );
  // 挂号医生
  canvasCtx.value.setFillStyle("#333333");
  canvasCtx.value.fillText(
    `${businessConfig.doctorName}`,
    topx(208),
    topx(287)
  );
  // 获取字的宽度
  const textW2 = canvasCtx.value.measureText(
    `${businessConfig.doctorName}`
  ).width;
  canvasCtx.value.fillText(
    `${businessConfig.doctorTitle}`,
    topx(228) + textW2,
    topx(287)
  );
  canvasCtx.value.fillText("就诊码", topx(60), topx(441));
  canvasCtx.value.fillText(
    `${businessConfig.patientName}`,
    topx(60),
    topx(507)
  );
  // 绘制小程序宣传码
  canvasCtx.value.drawImage(
    "/static/images/minicode.png",
    topx(39),
    topx(776),
    topx(158),
    topx(158)
  );
  canvasCtx.value.setFillStyle("#D4B38C");
  canvasCtx.value.fillText("扫码／长按识别进入", topx(240), topx(845));
  canvasCtx.value.fillText("襄阳市中医医院小程序", topx(240), topx(890));
  canvasCtx.value.draw();
};
/**
 * savePosterCard
 */
const savePosterCard = async () => {
  let result = await uni.canvasToTempFilePath({
    canvasId: "patient_card_poster",
  });
  uni.showShareImageMenu({
    path: result.tempFilePath,
  });
};
onReady(() => {
  canvasCtx.value = uni.createCanvasContext("patient_card_poster");
  nextTick(() => {
    // drawPatientCard();
  });
});
</script>
<style lang="scss" scoped>
.btn-container {
  padding: 30rpx;
}

.barcode {
  position: absolute;
  top: -1000rpx;
  left: -1000rpx;
}

.canvas-container {
  width: 690rpx;
  height: 1000rpx;
  margin: 0 auto;
  padding-top: 40rpx;
}
</style>