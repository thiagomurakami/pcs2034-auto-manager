var pg = require('pg')
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:123@localhost:5432/test'
//var client = new pg.Client(connectionString)

var pecaDao = function(operation, params, callback){
	var stringQuery = ""
	switch(operation){
		case 'create':
			stringQuery = "INSERT INTO peca(nome, marca, preco, quantidade, descricao) values('"
			stringQuery += params.nomePeca
			stringQuery += "', '" + params.marcaPeca
			stringQuery += "', " + params.precoPeca
			stringQuery += ", " + params.quantidadePeca
			try{
				stringQuery += ", '" + params.descricaoPeca +"'"
			}
			catch(err){
				console.log(err)
			}
			stringQuery += ");"
		break;

		case 'read':
			console.log(connectionString)
			stringQuery = "SELECT * FROM peca ORDER BY idpeca ASC;"
		break;

		case 'update':
			stringQuery = "UPDATE peca SET nome=('"
			stringQuery += params.nomePeca+"'), marca=('"
			stringQuery += params.marcaPeca + "'), preco=("
			stringQuery += params.precoPeca + "), quantidade=("
			stringQuery += params.quantidadePeca + "), descricao =('"
			stringQuery += params.descricaoPeca + "') WHERE idpeca=(" + params.idPeca + ");"
		break;

		case 'delete':
			stringQuery = "DELETE FROM peca WHERE idpeca="
			stringQuery += params.idPeca
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

module.exports = pecaDao