/**
 * Created by NyanShen on 2024/04/20.
 * tag标签管理
 */
import { defineStore } from "pinia";

export const useTagStore = defineStore('tag', {
    state: () => ({
        opened: [], // 存储打开页面的标签
    }),
    actions: {
        setOpened(opened) {
            this.opened = opened
        },
        removeOpened(tag) {
            this.opened = this.opened.filter(item => item.path !== tag.path)
        },
    }

})