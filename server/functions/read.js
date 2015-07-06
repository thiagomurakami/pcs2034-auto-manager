var pg = require('pg')
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/test'
var client = new pg.Client(connectionString);

var read = function(table, params, callback){
	console.log(table)
	console.log(params)
	var stringQuery = "SELECT "
	var parameters = params.join()
	stringQuery += parameters+" FROM "+table
	console.log(stringQuery)
	client.connect(function(err){
		client.query(stringQuery, function(err, results){
			console.log(err)
			console.log(results.rows)
			if(!err){
				callback(null, results.rows)
			}
			else callback(err)
		})
	})
	
}

module.exports = read