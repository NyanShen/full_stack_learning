/**
 * @author: nyanshen
 * @description 验证码服务
 */
const svgCaptcha = require('svg-captcha');

class CaptchaService {
    /**
     * @description 生成验证码
     * @returns {}
     */
    generateCaptcha() {
        const captcha = svgCaptcha.create({
            size: 4, // 4个字符
            noise: 2, // 干扰线条
            color: true,
        });
        const base64String = `data:image/svg+xml;base64,${Buffer.from(captcha.data).toString('base64')}`;
        return {
            captchaText: captcha.text,
            base64String,
        }
    }
}

module.exports = new CaptchaService();