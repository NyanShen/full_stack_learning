const Joi = require('joi');
/**
 * 菜品基本数据校验
 */
const base_limit = {
    name: Joi.string().min(2).max(20).required().messages({
        'string.empty': '菜品类别名称不能为空',
        'string.min': '菜品类别名称长度不能小于 {#limit} 个字符',
        'string.max': '菜品类别名称长度不能大于 {#limit} 个字符',
    }),
    description: Joi.string().empty([null, ""]).default(""),
    status: Joi.number().empty([null, 0]).default(1),
}
/**
 * 菜品新增数据校验
 */
exports.create_limit = {
    // req.body数据验证
    body: {
        ...base_limit
    }
}

/**
 * 菜品修改数据校验
 */
exports.update_limit = {
    // req.body数据验证
    body: {
        ...base_limit,
        id: Joi.number().required().messages({
            'any.required': '菜品类别ID不能为空',
        })
    }
}