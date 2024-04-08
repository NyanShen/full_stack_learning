const Joi = require('joi');
/**
 * 角色数据校验
 */
let base_limit = {
    name: Joi.string().min(4).max(10).required().messages({
        'string.empty': '角色名称不能为空',
        'string.min': '角色名称长度不能小于 {#limit} 个字符',
        'string.max': '角色名称不能大于 {#limit} 个字符',
    }),
    desc: Joi.string().label('角色描述'),
}
/**
 * 角色新增数据校验
 */
exports.create_limit = {
    // req.body数据验证
    body: {
        ...base_limit,
        menuIds: Joi.string()
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
        menuIds: Joi.string().required().messages({
            'string.empty': '角色关联菜单不能为空'
        }),
    }
}