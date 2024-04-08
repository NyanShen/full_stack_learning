const Joi = require('joi');
const { login_limit } = require('./login')
/***
 * alphanum[a-zA-Z0-9]
 */
exports.user_limit = {
    // req.body数据验证
    body: {
        ...login_limit.body,
        name: Joi.string(),
        sex: Joi.number(),
        state: Joi.number(),
        avatar: Joi.string(),
        department: Joi.string(),
        identify: Joi.string(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'cn'] } }).messages({
            'string.email': '邮箱格式错误',
        })
    }
}