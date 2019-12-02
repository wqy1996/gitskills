const express = require('express');
const router = express.Router()
// 用户登录，注册
const { register, login, isRegister } = require('../apis/users/user.js')

// 商品类别
const { delWaresType, getWaresTypes, addWaresType, updateWaresType } = require('../apis/wares/waresType')

const apis = [
	{
		methods: 'post',
		url: '/register',
		callback: register
	},
	{
		methods: 'post',
		url: '/login',
		callback: login
	},
	{
		methods: 'get',
		url: '/isRegister',
		callback: isRegister
	},
	{
		methods: 'post',
		url: '/waresType/addType',
		callback: addWaresType
	},
	{
		methods: 'post',
		url: '/waresType/updateType',
		callback: updateWaresType
	},
	{
		methods: 'post',
		url: '/waresType/delType',
		callback: delWaresType
	},
	{
		methods: 'get',
		url: '/waresType/getType',
		callback: getWaresTypes
	},
]

for (const item of apis) {
	router[item.methods](item.url, item.callback)
}

module.exports = router