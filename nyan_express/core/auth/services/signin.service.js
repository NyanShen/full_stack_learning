const bcrypt = require('bcryptjs');
const User = require('../../system/models/user.model');
const { signToken } = require('../../../common/middlewares/jwt');

class SigninService {
    /**
     * 登录
     * @param {*} singinData 
     */
    async signin(singinInfo) {
        const singleUser = await User.findOne({
            account: singinInfo.account
        });
        if (!singleUser?.id) {
            throw new Error('账号不存在');
        }
        if (!bcrypt.compareSync(singinInfo.password, singleUser.password)) {
            throw new Error('密码错误, 登录失败');
        }
        const tokenData = {
            id: singleUser.id,
            name: singleUser.name,
            avatar: singleUser.avatar,
            account: singleUser.account,
        }
        return { token: signToken(tokenData) }
    }
}

module.exports = new SigninService();