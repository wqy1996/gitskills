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
	function recursion(id) {
		//  先查询是否有子集
		let selectSql = `SELECT type_id FROM wares_type  WHERE  parent_id = ?`
		mysql({ sql: selectSql, params: [id] }).then(resoult => {
			// 如果有子集那么挂起进入递归
			if (resoult.length) {
				for (const item of resoult) {
					recursion(item.type_id)
				}
				// 结束之后把自己删掉
				let delSql = `DELETE FROM wares_type WHERE type_id = ?`
				mysql({ sql: delSql, params: [id] }).then(resoult => {
					return
				}).catch(err => {
					response(res, 300, err)
				})
			} else {
				// 如果没有子集那么删除当前类型，然后退出递归 
				let delSql = `DELETE FROM wares_type WHERE type_id = ?`
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
	recursion(typeId)
	response(res, 200, '删除成功')
}

// 1 3 4 7 8

module.exports = { addWaresType, updateWaresType, delWaresType }