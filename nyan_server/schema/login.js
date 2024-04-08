const Joi = require('joi');
/***
 * alphanum[a-zA-Z0-9]
 */
exports.login_limit = {
    // req.body数据验证
    body: {
        account: Joi.string().alphanum().min(6).max(10).required().messages({
            'string.empty': '账户不能为空',
            'string.alphanum': '账户只能包含字母和数字',
            'string.min': '账户长度不能小于 {#limit} 个字符',
            'string.max': '账户长度不能大于 {#limit} 个字符',
        }),
        password: Joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,12}$/).min(6).max(12).required().messages({
            'string.empty': '账户不能为空',
            'string.pattern.base': '用户密码只能包含字母和数字',
            'string.min': '用户账户长度不能小于 {#limit} 个字符',
            'string.max': '用户账户长度不能大于 {#limit} 个字符',
        }),
    }
}