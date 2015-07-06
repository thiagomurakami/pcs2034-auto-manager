var express = require('express')
var http = require('http')
var https = require('https')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');


var app = express()

var port = {}
if(process.env.PORT){
  port = {
    http: process.env.PORT
  }
  app.listen(process.env.PORT)
}
else{
  port = {
    http: 3000,
    https: 3333
  }

  http.createServer(app).listen(port.http)
}

var staticDir = './build'

console.log(port)
console.log(staticDir)

app.use(express.static(staticDir))

app.use(bodyParser.json({
  extended: true,
  parameterLimit: 100000,
  limit: 1024 * 1024 * 100
}))

app.use(cookieParser())

module.exports = app
