import { io } from "socket.io-client";
import $constant from "./constants.js"

const URL = $constant.CONFIG.socketUrl;

export const socket = io(URL);