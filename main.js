const express = require('express')
const app = express()
require('./util/dateFormat')
require("./router/router")
//创建并使用连接池对象
const mysql = require('mysql');
const pool = mysql.createPool({
	host: 'localhost',
	port: 3306,
	database: 'first_app',
	user: 'root',
	password: '1234'
})


// 封装
query = function (sql, callback) {
	pool.getConnection(function (err, connection) {
		connection.query(sql, function (err, results) {
			callback(err, results) // 结果回调
			connection.release() // 释放连接资源 | 跟 connection.destroy() 不同，它是销毁
		})
	})
}
const server = app.listen(3000, function () {

})