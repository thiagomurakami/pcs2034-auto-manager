//select count(hora) as horarios, codEquipe from horarioOs where data='2015-08-11' group by codequipe;
var pg = require('pg')
var u = require('underscore')
var async = require('async')

var sugestaoEquipe = function(connectionString, data, callback){
  var horarioFuncionamento = u.range(9, 19)
  pg.connect(connectionString, function(err, client, done){
    var stringQuery = "select count(hora) as horarios, codEquipe from horarioOs where "
    stringQuery += "data='"+data+"' group by codequipe;"
    client.query(stringQuery, function(err, results){
      if(!err){
        callback(null, results.rows)
      }
      else callback(err)
      done()
    })
  })
}

module.exports = sugestaoEquipe