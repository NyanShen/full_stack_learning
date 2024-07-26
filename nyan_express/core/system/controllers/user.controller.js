const userService = require('../services/user.service');

class UserController {
    /**
     * @description 注册用户
     * @param {*} req 
     * @param {*} res 
     */
    async register(req, res) {
        try {
            let result = await userService.register(req.body);
            res.sendResult("注册成功", 0, result);
        } catch (error) {
            res.sendResult(error, -1);
        }
    }
    /**
     * @description 查询用户信息
     * @param {*} req 
     * @param {*} res 
     */
    async findUsers(req, res) {
        try {
            let result = await userService.findUsers();
            res.sendResult("查询成功", 0, result);
        } catch (error) {
            res.sendResult(error, -1);
        }
    }
}
module.exports = new UserController();