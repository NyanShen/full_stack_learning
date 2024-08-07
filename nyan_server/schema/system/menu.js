const Joi = require('joi');
/**
 * 菜单基本数据校验
 */
const base_limit = {
    pid: Joi.number().min(0).max(100).required().messages({
        'any.required': '父级菜单不能为空',
        'string.min': '父级菜单长度不能小于 {#limit} 个字符',
        'string.max': '父级菜单长度不能大于 {#limit} 个字符',
    }),
    name: Joi.string().min(2).max(10).required().messages({
        'string.empty': '菜单名称不能为空',
        'string.min': '菜单名称长度不能小于 {#limit} 个字符',
        'string.max': '菜单名称长度不能大于 {#limit} 个字符',
    }),
    path: Joi.string().empty([null, ""]).default(""),
    icon: Joi.string().empty([null, ""]).default(""),
    level: Joi.number().empty([null, ""]).default(""),
    component: Joi.string().empty([null, ""]).default(""),
    params: Joi.string().empty([null, ""]).default(""),
    outlink: Joi.string().empty([null, ""]).default("tag"),
    status: Joi.number().empty([null, 0]).default(1),
    noCache: Joi.boolean().empty(null).default(false),
    sort: Joi.number().empty([null, 0]).default(1),
}
/**
 * 菜单新增数据校验
 */
exports.create_limit = {
    // req.body数据验证
    body: {
        ...base_limit
    }
}

/**
 * 菜单修改数据校验
 */
exports.update_limit = {
    // req.body数据验证
    body: {
        ...base_limit,
        id: Joi.number().required().messages({
            'any.required': '菜单ID不能为空',
        })
    }
}