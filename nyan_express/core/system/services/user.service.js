
const User = require('../models/user.model');
const Role = require('../models/role.model');
const UserRole = require('../models/user_role.model');
/**
 * User 与 Role 多对多关联
 */
User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

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
     * @description 获取登录用户信息
     * @param {*} userId 
     */
    async getLoginUser(userId) {
        // 通过user获取角色
        const user = await User.findByPk(userId, {
            attributes: {
                exclude: ['password', 'updatedAt']
            }
        })
        if (!user) {
            throw new Error('查询的用户不存在!');
        }
        return user
    }
    /**
     * @description 更新用户信息 + 角色
     * @param {*} userInfo 
     * @returns User
     */
    async updateUser(userInfo) {
        // 1. 查询用户
        const user = await User.findByPk(userInfo.id);
        if (!user) {
            throw new Error('用户不存在, 无法更新!');
        }

        // 2. 更新用户信息
        await user.update(userInfo);

        // 3. 根据角色ID查询所有角色并更新用户的角色
        if (userInfo.roleIds) {
			const roles = await Role.findAll({ where: { id: userInfo.roleIds.split(',') } });
			user.setRoles(roles);
		}
        // 4. 返回用户信息
        return { id: user.id }
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