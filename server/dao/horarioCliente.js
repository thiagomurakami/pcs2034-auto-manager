var pg = require('pg')
var moment = require('moment')
var u = require('underscore')
var jquery = require('jquery')
//var client = new pg.Client(connectionString)

var agendarHorarioDAO = function(connectionString, operation, params, callback){
  var stringQuery = ""
  console.log(params)
  var horarioObj = u.clone(params)
  var horarioClienteObj = u.clone(params)
  horarioObj = u.omit(horarioObj, 'idcliente')
  horarioObj = u.omit(horarioObj, function(value, key, object){
    return u.isUndefined(value) || u.isNull(value)
  })
  horarioClienteObj = u.omit(horarioClienteObj, function(value, key, object){
    return u.isUndefined(value) || u.isNull(value)
  })
  var keysHorario = u.keys(horarioObj)
  var keysHorarioCliente = u.keys(horarioClienteObj)
  var valuesHorario = u.values(horarioObj).map(function(value){
    return "'"+value+"'"
  })
  var valuesHorarioCliente = u.values(horarioClienteObj).map(function(value){
    return "'"+value+"'"
  })
  switch(operation){
    case 'create':
      var insertHorarioQuery = "INSERT INTO horario("+keysHorario.join()+")"
      insertHorarioQuery += " VALUES ("+valuesHorario.join()+");"
      var insertHorarioClienteQuery = "INSERT INTO horarioCliente("+keysHorarioCliente.join()+")"
      insertHorarioClienteQuery += " VALUES ("+valuesHorarioCliente.join()+");"
      pg.connect(connectionString, function(err, client, done){
        client.query(insertHorarioQuery, function(err, results){
          if(!err){
            client.query(insertHorarioClienteQuery, function(err, results){
              if(!err){
                callback(null, results.rows)
              }
              else callback(err)
              done()
            })
          }
          else{
            callback(err)
            done()
          }
        })
      })
      break;

    case 'read':
      stringQuery = "SELECT * FROM horarioCliente ORDER BY data DESC;"
      break;

    case 'update':
      insertHorarioQuery = "INSERT INTO horario("+keysHorario.join()+")"
      insertHorarioQuery += " VALUES ("+valuesHorario.join()+");"
      insertHorarioClienteQuery = "INSERT INTO horarioCliente("+keysHorarioCliente.join()+")"
      insertHorarioClienteQuery += " VALUES ("+valuesHorarioCliente.join()+");"
      break;

    case 'delete':
      stringQuery = "DELETE FROM tipoServico WHERE id="
      stringQuery += params.id
      break;
  }
  console.log(stringQuery)
  if(operation != 'create'){
    pg.connect(connectionString, function(err, client, done){
      client.query(stringQuery, function(err, results){
        console.log(err)
        console.log(results.rows)
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
}

module.exports = agendarHorarioDAO