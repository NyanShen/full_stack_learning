
const { DataTypes } = require("sequelize");
const bcrypt = require('bcryptjs');
/**
 * @name 用户model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns 
 */
module.exports = (sequelize) => {
    return sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER(10),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        account: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
            comment: '账号',
            defaultValue: "",
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '密码',
            defaultValue: '',
            set(value) {
                // 加密后长度10位
                this.setDataValue('password', bcrypt.hashSync(value, 10));
            }
        },
        name: {
            type: DataTypes.STRING(50),
            comment: '姓名',
            defaultValue: '',
        },
        sex: {
            type: DataTypes.INTEGER(1),
            comment: '性别',
        },
        avatar: {
            type: DataTypes.STRING,
            comment: '头像',
            defaultValue: '',
        },
        phone: {
            type: DataTypes.STRING(20),
            comment: '手机号码',
        },
        email: {
            type: DataTypes.STRING(50),
            comment: '邮箱',
            defaultValue: '',
        },
        status: {
			type: DataTypes.INTEGER(1),
			comment: "0禁用 1启用 3删除",
			defaultValue: 1,
		},
        remark: {
            type: DataTypes.STRING(100),
            comment: '描述',
        },
        createdBy: {
            type: DataTypes.STRING(50),
            comment: '新增者',
            defaultValue: '',
        },
        updatedBy: {
            type: DataTypes.STRING(50),
            comment: '更新者',
            defaultValue: '',
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get() {
                let value = this.getDataValue('createdAt');
                return value.Format('yyyy-MM-dd hh:mm:ss')
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get() {
                let value = this.getDataValue('createdAt');
                return value.Format('yyyy-MM-dd hh:mm:ss')
            }
        },
        departmentId: {
            type: DataTypes.INTEGER(10),
            comment: '关联用户组ID',
        },
    }, {
        tableName: "users"
    });
};