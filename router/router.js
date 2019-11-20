var express = require('express');
var app = express();

app.post('/register', function (req, res) {
	console.log("收到主页的post请求");
	res.send("Hello Post")
})
app.get('/', function (req, res) {
	console.log("收到主页的get请求");
	res.send("Hello get")
})