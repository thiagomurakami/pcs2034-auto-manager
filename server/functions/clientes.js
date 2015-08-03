var pg = require('pg')
var u = require('underscore')
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/test'
//var client = new pg.Client(connectionString)

var clientes = function(callback){
  var stringQuery = "SELECT nome, sobrenome, codigocadastro FROM usuario"
  stringQuery += " WHERE tipo='cliente'"
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

module.exports = clientes