var pg = require('pg')
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/test'
var client = new pg.Client(connectionString);

var tipoServicoDao = function(operation, params, callback){
	var stringQuery = ""
	switch(operation){
		case 'create':
			stringQuery = "INSERT INTO tipoServico(nome, preco) values('"
			stringQuery += params.nomeServico
			stringQuery += "', " + params.precoServico + ");"
		break;

		case 'read':
			stringQuery = "SELECT * FROM tipoServico ORDER BY id ASC;"
		break;

		case 'update':
			stringQuery = "UPDATE tipoServico SET nome=('"
			stringQuery += params.nomeServico+"'), preco=("
			stringQuery += params.precoServico + ") WHERE id=(" + params.id + ")"
		break;

		case 'delete':
			stringQuery = "DELETE FROM tipoServico WHERE id="
			stringQuery += params.id
		break;
	}
	console.log(stringQuery)
	pg.connect(connectionString, function(err, client, done){
			client.query(stringQuery, function(err, results){
				console.log(err)
				console.log(results.rows)
				if(!err){
					callback(null, results.rows)
				}
				else callback(err)
				done()
			})
		})
}

module.exports = tipoServicoDao