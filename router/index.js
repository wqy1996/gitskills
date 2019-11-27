const express = require('express');
const router = express.Router()
const { register, login } = require('./user.js')

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
	}
]

for (const item of apis) {
	router[item.methods](item.url, item.callback)
}

module.exports = router