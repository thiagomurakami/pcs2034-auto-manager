var pg = require('pg')
var moment = require('moment')
var u = require('underscore')
var jquery = require('jquery')
//var client = new pg.Client(connectionString)

var agendarHorarioDAO = function(connectionString, id, callback){
  var stringQuery = "SELECT * FROM usuario WHERE codigocadastro="+id
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


module.exports = agendarHorarioDAO