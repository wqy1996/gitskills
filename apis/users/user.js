const mysql = require("../../utils/mysql")
const utils = require('../../utils/util')
const response = utils.response

// 查询是否已经注册
let isRegister = function (req, res) {
	let { phone } = req.query
	let sql = 'SELECT user_id FROM user WHERE phone = ?'
	mysql({ sql, params: [phone] }).then(resoult => {
		if (resoult.length) {
			response(res, 201, '此手机号已注册')
		} else {
			response(res, 200, "可以注册")
		}
	}).catch(err => {
		response(res, 300, err)
	})
}


// 注册
let register = async function (req, res) {
	let { realName, userName, userAvatar, password, userRole, phone, status } = req.body

	let params = [realName, userName, userAvatar, password, userRole, phone, status];
	let sql = `INSERT INTO user VALUES (null, ?, ?, ?, MD5(?), ?, null, ?,?)`;
	let config = {
		sql,
		params
	}
	mysql(config).then(resoult => {
		response(res, 200, "添加成功")
	}).catch(err => {
		response(res, 300, err)
	})

}


// 登录
let login = function (req, res) {
	let { userName, phone, password } = req.body
	let sql = 'SELECT * FROM user WHERE (user_name = ? 	OR phone = ?) AND password = MD5(?)'
	mysql({
		sql,
		params: [
			userName, phone, password
		]
	}).then(resoult => {
		if (resoult.length) {
			// 写入登录时间
			mysql({
				sql: "UPDATE user SET login_time = NOW() WHERE (user_name = ? 	OR phone = ?)",
				params: [
					userName, phone
				]
			})
			delete resoult[0].password
			response(res, 200, resoult)
		} else {
			response(res, 201, '用户名或密码错误')
		}
	}).catch(err => {
		response(res, 300, err)
	})



}

module.exports = { login, register, isRegister }

