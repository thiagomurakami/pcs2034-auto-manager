var pg = require('pg')
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/test'
var results = []

pg.connect(connectionString, function(err, client, done){
	console.log("err")
	console.log(err)
	client.query('SELECT * FROM items', function(err, result){
		console.log(result)
	})
})