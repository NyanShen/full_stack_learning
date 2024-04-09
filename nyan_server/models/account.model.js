
const bcrypt = require('bcryptjs');
/**
 * @name 账户model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns 
 */
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("Account", {
        id: {
            type: Sequelize.INTEGER(10),
            autoIncrement: true,
            notNull: true,
            primaryKey: true,
        },
        account: {
            type: Sequelize.STRING(12),
            notNull: true,
            notEmpty: true,
            unique: true,
            comment: '账号',
            defaultValue: "",
        },
        password: {
            type: Sequelize.STRING,
            notEmpty: true,
            comment: '密码',
            defaultValue: '',
            set(value) {
                // 加密后长度10位
                this.setDataValue('password', bcrypt.hashSync(value, 10));
            }
        }
    }, {
        tableName: "accounts"
    });
};