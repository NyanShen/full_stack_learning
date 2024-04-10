const jwt = require('jsonwebtoken');
const { expressjwt } = require("express-jwt");
const { jwtSecretKey, algorithms, unlessPath } = require('../config/jwt.config');
module.exports = {
    jwtMiddleware: expressjwt({ secret: jwtSecretKey, algorithms }).unless({ path: unlessPath }), //不需要token的路径, api开头的不需要token
    signToken: (tokenData) => jwt.sign(tokenData, jwtSecretKey, { expiresIn: '24h' }),
    unsignToken: (token) => jwt.decode(token, jwtSecretKey, algorithms)
}

