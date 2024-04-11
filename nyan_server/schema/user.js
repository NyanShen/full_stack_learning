const Joi = require('joi');
const { login_base_limit } = require('./login');
/**
 * 
 * 用户基本数据校验
 */
const base_limit = {
    name: Joi.string(),
    sex: Joi.number(),
    state: Joi.number(),
    roleId: Joi.number(),
    avatar: Joi.string(),
    department: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'cn'] } }).messages({
        'string.email': '邮箱格式错误',
    })
}
/***
 * 用户新增数据校验
 */
exports.create_limit = {
    // req.body数据验证
    body: {
        ...login_base_limit,
        ...base_limit
    }
}
/**
 * 用户修改数据校验
 * 
 */
exports.update_limit = {
    body: {
        ...base_limit,
        id: Joi.number().required().messages({
            "any.required": "用户ID不能为空"
        }),
    }
}