const express = require('express')
const app = express()
app.post('/register', function (req, res) {
	console.log("收到主页的post请求");
	res.send("Hello Post")
})

