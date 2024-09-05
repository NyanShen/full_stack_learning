
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

const UserRole = sequelize.define('UserRole', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4 // 或 DataTypes.UUIDV1
    },
    status: {
        type: DataTypes.INTEGER(1),
        comment: "0禁用 1启用 3删除",
        defaultValue: 1,
    },
})
module.exports = UserRole;