var pg = require('pg')
var u = require('underscore')
//var client = new pg.Client(connectionString)

var getVeiculos = function(connectionString, idCliente, callback){
  var stringQuery = "SELECT placa FROM veiculo"
  stringQuery += " WHERE dono="+idCliente
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

module.exports = getVeiculos