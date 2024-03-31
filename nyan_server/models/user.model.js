
const {
	aes
} = require('../utils/crypto');

module.exports = (sequelize, Sequelize) => {
	return sequelize.define("Users", {
		id: {
			type: Sequelize.UUID,
			notNull: true,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
		},
		username: {
			type: Sequelize.STRING,
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
				// 在数据库中以明文形式存储密码是很糟糕的.
				// 使用适当的aes对称加密更好.
				this.setDataValue('password', aes.en(value));
			}
		},
		nickName: {
			type: Sequelize.STRING,
			defaultValue: "",
			comment: '昵称',
		},
		verificationCode: {
			type: Sequelize.INTEGER,
			comment: '验证码',
		},
		roleId: {
			type: Sequelize.STRING,
			notEmpty: true,
			comment: '角色名称',
		},
		state: {
			type: Sequelize.BOOLEAN,
			comment: '状态',
			defaultValue: true
		}
	});
};