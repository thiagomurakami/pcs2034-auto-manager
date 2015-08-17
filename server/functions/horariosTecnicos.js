//select * from equipetecnico where codtecnico1=1 or codtecnico2=1;
var pg = require('pg')
var moment = require('moment')
var u = require('underscore')
var jquery = require('jquery')
//var client = new pg.Client(connectionString)

var horarioTecnicos = function(connectionString, id, callback){
  var selectQuery = "SELECT idequipe FROM equipetecnico WHERE codtecnico1="+id+" or codtecnico2="+id
  var stringQuery = "SELECT * FROM horarioOs where codequipe in ("+selectQuery+");"
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


module.exports = horarioTecnicos