// 请求成功后的返回结果
function response(res, status, data) {
	if (data.errno) {
		res.send({
			status,
			msg: 'sql_error',
			data
		})
	} else if (status !== 200) {
		res.send({
			status,
			msg: 'error',
			data
		})
	} else {
		res.send({
			status,
			msg: 'success',
			data
		})
	}
}

module.exports = { response }


