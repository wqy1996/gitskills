const mysql = require("../../utils/mysql")
const util = require("../../utils/util")
const response = util.response

// 添加商品类别
let addWaresType = async function (req, res) {
	let { typeName, parentId } = req.body
	try {
		// 先查询是否已存在
		await (function () {
			return new Promise((resolve, reject) => {
				let querySql = `SELECT type_id FROM wares_type WHERE type_name = ?`
				mysql({ sql: querySql, params: [typeName] }).then(resoult => {
					if (resoult.length) {
						response(res, 201, '数据重复')
					} else {
						resolve()
					}
				}).catch(err => {
					reject(err)
				})
			})
		})()


		// 添加类别
		await (function () {
			let addSql = `INSERT INTO wares_type VALUES (null, ?, ? )`
			let params = [typeName, parentId]
			mysql({ sql: addSql, params }).then(resoult => {
				response(res, 200, '添加成功')
			}).catch(err => {
				response(res, 300, err)
			})
		})()
	} catch (err) {
		response(res, 300, err)
	}
}


// 修改商品类别名称
let updateWaresType = async function (req, res) {
	let { typeId, newName } = req.body
	let sql = `UPDATE wares_type SET type_name = ? WHERE type_id = ?`
	mysql({ sql, params: [newName, typeId] }).then(resoult => {
		response(res, 200, '修改成功')
	}).catch(err => {
		response(res, 300, err)
	})
}

// 删除类别
let delWaresType = async function (req, res) {
	let { typeId } = req.body
	// 声明一个递归函数
	function getTree(id) {
		//  先查询是否有子集
		let selectSql = `SELECT type_id FROM wares_type  WHERE  parent_id = ?`
		mysql({ sql: selectSql, params: [id] }).then(resoult => {
			// 删除语句
			let delSql = `DELETE FROM wares_type WHERE type_id = ?`
			// 如果有子集那么挂起进入递归
			if (resoult.length) {
				for (const item of resoult) {
					getTree(item.type_id)
				}
				// 结束之后把自己删掉
				mysql({ sql: delSql, params: [id] }).then(resoult => {
					return
				}).catch(err => {
					response(res, 300, err)
				})
			} else {
				// 如果没有子集那么删除当前类型，然后退出递归 
				mysql({ sql: delSql, params: [id] }).then(resoult => {
					return
				}).catch(err => {
					response(res, 300, err)
				})
			}
		}).catch(err => {
			response(res, 300, err)
		})
	}
	getTree(typeId)
	response(res, 200, '删除成功')
}

// 查询类别
let getWaresTypes = function (req, res) {
	let selectSql = `SELECT parent_id parentId, type_id typeId, type_name typeName from wares_type ORDER BY type_id`
	mysql({ sql: selectSql, params: [] }).then(resoult => {
		let treeArr = []
		// 先循环表格
		for (const item of resoult) {
			// 如果有parentId
			if (!item.parentId) {
				// 没有的话创建一级节点
				treeArr.push(item)
			}
		}

		function getTree(treeArr) {
			for (const item1 of resoult) {
				for (const item2 of treeArr) {
					if (item2.typeId === item1.parentId) {
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
		response(res, 200, treeArr)
	}).catch(err => {
		response(res, 300, err)
	})
}
module.exports = { addWaresType, updateWaresType, delWaresType, getWaresTypes }