class SigninController {
    signin(req, res) {
        try {
            const loginInfo = req.body;
            if (loginInfo.code?.toLowerCase() !== req.session.captcha?.toLowerCase()) {
                res.sendResult("验证码错误", "-1");
                return
            }
        } catch (error) {
            res.sendResult(error, "-1");
        }
    }
}

module.exports = new SigninController()