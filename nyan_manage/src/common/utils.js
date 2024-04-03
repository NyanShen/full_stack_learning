/**
 * 构造树型结构数据
 * @param {*} list 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function formatTree(list, id = 'id', parentId = 'parentId', children = 'children') {
	let config = {
		id,
		parentId,
		childrenList: children
	};

	let childrenListMap = {}; // 相同parentId的对象集合
	let nodeIds = {}; // 相同id的对象集合
	let tree = []; // 根结点列表

	for (let item of list) {
		let parentId = item[config.parentId];
		if (childrenListMap[parentId] == null) {
			childrenListMap[parentId] = [];
		}
		childrenListMap[parentId].push(item);

		let nodeId = item[config.id]
		nodeIds[nodeId] = item;
	}

	for (let item of list) {
		let parentId = item[config.parentId];
		if (nodeIds[parentId] == null) {
			tree.push(item);
		}
	}

	for (let item of tree) {
		adaptToChildrenList(item);
	}

	function adaptToChildrenList(obj) {
		if (childrenListMap[obj[config.id]] !== null) {
			obj[config.childrenList] = childrenListMap[obj[config.id]];
		}
		if (obj[config.childrenList]) {
			for (let item of obj[config.childrenList]) {
				adaptToChildrenList(item);
			}
		}
	}
	return tree;
}