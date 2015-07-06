app = require('./server/expressServer')
require('./server/routes')(app)
var async = require('async')

// var pg = require('pg')
// var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/test'
// var results = []

// pg.connect(connectionString, function(err, client, done){
// 	client.query('SELECT * FROM items', function(err, result){
// 		console.log(err)
// 		console.log(result)
// 	})
// })