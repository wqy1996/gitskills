//创建并使用连接池对象
const mysql = require('mysql');
const pool = mysql.createPool({
	host: 'localhost',
	port: 3306,
	database: 'first_app',
	user: 'root',
	password: 'root'
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
