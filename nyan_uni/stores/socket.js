import { defineStore } from 'pinia';
import { socket } from "@/common/socket";

export const useSocketStore = defineStore('socket', {
    state: () => ({
        isConnected: false,
    }),
    actions: {
        bindEvents() {
            socket.on("connect", () => {
                this.isConnected = true;
                console.log("socket connected");
            });

            socket.on("disconnect", () => {
                this.isConnected = false;
                console.log("socket disconnected");
            });
            socket.on("connect_error", (err) => {
                console.log(`connect_error due to ${err.message}`);
            });
            socket.on("chat", (data) => {
                console.log("chat", data);
            });
            socket.on("chat:msg", (data) => {
                console.log("chat msg", data);
            });
        },

        connect() {
            socket.connect();
            console.log("socket connecting");
        }
    }
})