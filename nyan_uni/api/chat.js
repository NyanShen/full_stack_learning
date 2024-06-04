import $request from "./request";

/**
 * 创建聊天房间
 */
export const createChatRoom = (data) => {
    return $request.baseRequest({ method: "POST", apiPath: "/chat/createChatRoom", data });
};
/**
 * 获取聊天房间列表
 */
export const fetchChatRoom = (data) => {
    return $request.baseRequest({ method: "GET", apiPath: "/chat/room", data });
};

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