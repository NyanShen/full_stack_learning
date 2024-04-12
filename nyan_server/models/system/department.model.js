/**
 * department--role (N--M)
 * department--role--permission
 * @name 用户组model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns DeparmetnModel
 */
module.exports = (sequelize, Sequelize) => {
    return sequelize.define('Department', {
        id: {
            type: Sequelize.INTEGER(10),
            autoIncrement: true,
            notNull: true,
            primaryKey: true
        },
        pid: {
            type: Sequelize.INTEGER(10),
            notNull: true,
            comment: '用户组父级ID',
        },
        name: {
            type: Sequelize.STRING,
            notNull: true,
            unique: true,
            comment: '用户组名称',
        },
        leader: {
            type: Sequelize.STRING,
            comment: '负责人姓名',
        },
        email: {
            type: Sequelize.STRING,
            comment: '负责人邮箱',
        },
        phone: {
            type: Sequelize.STRING,
            comment: '负责联系电话',
        },
        status: {
			type: Sequelize.INTEGER(1),
			default: 1,
			comment: "是否有效(是否被删除)0无效,1有效"
		}
    }, {
        tableName: 'departments'
    })
}