/**
 * permission--operation (N--M)
 * @name 操作model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns OperationModel
 */
module.exports = (sequelize, Sequelize) => {
    return sequelize.define('Operation', {
        id: {
            type: Sequelize.INTEGER(10),
            autoIncrement: true,
            notNull: true,
            primaryKey: true
        },
        code: {
            type: Sequelize.STRING(20),
            notNull: true,
            unique: true,
            comment: "操作编码"
        },
        name: {
            type: Sequelize.STRING(20),
            notNull: true,
            comment: "操作名称"
        },
        desc: {
            type: Sequelize.STRING(50),
            comment: "操作描述"
        },
        status: {
            type: Sequelize.INTEGER(1),
            comment: "是否有效(是否被删除)0无效,1有效",
            defaultValue: 1,
        },
    }, { tableName: 'operations' })
}