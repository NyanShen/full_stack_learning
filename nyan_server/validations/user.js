const Joi = require('joi');
/***
 * alphanum[a-zA-Z0-9]
 */
const emailPattern = /^[0-9A-Za-z_]+([-+.][0-9A-Za-z_]+)*@[0-9A-Za-z_]+([-.][0-9A-Za-z_]+)*\.[0-9A-Za-z_]+([-.][0-9A-Za-z_]+)*$/
exports.user_limit = {
    // req.body数据验证
    body: {
        account: Joi.string().alphanum().min(6).max(10).required(),
        password: Joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/).min(6).max(12).required(),
        name: Joi.string(),
        email:Joi.string().pattern(emailPattern)
        
    }
}