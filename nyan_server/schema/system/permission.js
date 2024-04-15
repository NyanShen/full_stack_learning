const Joi = require('joi');
/**
 * 基本数据校验
 */
const base_limit = {
    desc: Joi.string().empty(null).default(''),
    status: Joi.number().empty([null, 0]).default(0),
    // 关联权限
    menuIds: Joi.string().empty([null, '']).default(''),
    roleIds: Joi.string().empty([null, '']).default(''),
    operationIds: Joi.string().empty([null, '']).default('')
}
/**
 * 新增校验
 */
exports.create_limit = {
    // req.body数据验证
    body: {
        ...base_limit,
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

    }
}
/**
 * 修改校验
 */
exports.update_limit = {
    // req.body数据验证
    body: {
        ...base_limit,
        code: Joi.string().empty(null),
        name: Joi.string().empty(null),
        id: Joi.number().required().messages({
            'any.required': '权限ID不能为空',
        })
    }
}

/**
 * 分配角色
 */
exports.update_menu_limit = {
    // req.body数据验证
    body: {
        id: Joi.number().required().messages({
            'any.required': '权限ID不能为空',
        }),
        menuIds: Joi.string().empty([null, '']).default(''),
    }
}

/**
 * 查找已分配的角色
 */
exports.search_limit = {
    // req.query数据验证
    query: {
        id: Joi.number().required().messages({
            'any.required': '权限ID不能为空',
        }),
    }
}