// 请求成功后的返回结果
function response(res, status, data) {
	if (data.errno) {
		res.send({
			status,
			msg: 'sql_error',
			data
		})
		// } else if (data.msg) {
		// 	res.send({
		// 		status,
		// 		msg: 'error',
		// 		data: '数据重复'
		// 	})
	} else {
		res.send({
			status,
			msg: 'success',
			data
		})
	}
	res.send()
}

module.exports = { response }


