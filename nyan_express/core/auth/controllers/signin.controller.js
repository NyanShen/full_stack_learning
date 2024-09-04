/**
 * @description 登陆控制器
 * @author nyanshen
 * @date 2024-09-04
 */
const SigninService = require("../services/signin.service");
class SigninController {
    async signin(req, res) {
        try {
            const loginInfo = req.body;
            if (loginInfo.code?.toLowerCase() !== req.session.captcha?.toLowerCase()) {
                res.sendResult("验证码错误", "-1");
                return
            }
            const result = await SigninService.signin(loginInfo); // 生成token返回前端, 携带显示的用户信息, 角色等
            res.sendResult("登录成功", 0, result)
        } catch (error) {
            res.sendResult(error, "-1");
        }
    }
}

module.exports = new SigninController()