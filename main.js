const express = require('express')
const app = express()
require('./util/dateFormat')
let user = require("./router/user")
app.use('/user', user)


const server = app.listen(3000, function () {

})