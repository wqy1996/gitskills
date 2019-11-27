const mysql = require("../../utils/mysql.js")
const util = require("../../utils/util")
const response = util.response

// 添加商品类别
let addWaresType = function (req, res) {
	let { typeName, parentId } = req.body
	let querySql = `SELECT type_id FROM wares_type WHERE type_name = ?`
	mysql({ sql:querySql, params: [typeName] }).then(resoult => {
		if (resoult) console.log(resoult);
		response(res, resoult)
	}).catch(err=>{
		response(res, err)
	})
	// let addSql = `INSERT INTO wares_type VALUES (null, ?, ? )`
	// let params = [typeName, parentId]
	// mysql({ addSql, params}).then(resoult => {
	// 	response(res, '添加成功')
	// }).catch(err => {
	// 	response(res, err)
	// })
}


// 修改商品类别名称

module.exports = { addWaresType }