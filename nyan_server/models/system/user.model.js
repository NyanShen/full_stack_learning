
const bcrypt = require('bcryptjs');
/**
 * @name 用户model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns 
 */
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("User", {
        id: {
            type: Sequelize.INTEGER(10),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        account: {
            type: Sequelize.STRING(12),
            allowNull: false,
            unique: true,
            comment: '账号',
            defaultValue: "",
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: '密码',
            defaultValue: '',
            set(value) {
                // 加密后长度10位
                this.setDataValue('password', bcrypt.hashSync(value, 10));
            }
        },
        name: {
            type: Sequelize.STRING,
            comment: '姓名',
            defaultValue: '',
        },
        sex: {
            type: Sequelize.INTEGER,
            comment: '性别',
            defaultValue: 1,
        },
        avatar: {
            type: Sequelize.STRING,
            comment: '头像',
            defaultValue: '',
        },
        phone: {
            type: Sequelize.INTEGER(11),
            comment: '手机号码',
        },
        email: {
            type: Sequelize.STRING,
            comment: '邮箱',
            defaultValue: '',
        },
        status: {
			type: Sequelize.INTEGER(1),
			comment: "是否有效(是否被删除)0无效,1有效",
			defaultValue: 1,
		},
        departmentId: {
            type: Sequelize.INTEGER(10),
            comment: '关联用户组ID',
        },
    }, {
        tableName: "users"
    });
};