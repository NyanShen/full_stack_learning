
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

/**
 * @name 用户角色model
 * @author NyanShen
 * @params sequelize DataTypes
 * @returns RoleModel
 */
const Role = sequelize.define("Role", {
    id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        comment: "角色编码"
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        comment: "角色名称"
    },
    remark: {
        type: DataTypes.STRING(100),
        comment: "角色描述"
    },
    status: {
        type: DataTypes.INTEGER(1),
        comment: "0禁用 1启用 3删除",
        defaultValue: 1,
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
            let value = this.getDataValue('updatedAt');
            return value.Format('yyyy-MM-dd hh:mm:ss')
        }
    },

});

module.exports = Role