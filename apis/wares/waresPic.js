const mysql = require("../../utils/mysql")
const util = require("../../utils/util")
const multiparty = require('multiparty')
const fs = require('fs')
const response = util.response


let uploadWarePic = function (req, res) {
	let form = new multiparty.Form({ uploadDir: './public/images/waresImg/' })
	form.parse(req, async function (err, fileds, fileList) {
		if (err) response(res, 201, err)
		let files = fileList.files;

		let filePath = []
		let loop = files.map((item) => {
			// return new Promise((resolve, reject) => {
			// 	let originName = './public/images/' + item.originalFilename
			// 	fs.rename(item.path, originName, function (err) {
			// 		if (err) {
			// 			reject(err)
			// 		} else {
			// 			filePath.push(originName);
			item.path = item.path.replace(/\\/g,"/")
			filePath.push(item.path);
			// 			resolve()
			// 		}	
			// 	})
			// });
		})
		try {
			// await Promise.all(loop)
			await (function () {
				let { warseId } = fileds
				let picList = []
				filePath.forEach((item, index) => {
					picList.push(`(${index + 1},${warseId},?)`);
				})
				let sql = "INSERT wares_pic (pic_id, wares_id, pic_address) VALUES " + picList.join(',') + ';'
				mysql({ sql, params: filePath }).then(resoult => {
					response(res, 200, '添加成功')
				}).catch(err => {
					response(res, 300, err)
				})
			})()
		} catch (error) {
			response(res, 201, err)
		}
	})
}

let delWaresPic = async function (req, res) {
	let { ids } = req.body
	ids = ids.split(',')
	let sqlCondition = []
	ids.forEach(() => {
		sqlCondition.push('pic_id = ?')
	})
	try {
		await (function () {
			return new Promise((resolve, reject) => {
				let sql = "SELECT pic_address url FROM wares_pic WHERE " + sqlCondition.join(' OR ') + ';'
				mysql({ sql, params: ids }).then(resoult => {
					resoult.forEach(item => {
						fs.unlinkSync(item.url, function (err) {
							if (err) { reject(err) }
						})
					})
					resolve()
				}).catch(err => {
					reject(err)
				})
			})
		})()

		await (function () {
			let sql = "DELETE FROM wares_pic WHERE " + sqlCondition.join(' OR ') + ';'
			mysql({ sql, params: ids }).then(resoult => {
				response(res, 200, '删除成功')
			}).catch(err => {
				response(res, 300, err)

			})
		})()
	} catch (error) {
		response(res, 300, error)
	}

}

let getWarePic = function (req, res) {
	let { waresId } = req.query
	let sql = "SELECT pic_id pId, pic_address picUrl FROM wares_pic WHERE wares_id = ?;"
	mysql({ sql, params: [waresId] }).then(resoult => {
		response(res, 200, resoult)
	}).catch(err => {
		response(res, 300, err)
	})
}


let waresPicApi = [
	{
		methods: 'post',
		url: '/wares/uploadWarePic',
		callback: uploadWarePic
	},
	{
		methods: 'get',
		url: '/wares/getWarePic',
		callback: getWarePic
	},
	{
		methods: 'post',
		url: '/wares/delWarePic',
		callback: delWaresPic
	}
]

module.exports = waresPicApi