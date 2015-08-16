var pg = require('pg')
var u = require('underscore')
//var client = new pg.Client(connectionString)

var pecas = function(connectionString, callback){
  var stringQuery = "select * from peca where quantidade > 0;"
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

module.exports = pecas