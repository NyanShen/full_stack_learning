const jwt = require('jsonwebtoken'); // 生产token
const bcrypt = require('bcryptjs');
const db = require('../models/index');
const { jwtSecretKey } = require('../config/jwt.config');

const userModel = db.user;
/**
 * @name 登录服务
 * @author NyanShen
 * @returns userinfo token
 */
exports.singin = async (req, res) => {
    const loginInfo = req.body;
    const singleUser = await userModel.findOne({ where: { account: loginInfo.account } })
    if (!singleUser?.id) {
        res.sendResult("账户不存在", 605);
        return
    }
    if(singleUser.state === 0) {
        res.sendResult("该账户暂未激活, 请联系管理员激活", 403);
        return
    }
    if (!bcrypt.compareSync(loginInfo.password, singleUser.password)) {
        res.sendResult("密码错误, 登录失败");
        return
    }
    let { password, create_time, update_time, ...others } = singleUser;
    // 保存others信息、令牌jwtSecretKey, 24小时有效
    let token = jwt.sign(others, jwtSecretKey, { expiresIn: '24h'});
    // 生成token返回前端, 携带显示的用户信息, 角色等
    let loginData = {
        username: singleUser.name,
        account: singleUser.account,
        token: `Bearer ${token}`
    }
    res.sendResult("登录成功", 0, loginData)
}