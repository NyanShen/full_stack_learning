const { DataTypes } = require("sequelize");
/**
 * @name 聊天model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns ChatModel
 */
const Chat = (sequelize) => {
	return sequelize.define("Chat", {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		senderId: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			comment: "发送者ID",
		},
		receiverId: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			comment: "接收者ID",
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
        }
	}, {
		tableName: "chats"
	});
}

module.exports = Chat