const { DataTypes } = require("sequelize");
const ChatUser = require("./user.model");
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
		status: {
			type: DataTypes.INTEGER(1),
			comment: "0禁用 1启用 3删除",
			defaultValue: 1,
		}
	}, {
		tableName: "chats"
	});
}

// Chat.belongsTo(ChatUser, { foreignKey: 'user1_id' });
// Chat.belongsTo(ChatUser, { foreignKey: 'user2_id' });

module.exports = Chat