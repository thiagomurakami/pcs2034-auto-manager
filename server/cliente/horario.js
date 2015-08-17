var pg = require('pg')
var moment = require('moment')
var u = require('underscore')
var jquery = require('jquery')
//var client = new pg.Client(connectionString)

var agendarHorarioDAO = function(connectionString, id, callback){
  var stringQuery = "SELECT * FROM horarioCliente WHERE idCliente="+id+" ORDER BY data DESC;"
  pg.connect(connectionString, function(err, client, done){
    client.query(stringQuery, function(err, results){
      if(results.rows){
        results.rows.forEach(function(result){
          result.data = moment(result.data).format('YYYY-MM-DD')
          result.hora = result.hora.substring(0, 5)
        })
      }
      if(!err){
        callback(null, results.rows)
      }
      else callback(err)
      done()
    })
  })
}


module.exports = agendarHorarioDAO