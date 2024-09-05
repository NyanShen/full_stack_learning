const PermissionService = require('../services/permission.service');

class PermissionController {
    async create(req, res) {
        try {
            let result = await PermissionService.create(req.body);
            res.sendResult("创建成功", 0, result);
        } catch (error) {

        }
    }
}
module.exports = new PermissionController();