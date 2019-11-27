const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const bodyParser = require('body-parser');
let api = require("./router/index")
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use('/api', api)
// app.all('/*', function (req, res, next) {
// 	// let origin = req.headers.origin;
// 	res.setHeader('Access-Control-Allow-Origin', "*");
// 	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
// 	next();
// })


app.use(express.static(path.resolve(__dirname, './dist')))
app.get('/', function (req, res) {
	const html = fs.readFileSync(path.resolve(__dirname, './dist'), 'utf-8')
	res.send(html)
})



app.listen(3000, function () {
})