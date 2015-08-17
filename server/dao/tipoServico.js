var pg = require('pg')
//var client = new pg.Client(connectionString)

var tipoServicoDao = function(connectionString, operation, params, callback){
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