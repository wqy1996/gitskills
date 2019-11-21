//创建并使用连接池对象
const mysql = require('mysql');
const pool = mysql.createPool({
	host: 'localhost',
	port: 3306,
	database: 'first_app',
	user: 'root',
	password: '1234'
})

module.exports = function querySql(config) {
	return new Promise((resolve, reject) => {
		pool.getConnection(function (err, connection) {
			if (err) reject('getConnection error： ' + err)
			connection.query(config.sql, config.params, function (err, results) {
				if (err) reject(err)
				resolve(results)
			})
		})
	})
}


// 封装
// function query(sql, params, callback) {
// 	pool.getConnection(function (err, connection) {
// 		connection.query(sql, params, function (err, results) {
// 			if (err) {
// 				console.log('报错' + err);
// 			}
// 			callback.send(err || "添加成功") // 结果回调
// 			connection.release() // 释放连接资源 | 跟 connection.destroy() 不同，它是销毁
// 		})
// 	})
// }
