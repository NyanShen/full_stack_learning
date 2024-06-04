const Joi = require('joi');
/**
 * 菜单基本数据校验
 */
const base_limit = {
    senderId: Joi.number().required().messages({
        'number.empty': '发送人不能为空',
    }),
    receiverId: Joi.number().required().messages({
        'number.empty': '接收人不能为空',
    }),
    status: Joi.number().empty([null, 0]).default(1),

}
/**
 * 发送消息
 */
exports.send_limit = {
    // req.body数据验证
    body: {
        ...base_limit,
        chatId: Joi.number().required().messages({
            'number.empty': '聊天ID不能为空',
        }),
        type: Joi.string().min(2).max(10).required().messages({
            'string.empty': '消息类型不能为空',
            'string.min': '消息类型长度不能小于 {#limit} 个字符',
            'string.max': '消息类型长度不能大于 {#limit} 个字符',
        }),
        content: Joi.string().required().messages({
            'string.empty': '消息内容不能为空',
        }),
    }
}
/**
 * 创建聊天室
 */
exports.chat_limit = {
    // req.body数据验证
    body: {
        ...base_limit,
    }
}
