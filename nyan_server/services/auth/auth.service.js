const jwt = require('jsonwebtoken'); // 生产token
const bcrypt = require('bcryptjs');
const db = require('../../models/index');
const { signToken } = require('../../middlewares/jwt');

const userModel = db.user;
/**
 * @name 登录服务
 * @author NyanShen
 * @returns userinfo token
 */
exports.singin = async (req, res) => {
    const loginInfo = req.body;
    if (loginInfo.code?.toLowerCase() !== req.session.captcha?.toLowerCase()) {
        res.sendResult("验证码错误", 605);
        return
    }
    const singleUser = await userModel.findOne({ where: { account: loginInfo.account } })
    if (!singleUser?.id) {
        res.sendResult("账户不存在", 605);
        return
    }
    if (singleUser.state === 0) {
        res.sendResult("该账户暂未激活, 请联系管理员激活", 403);
        return
    }
    if (!bcrypt.compareSync(loginInfo.password, singleUser.password)) {
        res.sendResult("密码错误, 登录失败");
        return
    }
    let tokenData = {
        id: singleUser.id,
        name: singleUser.name,
        avatar: singleUser.avatar,
    }
    // 生成token返回前端, 携带显示的用户信息, 角色等
    res.sendResult("登录成功", 0, { token: signToken(tokenData) })
}

/**
 * 生成图形验证码
 */
const svgCaptcha = require('svg-captcha');
exports.captcha = async (req, res) => {
    const captcha = svgCaptcha.create({
        size: 4, // 4个字符
        noise: 2, // 干扰线条
        color: true,
    });
    const base64String = `data:image/svg+xml;base64,${Buffer.from(captcha.data).toString('base64')}`;
    // 缓存captcha在服务端, 登录时跟前端进行校验
    req.session.captcha = captcha.text;
    console.log('captcha>>>', captcha.text);
    res.sendResult("操作完成", 0, base64String);
}
