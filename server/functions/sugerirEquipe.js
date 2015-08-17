//select count(hora) as horarios, codEquipe from horarioOs where data='2015-08-11' group by codequipe;
var pg = require('pg')
var u = require('underscore')
var async = require('async')
var moment = require('moment').utc

var sugestaoEquipe = function(connectionString, date, callback){
  var horarioFuncionamento = u.range(9, 19)
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
        var stringQuery = "select hora, codEquipe from horarioOs where "
        stringQuery += "data ='"+date+"';"
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
    var horarios = results[1]
    horarios.forEach(function(obj){
      obj.hora = parseInt(obj.hora.substring(0, 2))
    })
    equipes.forEach(function(equipe){
      equipe.horarios = horarioFuncionamento
      horarios.forEach(function(horario){
        if(horario.codequipe == equipe.idequipe){
          equipe.horarios = u.without(equipe.horarios, horario.hora)
        }
      })
    })
    var sugestao = u.sortBy(equipes, function(obj){
      return obj.horarios.length
    }).reverse()
    console.log(sugestao)
    callback(null, sugestao)
  })
}

module.exports = sugestaoEquipe