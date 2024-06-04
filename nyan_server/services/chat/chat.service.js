
const db = require("../../models/index");
const tools = require("../../utils/tools");
const chatModel = db.chat;
const chatMsgModel = db.chatMsg;
const userModel = db.user;
chatMsgModel.belongsTo(chatModel);
chatModel.hasMany(chatMsgModel, { as: "MsgList"});
chatModel.belongsTo(userModel, { as: "Sender", foreignKey: "senderId" })
chatModel.belongsTo(userModel, { as: "Receiver", foreignKey: "receiverId" })
/**
 * Created by NyanSHen on 24/05/28.
 * 聊天服务
 * chat service
 */
/**
 * @name 聊天服务-创建一个聊天室
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @description 创建一个聊天室, chatId, senderId, receiverId
 */
exports.createChatRoom = async (req, res) => {
    try {
        const singleChat = await chatModel.findOne({
            where: {
                senderId: req.body.senderId,
                receiverId: req.body.receiverId
            }
        })
        // 如果存在聊天室就不创建
        if (!singleChat) {
            await chatModel.create(req.body);
        }
        res.sendResult("操作成功", 200, singleChat);
    } catch (error) {
        res.sendResult(error, 500);
    }
}
/**
 * @name 聊天服务-获取所有聊天室列表
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @description 获取所有聊天室列表
 */
exports.fetchChatRoom = async (req, res) => {
    try {
        const result = await chatModel.findAll({
            include: [
                { model: userModel, as: "Sender", attributes: ["id", "name", "avatar"] },
                { model: userModel, as: "Receiver", attributes: ["id", "name", "avatar"] },
                {
                    model: chatMsgModel,
                    as: "MsgList",
                    attributes: ["content", "timestamp", "type", "readed"], // 或其他你想获取的聊天消息属性
                    required: false, // 左连接，确保即使没有消息也返回聊天室
                    duplicating: false, // 防止重复结果，如果设置了必要的群组操作
                    separate: true, // 分离查询，提高效率
                    limit: 1, // 限制每个聊天室只获取一条最新消息
                },
            ],
            attributes: {
                exclude: ['updatedAt']
            },
        });
        const transformedResult = result.map(chat => {
            let base = {
                id: chat.id,
                sender: chat.Sender,
                receiver: chat.Receiver,
                readed: "",
                latestMsgType: "",
                latestContent: "",
            }
            const lastChatItem = chat.MsgList[0];
            if (lastChatItem) {
                base.readed = lastChatItem.readed;
                base.latestMsgType = lastChatItem.type
                base.latestContent = lastChatItem.content
                base.latestTime = tools.formatChatListTime(lastChatItem.timestamp)
                base.timestamp = lastChatItem.timestamp;
            } else {
                base.latestTime = tools.formatChatListTime(new Date(chat.createdAt).getTime())
                base.timestamp = new Date(chat.createdAt).getTime();
            }
            return base
        })
        const sortedResult = transformedResult.sort((a, b) => {
            // 比较两个对象的timestamp，处理可能的null值
            if (a.timestamp === null) return 1; // a的timestamp为null，则b应排在a前面
            if (b.timestamp === null) return -1; // b的timestamp为null，则a应排在b前面
            return b.timestamp - a.timestamp; // 正常比较timestamp，降序
        });
        res.sendResult("操作成功", 200, sortedResult);
    } catch (error) {
        res.sendResult(error, 500);
    }
}
/**
 * @name 聊天服务-发送聊天消息
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @description 发送聊天消息, chatId, senderId, receiverId, content, type
 * 一个聊天室有多个消息, 一条消息只能属于一个聊天室
 */
exports.sendMsg = async (req, res) => {
    try {
        const chatroom = await chatModel.findByPk(req.body.chatId);
        if (!chatroom) {
            res.sendResult("不存在该聊天室", 500);
            return
        }
        await chatMsgModel.create(req.body);
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
        let result = await chatMsgModel.findAll({
            where: {
                chatId: req.query.chatId
            }
        })
        res.sendResult("查询成功", 200, { list: result });
    } catch (error) {
        res.sendResult(error, 500);
    }
}