const Joi = require('joi');
/***
 * alphanum[a-zA-Z0-9]
 */
// 账户验证
const account = Joi.string().alphanum().min(6).max(10).required();
// 密码验证
const password = Joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/).min(6).max(12).required();

exports.login_limit = {
    // req.body数据验证
    body: {
        account,
        password
    }
}