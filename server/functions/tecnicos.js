var pg = require('pg')
var u = require('underscore')
//var client = new pg.Client(connectionString)

var tecnicos = function(connectionString, callback){
  var stringQuery = "SELECT nome, sobrenome, codigocadastro, especialidade FROM usuario"
  stringQuery += " WHERE tipo='tecnico'"
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

module.exports = tecnicos