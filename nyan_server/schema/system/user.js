const Joi = require('joi');
const { login_base_limit } = require('../auth/login');
/**
 * 
 * 用户基本数据校验
 * 保存用户时, 可指定部门, 添加角色
 */
const base_limit = {
    name: Joi.string(),
    sex: Joi.number(),
    state: Joi.number(),
    avatar: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'cn'] } }).messages({
        'string.email': '邮箱格式错误',
    }),
    status: Joi.number().empty(null).default(1),
    departmentId: Joi.number().empty(null)
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