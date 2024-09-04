const Role = require('../models/role.model');

class RoleService {
    async create(dataJson) {
        // 1. 判断角色是否存在
        const role = await Role.findOne({
            where: {
                name: dataJson.name
            }
        });
        if (role?.id) {
            throw new Error('角色已经存在!');
        }
        // 2. 创建角色
        const result = await Role.create(dataJson);
        return result
    }
}
module.exports = new RoleService();