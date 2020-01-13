const mysql = require("../../utils/mysql")
const util = require("../../utils/util")
const fs = require("fs")
const multiparty = require('multiparty')
const response = util.response

// 添加商品信息
let addWaresInfo = function (req, res) {
	let { waresName, waresType, waresInfo, buyPrice, salePrice, discount } = req.body
	let sql = "INSERT wares_info VALUES (NULL,?,?,?,?,?,?);"
	let params = [waresName, waresType, waresInfo, buyPrice, salePrice, discount]
	mysql({ sql, params }).then(resoult => {
		response(res, 200, '添加成功')
	}).catch(err => {
		response(res, 300, err)
	})
}

// 修改商品信息
let updateWaresInfo = function (req, res) {
	let { waresId, waresName, waresType, waresInfo, buyPrice, salePrice, discount } = req.body
	let sql = "UPDATE wares_info SET wares_name=?,wares_type=?,wares_info=?,buy_price=?,sell_price=?,discount=? WHERE wares_id = ?";
	let params = [waresName, waresType, waresInfo, buyPrice, salePrice, discount, waresId]
	mysql({ sql, params }).then(resoult => {
		response(res, 200, '修改成功')
	}).catch(err => {
		response(res, 300, err)
	})
}


// 删除商品
let delWaresInfo = function (req, res) {
	let { waresId } = req.body
	let sql = "DELETE FROM wares_info WHERE wares_id = ?"
	mysql({
		sql, params: [waresId]
	}).then(resoult => {
		response(res, 200, '操作成功')
	}).catch(err => {
		response(res, 300, err)
	})
}
let uploadWarePic = function (req, res) {
	let form = new multiparty.Form({ uploadDir: './public/images/' })
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
				filePath.forEach(() => {
					picList.push(`(${warseId},?)`);
				})
				let sql = "INSERT wares_pic (wares_id, pic_address) VALUES " + picList.join(',') + ';'
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


let waresInfoApi = [
	{
		methods: 'post',
		url: '/wares/addWaresInfo',
		callback: addWaresInfo
	},
	{
		methods: 'post',
		url: '/wares/updateWaresInfo',
		callback: updateWaresInfo
	},
	{
		methods: 'post',
		url: '/wares/delWaresInfo',
		callback: delWaresInfo
	},
	{
		methods: 'post',
		url: '/wares/uploadWarePic',
		callback: uploadWarePic
	},
]
module.exports = waresInfoApi