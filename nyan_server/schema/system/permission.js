const Joi = require('joi');
/**
 * 基本数据校验
 */
const base_limit = {
    code: Joi.string().min(2).max(50).required().messages({
        'any.required': '权限编码不能为空',
        'string.min': '权限编码长度不能小于 {#limit} 个字符',
        'string.max': '权限编码长度不能大于 {#limit} 个字符',
    }),
    name: Joi.string().min(2).max(50).required().messages({
        'string.empty': '权限名称不能为空',
        'string.min': '权限名称长度不能小于 {#limit} 个字符',
        'string.max': '权限名称长度不能大于 {#limit} 个字符',
    }),
    desc: Joi.string().empty(null).default(''),
    status: Joi.number().empty(null).default(1),
    menuIds: Joi.string().empty([null, '']).default('')
}
/**
 * 新增校验
 */
exports.create_limit = {
    // req.body数据验证
    body: {
        ...base_limit
    }
}
/**
 * 修改校验
 */
exports.update_limit = {
    // req.body数据验证
    body: {
        ...base_limit,
        id: Joi.number().required().messages({
            'any.required': '权限ID不能为空',
        })
    }
}