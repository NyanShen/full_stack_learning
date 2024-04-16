const { DataTypes } = require("sequelize");
/**
 * department--role (N--M)
 * department--role--permission
 * @name 用户组model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns DeparmetnModel
 */
module.exports = (sequelize) => {
    return sequelize.define('Department', {
        id: {
            type: DataTypes.INTEGER(10),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        pid: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            comment: '用户组父级ID',
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            comment: '用户组名称',
        },
        leader: {
            type: DataTypes.STRING(50),
            comment: '负责人姓名',
        },
        email: {
            type: DataTypes.STRING(50),
            comment: '负责人邮箱',
        },
        phone: {
            type: DataTypes.STRING(20),
            comment: '负责联系电话',
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
                let value = this.getDataValue('createdAt');
                return value.Format('yyyy-MM-dd hh:mm:ss')
            }
        },
    }, {
        tableName: 'departments'
    })
}