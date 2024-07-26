
const User = require('../models/user.model');

class UserService {
    /**
     * @description 注册用户
     * @param {*} userInfo 
     */
    async register(userInfo) {
        const { account, password, confirmPassword } = userInfo;
        if (password !== confirmPassword) {
            throw new Error('密码和确认密码不一致,请重新输入');
        }
        // 1. 判断用户是否存在
        const user = await User.findOne({
            where: {
                account
            }
        });
        if (user?.id) {
            throw new Error('用户已经存在, 请直接登录!');
        }
        // 2. 创建用户
        const registerUser = await User.create({
            account,
            password
        })
        return { id: registerUser.id }
    }
    /**
     * @description 更新用户信息
     * @param {*} userInfo 
     * @returns User
     */
    async updateUser(userInfo) {
        return userInfo
    }
    /**
     * @description 根据id查询用户
     * @param {*} id 
     * @returns 
     */
    async findUsers() {
        const user = await User.findAll({
            attributes: {
                exclude: ['password', 'updatedAt']
            }
        });
        if (!user) {
            throw new Error('查询的用户不存在!');
        }
        return user
    }
}

module.exports = new UserService();