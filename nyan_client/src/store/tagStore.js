/**
 * Created by NyanShen on 2024/04/20.
 * tag标签管理
 */
import { defineStore } from "pinia";

export const useTagStore = defineStore('tag', {
    state: () => ({
        defaultTag: {
            fullPath: "/home",
            meta: {
                title: "首页",
            },
        },
        /**
         * @description 打开的tags列表
         */
        opened: [], // 存储打开页面的标签
    }),
    actions: {
        setOpened(tag) {
            // 如果已经有了就不添加了
            if (this.opened.some(item => item.fullPath === tag.fullPath)) return
            this.opened.push(tag)
        },
        getNextTag(tag) {
            // 获取当前标签位置
            const index = this.opened.findIndex(item => item.fullPath === tag.fullPath);
            if (this.opened.length === 1) {
                return this.defaultTag;
            }
            // 如果是最后一个标签
            if (index === this.opened.length - 1) {
                return this.opened[index - 1]
            } else {
                return this.opened[index + 1]
            }
        },
        removeTag(tag) {
            this.opened = this.opened.filter(item => item.fullPath !== tag.fullPath);
        },
    }

})