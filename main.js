const express = require('express')
const app = express()
let user = require("./router/user")
app.use('/user', user)
app.listen(3000, function () {

})