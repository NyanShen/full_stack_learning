const jwt = require('jsonwebtoken');
const { expressjwt } = require("express-jwt");
const config = require('../../config/index');
const { secret, algorithms, unlessPath } = config.jwt;
module.exports = {
    jwtMiddleware: expressjwt({ secret: secret, algorithms }).unless({ path: unlessPath }), //不需要token的路径, api开头的不需要token
    signToken: (tokenData) => jwt.sign(tokenData, secret, { expiresIn: '24h' }),
    unsignToken: (token) => jwt.decode(token, secret, algorithms)
}

