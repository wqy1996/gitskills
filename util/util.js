// 请求成功后的返回结果
function response(res, data) {
	if (data.errno) {
		res.send({
			status: data.errno,
			msg: 'sql_error',
			data
		})
	} else {
		res.send({
			status: 200,
			msg: 'success',
			data
		})
	}
	res.send()
}

module.exports = { response }


