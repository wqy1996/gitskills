const mysql = require("../../utils/mysql")
const util = require("../../utils/util")
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
]
module.exports = waresInfoApi