//select count(hora) as horarios, codEquipe from horarioOs where data='2015-08-11' group by codequipe;
var pg = require('pg')
var u = require('underscore')
var async = require('async')
var moment = require('moment').utc

var sugestaoEquipe = function(connectionString, callback){
  var dateArray = u.range(0, 29).map(function(numberOfDay){
    return "'"+moment().add(numberOfDay, 'days').format('YYYY-MM-DD')+"'"
  })
  async.series([
    function(cb){
      pg.connect(connectionString, function(err, client, done){
        var stringQuery = "select idequipe from equipeTecnico;"
        client.query(stringQuery, function(err, results){
          if(!err){
            cb(null, results.rows)
          }
          else cb(err)
          done()
        })
      })
    },
    function(cb){
      pg.connect(connectionString, function(err, client, done){
        var stringQuery = "select count(hora) as horarios, codEquipe from horarioOs where "
        stringQuery += "data in ("+dateArray.join()+") group by codequipe order by horarios asc;"
        client.query(stringQuery, function(err, results){
          if(!err){
            cb(null, results.rows)
          }
          else cb(err)
          done()
        })
      })
    }
  ], function(err, results){
    var equipes = results[0]
    var equipesPorHorario = results[1]
    equipes.forEach(function(equipe){
      equipe.horarios = 0
      equipesPorHorario.forEach(function(equipePorHorario){
        if(equipePorHorario.codequipe = equipe.idequipe){
          equipe.horarios += equipePorHorario.horarios
        }
      })
    })
    var sugestao = u.sortBy(equipes, 'horarios').reverse()
    callback(null, sugestao)
  })
}

module.exports = sugestaoEquipe