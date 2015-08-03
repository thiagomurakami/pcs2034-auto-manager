var pg = require('pg')
var connectionString = process.env.DATABASE_URL || 'postgres://@localhost:5432/test'
//var client = new pg.Client(connectionString)

var login = function(loginObj, callback){
	var stringQuery = "SELECT codigocadastro, email, senha, tipo FROM usuario WHERE email='"+loginObj.email+"' AND "
	stringQuery += "senha='"+loginObj.senha+"'"
	console.log(stringQuery)
	pg.connect(connectionString, function(err, client, done){
			client.query(stringQuery, function(err, results){
				if(results.rows.length <= 0){
					callback('Authentication failed')
				}
				else if(!err){
					callback(null, results.rows[0])
				}
				else callback(err)
				done()
			})
		})
}

module.exports = login