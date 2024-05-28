const { DataTypes } = require("sequelize");
/**
 * @name 聊天用户model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns ChatUserModel
 */
const ChatUser = (sequelize) => {
	return sequelize.define("ChatUser", {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
            autoIncrement: true,
			primaryKey: true
		},
        username: {
			type: DataTypes.STRING(50),
			allowNull: false,
			comment: '聊天用户名',
		},
		avatar: {
			type: DataTypes.STRING,
            allowNull: false,
			comment: '用户头像',
		},
		status: {
			type: DataTypes.INTEGER(1),
			comment: "0禁用 1启用 3删除",
			defaultValue: 1,
		},
        lastSeen: {
            type: DataTypes.DATE, 
            defaultValue: DataTypes.NOW,
            comment: "在线时间",
            get() {
                let value = this.getDataValue('createdAt');
                return value.Format('yyyy-MM-dd hh:mm:ss')
            }
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
		tableName: "chatusers"
	});
}

module.exports = ChatUser;