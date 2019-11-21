const express = require('express');
const router = express.Router()
const querySql = require("../util/mysql")

router.post('/register', function (req, res) {
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
})


router.get('/login', function (req, res) {
	let sql = 'SELECT user_name FROM user WHERE user_name = "刘能"'
	querySql({
		sql,
		params: []
	}).then(resoult => {
		res.send(resoult);
	}).catch(err => {
		res.send('报错:' + err)
	})

})

module.exports = router