const Joi = require('joi');
/**
 * 角色数据校验
 */
let base_limit = {
    code: Joi.string().min(2).max(50).required().messages({
        'any.required': '角色编码不能为空',
        'string.min': '角色编码长度不能小于 {#limit} 个字符',
        'string.max': '角色编码长度不能大于 {#limit} 个字符',
    }),
    name: Joi.string().min(2).max(10).required().messages({
        'string.empty': '角色名称不能为空',
        'string.min': '角色名称长度不能小于 {#limit} 个字符',
        'string.max': '角色名称不能大于 {#limit} 个字符',
    }),
    remark: Joi.string().label('角色描述'),
    status: Joi.number().empty(null).default(1),
    permissionIds: Joi.string().empty(["", null]).default("")
}
/**
 * 角色新增数据校验
 */
exports.create_limit = {
    // req.body数据验证
    body: {
        ...base_limit
    }
}
/**
 * 角色修改数据校验
 */
exports.update_limit = {
    body: {
        ...base_limit,
        id: Joi.number().required().messages({
            'string.empty': '角色ID不能为空'
        }),
    }
}

/**
 * 查找角色 权限
 */
exports.search_limit = {
    // req.query数据验证
    query: {
        id: Joi.number().required().messages({
            'any.required': '角色ID不能为空',
        }),
    }
}