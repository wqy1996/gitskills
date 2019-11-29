// 请求成功后的返回结果
function response(res, status, data) {
	if (data.errno) {
		res.send({
			status,
			msg: 'sql_error',
			data
		})
	} else if (status !== 200) {
		res.send({
			status,
			msg: 'error',
			data
		})
	} else {
		res.send({
			status,
			msg: 'success',
			data
		})
	}
}

// 获取树形结构
function getTreeArr(list,idName,pidName) {
	let treeArr = []
	// 先循环表格
	for (const item of list) {
		// 如果有parentId
		if (!item[pidName]) {
			// 没有的话创建一级节点
			treeArr.push(item)
		}
	}

	function getTree(treeArr) {
		for (const item1 of list) {
			for (const item2 of treeArr) {
				if (item2[idName] === item1[pidName]) {
					if (item2.children) {
						item2.children.push(item1)
					} else {
						item2.children = [item1]
					}
					getTree(item2.children)
				}
			}
		}
	}
	getTree(treeArr)
	return treeArr
}


module.exports = { response, getTreeArr }


