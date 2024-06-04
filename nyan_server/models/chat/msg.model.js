const { DataTypes } = require("sequelize");
/**
 * @name 聊天model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns ChatModel
 */
const ChatMsg = (sequelize) => {
    return sequelize.define("ChatMsg", {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: '消息类型',
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '消息内容',
        },
        readed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            comment: '是否已读',
        },
        timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
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
        tableName: "chatmsgs"
    });
}

module.exports = ChatMsg;