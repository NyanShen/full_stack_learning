const Joi = require('joi');
/**
 * 基础数据校验
 */
const login_base_limit = {
    account: Joi.string().alphanum().min(6).max(10).required().messages({
        'string.empty': '账户不能为空',
        'string.alphanum': '账户只能包含字母和数字',
        'string.min': '账户长度不能小于 {#limit} 个字符',
        'string.max': '账户长度不能大于 {#limit} 个字符',
    }),
    password: Joi.string().pattern(/^(?![0-9]+$)[a-zA-Z0-9]{1,12}$/).min(6).max(12).required().messages({
        'string.empty': '账户不能为空',
        'string.pattern.base': '用户密码只能包含字母和数字',
        'string.min': '用户账户长度不能小于 {#limit} 个字符',
        'string.max': '用户账户长度不能大于 {#limit} 个字符',
    }),
}
exports.login_base_limit = login_base_limit;
/***
 * alphanum[a-zA-Z0-9]
 * 登录数据校验
 */
exports.login_limit = {
    // req.body数据验证
    body: {
        ...login_base_limit,
        code: Joi.string().required().messages({
            "string.empty": "验证码不能为空"
        })
    }
}