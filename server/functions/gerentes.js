var pg = require('pg')
var u = require('underscore')
//var client = new pg.Client(connectionString)

var gerentes = function(connectionString, callback){
  var stringQuery = "SELECT nome, sobrenome, codigocadastro FROM usuario"
  stringQuery += " WHERE tipo='gerente'"
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

module.exports = gerentes