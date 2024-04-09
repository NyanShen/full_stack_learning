import { defineStore } from "pinia"

export const useUserStore = defineStore('user', {
    state: () => ({
        userInfo: null, // 用户信息，如token等
        isLoggedIn: false, // 登录状态
    }),
    actions: {
        setLogin({ userInfo }) { // 登录操作，将用户信息保存到store中
            this.userInfo = userInfo; // 保存token等信息到userInfo中
            this.isLoggedIn = true; // 设置登录状态为true
        },
        setLogout() { // 登出操作，清除用户信息并设置登录状态为false
            this.userInfo = null;
            this.isLoggedIn = false;
        },
    },
})