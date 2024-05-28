const db = require("../../models/index");
const chatModel = db.chat;
/**
 * Created by NyanSHen on 24/05/28.
 * 聊天服务
 * chat service
 */
/**
 * @name 聊天服务-发送聊天消息
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Chat Object
 */
exports.sendMsg = async (req, res) => {
    try {
        await chatModel.create(req.body);
        res.sendResult("发送成功", 200);
    } catch (error) {
        res.sendResult(error, 500);
    }
}

/**
 * @name 聊天服务-聊天消息
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Chat List
 */
exports.chatList = async (req, res) => {
    try {
        let result = await chatModel.findAll()
        res.sendResult("查询成功", 200, { list: result });
    } catch (error) {
        res.sendResult(error, 500);
    }
}