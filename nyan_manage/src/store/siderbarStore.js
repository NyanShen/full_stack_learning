import { defineStore } from "pinia";

export const useSidebarStore = defineStore('sidebar', {
    state: () => ({
        isCollapse: false, // 展开关闭菜单
        menus: []
    }),
    actions: {
        toggleIsCollapse() {
            this.isCollapse = !this.isCollapse;
        }
    }

})