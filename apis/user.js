const mysql = require("../utils/mysql")
const utils = require('../utils/util')
const response = utils.response
// 注册
let register = async function (req, res) {
	let { realName, userName, userAvatar, password, userRole, phone, status } = req.query
	try {
		await function () {
			return new Promise((resolve, reject) => {
				let sql = 'SELECT user_id FROM user WHERE phone = ?'
				mysql({ sql, params: [phone] }).then(resoult => {
					if (resoult.length) {
						response(res, 201, '此手机号已注册')
					} else {
						resolve()
					}
				}).catch(err => {
					reject(err)
				})
			})
		}
		await function () {
			let params = [realName, userName, userAvatar, password, userRole, phone, status];
			let sql = `INSERT INTO user VALUES (null, ?, ?, ?, ?, ?, now(), ?,?)`;
			let config = {
				sql,
				params
			}
			mysql(config).then(resoult => {
				response(res, 200, "添加成功")
			}).catch(err => {
				reject(err)
			})
		}
	} catch (err) {
		response(res, 300, err)
	}
}


// 登录
let login = function (req, res) {
	let sql = 'SELECT user_name userName FROM user WHERE user_name = "刘能"'
	mysql({
		sql,
		params: []
	}).then(resoult => {
		response(res, resoult)
	}).catch(err => {
		response(res, err)
	})
}

module.exports = { login, register }

