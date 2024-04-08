
const bcrypt = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("User", {
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
        },
        identify: {
            type: Sequelize.STRING,
            comment: '身份',
            defaultValue: '',
        },
        department: {
            type: Sequelize.STRING,
            comment: '所属部门',
            defaultValue: '',
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
        email: {
            type: Sequelize.STRING,
            comment: '邮箱',
            defaultValue: '',
        },
        avatar: {
            type: Sequelize.STRING,
            comment: '头像',
            defaultValue: '',
        },
        state: {
            type: Sequelize.INTEGER(1),
            comment: '状态(0禁用|1启用)',
            defaultValue: 1,
        },
        create_time: {
            type: Sequelize.DATE,
            comment: '创建时间',
            defaultValue: Sequelize.NOW,
        },
        update_time: {
            type: Sequelize.DATE,
            comment: '更新时间',
            defaultValue: Sequelize.NOW,
        }
    }, {
        tableName: "users"
    });
};