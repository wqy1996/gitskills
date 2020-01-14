const express = require('express');
const router = express.Router()
// 用户登录，注册
const userApi = require('../apis/users/user.js')

// 商品类别
const waresTypeApi = require('../apis/wares/waresType')
// 商品信息
const waresInfoApi = require('../apis/wares/waresInfo')
// 商品图片
const waresPicApi = require('../apis/wares/waresPic')

const apis = [
	...userApi,
	...waresTypeApi,
	...waresInfoApi,
	...waresPicApi
]

for (const item of apis) {
	router[item.methods](item.url, item.callback)
}

module.exports = router