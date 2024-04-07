const jwt = require('jsonwebtoken'); // 生产token
const db = require('../models/index');
const userModel = db.user;
const { jwtSecretKey } = require('../config/jwt.config');
exports.singin = (req, res) => {
    const loginInfo = req.body;
    // userModel.findOne({ where: {account: loginInfo.account}})
}