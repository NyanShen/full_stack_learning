const Joi = require('joi');

/**
 * 基本数据校验
 * 新增修改部门时, 可关联角色
 */
const base_limit = {
    pid: Joi.number().min(0).max(10).required().messages({
        'any.required': '父级部门不能为空',
        'string.min': '父级部门长度不能小于 {#limit} 个字符',
        'string.max': '父级部门长度不能大于 {#limit} 个字符',
    }),
    name: Joi.string().min(2).max(10).required().messages({
        'string.empty': '部门名称不能为空',
        'string.min': '部门名称长度不能小于 {#limit} 个字符',
        'string.max': '部门名称长度不能大于 {#limit} 个字符',
    }),
    leader: Joi.string(),
    phone: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'cn'] } }).messages({
        'string.email': '邮箱格式错误',
    }),
    status: Joi.number().empty([null, undefined]).default(1)
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
exports.create_limit = {
    // req.body数据验证
    body: {
        ...base_limit,
        id: Joi.number().required().messages({
            'any.required': '部门ID不能为空',
        })
    }
}