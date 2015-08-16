var pg = require('pg')
var u = require('underscore')
//var client = new pg.Client(connectionString)

var veiculos = function(connectionString, idCliente, callback){
  var stringQuery = "SELECT placa, dono FROM veiculo;"
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

module.exports = veiculos