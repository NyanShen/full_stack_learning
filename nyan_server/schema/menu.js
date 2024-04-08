const Joi = require('joi');
/**
 * 菜单新增数据校验
 */
exports.create_limit = {
    // req.body数据验证
    body: {
        pid: Joi.string().min(1).max(10).required().messages({
            'string.empty': '父级菜单不能为空',
            'string.min': '父级菜单长度不能小于 {#limit} 个字符',
            'string.max': '父级菜单长度不能大于 {#limit} 个字符',
        }),
        name: Joi.string().min(4).max(10).required().messages({
            'string.empty': '菜单名称不能为空',
            'string.min': '菜单名称长度不能小于 {#limit} 个字符',
            'string.max': '菜单名称长度不能大于 {#limit} 个字符',
        }),
        path: Joi.string(),
        icon: Joi.string(),
        level: Joi.number(),
        authority: Joi.string(),
    }
}