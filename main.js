const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
let api = require("./router/index")


app.use('/api', api)

app.use(express.static(path.resolve(__dirname, './dist')))
app.get('/', function (req, res) {
	const html = fs.readFileSync(path.resolve(__dirname, './dist'), 'utf-8')
	res.send(html)
})



app.listen(3000, function () {
})