const express = require('express');
const router = express.Router()
const querySql = require("../util/mysql")

let register = function (req, res) {
	let { realName, userName, userAvatar, password, userRole, phone, status } = req.query
	let params = [realName, userName, userAvatar, password, userRole, phone, status];
	let sql = `INSERT INTO user VALUES (null, ?, ?, ?, ?, ?, now(), ?,?)`;
	let config = {
		sql,
		params
	}
	querySql(config).then(resoult => {
		res.send("添加成功")
	}).catch(err => {
		res.send('报错:' + err)
	})
}

let login = function (req, res) {
	let sql = 'SELECT user_name FROM user WHERE user_name = "刘能"'
	querySql({
		sql,
		params: []
	}).then(resoult => {
		res.send(resoult);
	}).catch(err => {
		res.send('报错:' + err)
	})

}


let apis = [
	{
		methods: 'post',
		url: '/register',
		callback: register
	},
	{
		methods: 'get',
		url: '/login',
		callback: login
	}
]

for (const item of apis) {
	router[item.methods](item.url, item.callback)
}
module.exports = router