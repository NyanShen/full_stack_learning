import { defineStore } from "pinia";
import screenfull from 'screenfull';
import $message from "@common/message";

export const useFullscreenStore = defineStore('fullscreen', {
    state: () => ({
        isFullscreen: false
    }),
    actions: {
        setChange() {
            this.isFullscreen = screenfull.isFullscreen;
        },
        /**
         * 初始化监听
         */
        init() {
            if (screenfull.isEnabled) {
                screenfull.on('change', this.setChange);
            }
        },
        /**
         * 退出清除
         */
        destroy() {
            if (screenfull.isEnabled) {
                screenfull.off('change', this.setChange);
            }
        },
        /**
         * 切换
         */
        toggle() {
            if (!screenfull.isEnabled) {
                $message.warning("你的浏览器不支持全屏");
                return false
              }
              screenfull.toggle()
        }
    }
})