const Joi = require('joi');
/**
 * 业务订单数据校验
 */
exports.order_limit = {
    // req.body数据验证
    body: {
        customerId: Joi.string().required().messages({
            'string.empty': '用户ID不能为空',
        }),
        payMode: Joi.string().required().messages({
            'string.empty': '支付方式不能为空',
        }),
        totalAmount: Joi.number()
            .min(0) // 价格至少为0
            .max(10000) // 价格最大不超过10000
            .precision(2) // 价格精确到小数点后两位
            .message({
                'number.min': '价格不能小于 {#limit}',
                'number.max': '价格不能大于 {#limit}',
                'number.precision': '价格最多只能保留 {#limit} 位小数'
            }), // 价格是必填项,
        orderDetail: Joi.array().items(
            Joi.object({
                dishId: Joi.number().required().messages({
                    'any.required': '菜品ID不能为空',
                }),
                quantity: Joi.number().required().messages({
                    'any.required': '菜品数量不能为空',
                }),
                uniPrice: Joi.number()
                    .min(0) // 价格至少为0
                    .max(10000) // 价格最大不超过10000
                    .precision(2) // 价格精确到小数点后两位
                    .message({
                        'number.min': '价格不能小于 {#limit}',
                        'number.max': '价格不能大于 {#limit}',
                        'number.precision': '价格最多只能保留 {#limit} 位小数'
                    }),
            })
        ),
    }
}

/**
 * 菜品修改数据校验
 */
exports.pay_limit = {
    // req.body数据验证
    body: {

    }
}