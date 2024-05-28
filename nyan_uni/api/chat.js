import $request from "./request";

/**
 * 发送聊天信息
 */
export const sendChatMsg = (data) => {
    return $request.baseRequest({ method: "POST", apiPath: "/chat/sendMsg", data });
};
/**
 * 聊天信息列表
 */
export const fetchChatList = (data) => {
    return $request.baseRequest({ apiPath: "/chat/list", data });
};