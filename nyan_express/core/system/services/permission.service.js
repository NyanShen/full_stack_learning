const Permission = require('../models/permission.model');

class PermissionService {
    async create(dataJson) {
        // 1. 判断是否已存在权限
        let permission = await Permission.findOne({ name: dataJson.name });
        if (permission) {
            return Promise.reject('权限已存在');
        }
        // 2. 创建权限
        return Permission.create(dataJson);
    }
}

module.exports = new PermissionService();