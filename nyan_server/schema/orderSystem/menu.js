const Joi = require('joi');
/**
 * 菜单基本数据校验
 */
const base_limit = {
    name: Joi.string().min(2).max(10).required().messages({
        'string.empty': '菜单名称不能为空',
        'string.min': '菜单名称长度不能小于 {#limit} 个字符',
        'string.max': '菜单名称长度不能大于 {#limit} 个字符',
    }),
    price: Joi.number()
        .min(0) // 价格至少为0
        .max(10000) // 价格最大不超过10000
        .precision(2) // 价格精确到小数点后两位
        .required().message({
            'any.required': '价格不能为空',
            'number.min': '价格不能小于 {#limit}',
            'number.max': '价格不能大于 {#limit}',
            'number.precision': '价格最多只能保留 {#limit} 位小数'
        }), // 价格是必填项,
    description: Joi.string().empty([null, ""]).default(""),
    imageUrl: Joi.string().empty([null, ""]).default(""),
    status: Joi.number().empty([null, 0]).default(1),

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