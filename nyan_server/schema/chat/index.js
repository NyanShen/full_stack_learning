const Joi = require('joi');
/**
 * 菜单基本数据校验
 */
const base_limit = {
    type: Joi.string().min(2).max(10).required().messages({
        'string.empty': '消息类型不能为空',
        'string.min': '消息类型长度不能小于 {#limit} 个字符',
        'string.max': '消息类型长度不能大于 {#limit} 个字符',
    }),
    name: Joi.string().min(2).max(50).required().messages({
        'string.empty': '发送人不能为空',
        'string.min': '发送人长度不能小于 {#limit} 个字符',
        'string.max': '发送人长度不能大于 {#limit} 个字符',
    }),
    content: Joi.string().empty([null, ""]).default(""),
    status: Joi.number().empty([null, 0]).default(1),

}
/**
 * 菜单新增数据校验
 */
exports.send_limit = {
    // req.body数据验证
    body: {
        ...base_limit
    }
}
