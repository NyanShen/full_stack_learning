const RoleService = require('../services/role.service');

class RoleController {
    async create(req, res) {
        try {
            let result = await RoleService.create(req.body);
            res.sendResult("创建成功", 0, result);
        } catch (error) {
            res.sendResult(error, -1);
        }
    }
}
module.exports = new RoleController();