const jwt = require('jsonwebtoken'); // 生产token
const bcrypt = require('bcryptjs');
const db = require('../models/index');
const { signToken } = require('../middlewares/jwt');

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
        roleId: singleUser.roleId,
        avatar: singleUser.avatar,
    }
    // 生成token返回前端, 携带显示的用户信息, 角色等
    res.sendResult("登录成功", 0, { token: signToken(tokenData) })
}
