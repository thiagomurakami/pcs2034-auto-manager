var pg = require('pg')
var u = require('underscore')
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/test'
//var client = new pg.Client(connectionString)

var usuarioDAO = function(operation, params, callback){
	var stringQuery = ""
	params = u.omit(params, function(value, key, object){
		return u.isUndefined(value) || u.isNull(value)
	})
	var keys = u.keys(params)
	var values = u.values(params).map(function(value){
		return "'"+value+"'"
	})
	switch(operation){
		case 'create':
			stringQuery = "INSERT INTO usuario("+keys.join()+")"
			stringQuery += " VALUES ('"+values.join()+");"
			break;

		case 'read':
			stringQuery = "SELECT * FROM usuario ORDER BY codigocadastro ASC;"
			break;

		case 'update':
			keys = u.without(keys, 'codigocadastro')
			var updateString = keys.map(function(key){
				return key+"=('"+params[key]+"')"
			})
			stringQuery = "UPDATE usuario SET " + updateString.join()
			stringQuery += " WHERE codigocadastro=("+params.codigocadastro+")"
			break;

		case 'delete':
			stringQuery = "DELETE FROM usuario WHERE codigocadastro="
			stringQuery += params.codigocadastro
			break;
	}
	console.log(stringQuery)
	pg.connect(connectionString, function(err, client, done){
		client.query(stringQuery, function(err, results){
			if(!err){
				callback(null, results.rows)
			}
			else callback(err)
			done()
		})
	})
}

module.exports = usuarioDAO