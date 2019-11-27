const querySql = require("../util/mysql")
const utils = require('../util/util')
const response = utils.response
// 注册
let register = function (req, res) {
	let { realName, userName, userAvatar, password, userRole, phone, status } = req.query
	let params = [realName, userName, userAvatar, password, userRole, phone, status];
	let sql = `INSERT INTO user VALUES (null, ?, ?, ?, ?, ?, now(), ?,?)`;
	let config = {
		sql,
		params
	}
	querySql(config).then(resoult => {
		response(res, "添加成功")
	}).catch(err => {
		response(res, err)
	})
}


// 登录
let login = function (req, res) {
	let sql = 'SELECT user_name userName FROM user WHERE user_name = "刘能"'
	querySql({
		sql,
		params: []
	}).then(resoult => {
		response(res, resoult)
	}).catch(err => {
		response(res, err)
	})
}

module.exports = { login, register }

