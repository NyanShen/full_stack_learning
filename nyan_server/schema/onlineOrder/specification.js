const Joi = require('joi');
/**
 * 菜品基本数据校验
 */
const base_limit = {
    name: Joi.string().min(2).max(20).required().messages({
        'string.empty': '菜品规格不能为空',
        'string.min': '菜品规格长度不能小于 {#limit} 个字符',
        'string.max': '菜品规格长度不能大于 {#limit} 个字符',
    }),
    priceAddition: Joi.number()
        .min(0) // 价格至少为0
        .max(10000) // 价格最大不超过10000
        .precision(2) // 价格精确到小数点后两位
        .message({
            'number.min': '价格不能小于 {#limit}',
            'number.max': '价格不能大于 {#limit}',
            'number.precision': '价格最多只能保留 {#limit} 位小数'
        }), // 价格是必填项,
    status: Joi.number().empty([null, 0]).default(1),
}
/**
 * 菜品规格新增数据校验
 */
exports.create_limit = {
    // req.body数据验证
    body: {
        ...base_limit
    }
}

/**
 * 菜品规格修改数据校验
 */
exports.update_limit = {
    // req.body数据验证
    body: {
        ...base_limit,
        id: Joi.number().required().messages({
            'any.required': '菜品规格ID不能为空',
        })
    }
}