const utilsTools = require("./tools");
/**
 * 统一返回数据格式
 */
function resExtra(data, code = 0, msg = "操作成功!") {
	return {
		data,
		code,
		msg
	}
}
/**
 * 列表分页查询条件处理
 * @param {*} conditions 查询条件
 * @param {*} count 是否计数(可针对某个属性计数)
 */
function conditionHandler(conditions, count) {
	// select * from ...基本查询条件
	let modelParam = {
		where: {}
	}
	// 去除对象中空值情况
	if (conditions.params) {
		modelParam.where = utilsTools.deleteNullObj(conditions.params)
	}
	//每页条数
	if (conditions.limit) {
		modelParam.limit = parseInt(conditions.limit)
	}
	//当前页
	if (conditions.offset > 0) {
		modelParam.offset = conditions.limit * (conditions.offset - 1) || 0
	}
	// 排序-默认按插入时间进行升序['createdAt', ‘asc’],没有则按具体字段进行排序(升序或降序)
	if (conditions.sort) {
		modelParam.order = [
			[
				conditions.sort ? conditions.sort.prop : 'createdAt',
				conditions.sort ? conditions.sort.order : 'asc'
			]
		]
	}
	// 排序
	if (conditions.order) {
		modelParam.order = conditions.order
	}
	// 是否开启原生查询
	if (conditions.raw) {
		modelParam.raw = conditions.raw
	}
	// 查询的时候排除exclude传进来的属性, 计数时不能携带
	// attributes: { exclude: ['baz'] } 不查询baz属性
	if (conditions.exclude && !count) {
		modelParam.attributes = {
			exclude: [conditions.exclude]
		}
	}
	// 查询关联表(模型)数据
	if (conditions.include && !count) {
		modelParam.include = conditions.include
	}
	// 直接传入需要查询的属性 attributes: ['foo', 'bar']
	if (conditions.attributes) {
		modelParam.attributes = conditions.attributes
	}
	// 分组查询
	if (conditions.group) {
		modelParam.group = conditions.group
	}
	return modelParam
}

module.exports = {
	/**
	 * 创建数据
	 * @param  {Object}   model       模型实例
	 * @param  {Object}   param       数据集合
	 * @param  {Function} cb          回调函数
	 */
	create: (model, param, cb) => {
		if (!model) return cb(resExtra('', 605, '模型不存在'));
		model
			.create(param)
			.then(data => {
				cb(resExtra(data, 0, '创建成功！'))
			})
			.catch(err => {
				cb(resExtra(err, 605, '创建失败!'))
			})
	},
	/**
	 * 更新数据
	 * @param  {Object}   model       模型实例
	 * @param  {Object}   param       数据集合
	 * @param  {Object}   key  = { id: req.body.id } 查询条件
	 * @param  {Function} cb          回调函数
	 */
	update: (model, param, key, cb) => {
		if (!model) return cb(resExtra('', 605, '模型不存在'));
		model
			.update(param, {
				where: key
			})
			.then(data => {
				if (data[0]) {
					cb(resExtra(data[0], 0, '更新成功！'))
				} else {
					cb(resExtra('', 605, 'ID不存在！'))
				}
			})
			.catch(err => {
				cb(resExtra('', 605, '更新失败!'))
			})
	},
	/**
	 * 根据查询条件查询
	 * 模糊查询, 范围查询....
	 */
	list: (model, conditions, cb) => {
		if (!model) return cb(resExtra('', 605, '模型不存在'));
		let { params, ...others } = conditions;
		let key = {
			where: utilsTools.deleteNullObj(params),
			...others
		}
		model
			.findAll(key)
			.then(data => {
				cb(resExtra(data));
			})
			.catch(err => {
				cb(resExtra('', 605, '查询失败!'))
			})
	},
	/**
	 * 查询列表数据分页
	 */
	listByPage: (model, conditions, cb) => {
		/*查询条件格式
		conditions = {
			params: {
				title: ''
			},
			limit: 20,
			offset: 0,
			sort: {
				prop:'createdAt',
				order:'desc / asc：升序',
			}
		}*/
		if (!model) return cb(resExtra('', 605, '模型不存在'));
		model
			.findAndCountAll(conditionHandler(conditions, "count"))
			.then(countAll => {
				model
					.findAll(conditionHandler(conditions))
					.then(data => {
						cb(resExtra({
							list: data,
							count: countAll.count,
							current: conditions.offset || 1,
							limit: conditions.limit || 10
						}))
					})
					.catch(err => {
						cb(resExtra(err, 605, '查询失败'))
					})
			})
			.catch(err => {
				cb(resExtra(err, 605, '查询失败'))
			})

	},
	findOne(model, conditions, cb) {
		if (!model) return cb(resExtra('', 605, '模型不存在'));
		/* 根据主键查询一条数据 参数
		conditions:{
			params:{
			id:'123'
			}
		 }*/
		if (!conditions.params.name) return cb(resExtra('', 605, '查询条件为空！'));
		model
			.findOne(conditionHandler(conditions))
			.then(data => {
				cb(resExtra(data))
			})
			.catch(err => {
				cb(resExtra(err, 605, '查询失败'))
			})
	},
	/**
	 * 删除某条数据
	 * @param  {Object}   model       模型实例
	 * @param  {Object}   key         删除条件{ id: body.id }
	 * @param  {Function} cb          回调函数
	 */
	delete: (model, key, cb) => {
		if (!model) return cb(resExtra('', 605, '模型不存在'));
		model
			.destroy({
				where: key
			})
			.then(data => {
				if (data) {
					cb(resExtra(data, 0, '删除成功！'))
				} else {
					cb(resExtra('', 605, 'ID不存在！'))
				}
			})
			.catch(err => {
				cb(resExtra('', 605, '删除失败!'))
			})
	},

}