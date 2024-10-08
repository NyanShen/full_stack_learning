/**
 * @description 图形-验证码
 * @author nyanshen
 * @date 2024-09-04
 */
const captchaService = require('../services/captcha.service');
class CaptchaController {
    async generateCaptcha(req, res) {
        try {
            const result = await captchaService.generateCaptcha();
            req.session.captcha = result.captchaText;
            res.sendResult("操作完成", 0, result.base64String);
        } catch (error) {
            res.sendResult(error, "-1");
        }
    }
}
module.exports = new CaptchaController();