const express = require('express');
const router = express.Router()
// 用户登录，注册
const { register, login } = require('../apis/user.js')

// 商品类别
const {addWaresType} = require('../apis/wares/waresType')

const apis = [
	{
		methods: 'post',
		url: '/register',
		callback: register
	},
	{
		methods: 'get',
		url: '/login',
		callback: login
	},
	{
		methods: 'post',
		url:'/waresType/addType',
		callback:addWaresType
	}
]

for (const item of apis) {
	router[item.methods](item.url, item.callback)
}

module.exports = router