var pg = require('pg')
var u = require('underscore')
//var client = new pg.Client(connectionString)

var tipoServicoDao = function(connectionString, operation, params, callback){
	var stringQuery = ""
	params = u.omit(params, function(value, key, object){
		return u.isUndefined(value) || u.isNull(value) || value === ''
	})
	var keys = u.keys(params)
	var values = u.values(params).map(function(value){
		return "'"+value+"'"
	})
	switch(operation){
		case 'create':
			stringQuery = "INSERT INTO tipoServico ("+keys.join()+")"
			stringQuery += " VALUES ("+values.join()+");"
		break;

		case 'read':
			stringQuery = "SELECT * FROM tipoServico ORDER BY id ASC;"
		break;

		case 'update':
			keys = u.without(keys, 'id')
			var updateString = keys.map(function(key){
				return key+"=('"+params[key]+"')"
			})
			stringQuery = "UPDATE tipoServico SET " + updateString.join()
			stringQuery += " WHERE idpeca=("+params.id+")"
		break;

		case 'delete':
			stringQuery = "DELETE FROM tipoServico WHERE id="
			stringQuery += params.id
		break;
	}
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

module.exports = tipoServicoDao